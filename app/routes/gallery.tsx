import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '~/components/ui/carousel'
import { db } from '~/db'
import { posts, users } from '~/db/schema'
import { eq, desc, and, isNull, sql } from 'drizzle-orm'
// import seedData from '~/db/seed'
import type { Route } from './+types/gallery'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '~/components/ui/form'
import { useForm } from 'react-hook-form'
import { memoryFormSchema } from '~/lib/formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import { Textarea } from '~/components/ui/textarea'
import { Separator } from '~/components/ui/separator'
import carolPrompts from '~/lib/carolPrompts.json'
import { useEffect, useState } from 'react'
import {
  redirect,
  useSubmit,
  useFetcher,
  data,
  useActionData,
  Link
} from 'react-router'
import { Button } from '~/components/ui/button'
import GoogleIcon from '~/components/svg/GoogleIcon'
import {
  createAuthorizeUrl,
  handleGoogleOAuth
} from '~/utils/googleAuth.server'
import {
  destroyUserSession,
  getUserDataFromSession,
  getUserIdFromSession,
  storeUserSession
} from '~/utils/JWT.server'
import { headerLilacImg } from '~/assets'
import PageHeader from '~/components/PageHeader'

async function checkCookiesForUserInfo(request: Request) {
  // See if user is stored in the session
  const cookie = request.headers.get('Cookie')
  console.log({ cookie })
  if (!cookie) return undefined

  return await getUserDataFromSession(cookie)
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Gallery – Carol Trainor' },
    {
      name: 'description',
      content: 'Remember Carol with us through pictures and memories'
    }
  ]
}

export async function loader({ request }: Route.LoaderArgs) {
  // Holder for Set-Cookie header
  let setCookieHeader: string | undefined
  // See if user is stored in the session
  let user = await checkCookiesForUserInfo(request)
  // query search params for 'code' field from google auth
  const code = new URL(request.url).searchParams.get('code')
  console.log('user', user)

  // See if user was redirected from google auth
  if (!user && code) {
    const profile = await handleGoogleOAuth(code)
    // set user value to oAuth values and store in session memory
    if (profile.ok) {
      user = profile.data
      setCookieHeader = await storeUserSession(profile.data.id)

      // Remove ?code from URL to prevent "invalid_grant" on refresh
      return redirect('/gallery', {
        headers: { 'Set-Cookie': setCookieHeader }
      })
    }
  }

  // Get posts from db
  try {
    const postArray = await db
      .select({
        id: posts.id,
        text: posts.text,
        userId: posts.userId,
        userName: users.name,
        userPicture: users.picture
      })
      .from(posts)
      .leftJoin(users, eq(users.id, posts.userId))
      .where(
        and(isNull(posts.deletedAt), sql`not ${users.status} = 'disabled'`)
      )
      // TODO: Need to limit amount of posting
      .orderBy(desc(posts.createdAt))
    return data(
      { DbData: postArray, userData: user },
      setCookieHeader
        ? { headers: { 'Set-Cookie': setCookieHeader } }
        : undefined
    )
  } catch (error) {
    console.error(error)
    throw new Response('Server error', { status: 500 })
  }
}

export async function action({ request }: Route.ActionArgs) {
  // Check if user is stored in cookie
  const formData = await request.formData()
  let user
  const cookie = request.headers.get('Cookie')
  if (cookie) user = await getUserIdFromSession(cookie ?? undefined)
  const postId = formData.get('postId')?.toString()

  // Update function
  if (request.method === 'PUT') {
    if (!postId) {
      throw new Response('Forbidden', { status: 403 })
    }

    const text = formData.get('message')?.toString().trim()

    if (!user) {
      throw new Response('Forbidden', { status: 403 })
    }

    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1)

    if (!post.length || post[0].userId !== user.id) {
      throw new Response('Forbidden', { status: 403 })
    }

    const update = await db
      .update(posts)
      .set({ text })
      .where(eq(posts.id, postId))

    if (!update.changes) {
      console.error('No changes made in Db on update', update)
      return new Response(JSON.stringify({ success: false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // Actions with _action field
  const actionType = formData.get('_action')

  switch (actionType) {
    // sign out action
    case 'signOut':
      const clearedCookie = await destroyUserSession(cookie ?? null)
      return redirect('/gallery', { headers: { 'Set-Cookie': clearedCookie } })

    // sign in action
    case 'signIn':
      const res = await createAuthorizeUrl()
      if (res.ok) {
        return data(
          { url: res.data.url },
          {
            headers: {
              // CORS
              'Access-Control-Allow-Origin': 'http://localhost:5173',
              // For testing w/out https
              'Referrer-Policy': 'no-referrer-when-downgrade'
            }
          }
        )
      }

    // Submitted memory form
    case 'formSubmit':
      // check for auth cookie
      if (!user) {
        return {
          formErrors: {
            message: 'Please sign in.'
          }
        }
      }

      const message = formData.get('message')?.toString().trim()
      if (!message) {
        return {
          formErrors: { message: 'Message cannot be empty.' }
        }
      }

      await db.insert(posts).values({ text: message, userId: user.id })

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })

    case 'edit':
      if (!user) {
        throw new Response('Unauthorized', { status: 401 })
      }

      return {
        editPostAuth: true,
        postId: formData.get('postId')?.toString().trim()
      }

    case 'delete':
      if (request.method !== 'DELETE')
        throw new Response('Unknown action', { status: 400 })

      if (!user) throw new Response('Forbidden', { status: 403 })

      if (!postId) throw new Response('Bad Request', { status: 400 })

      const post = await db
        .select()
        .from(posts)
        .where(eq(posts.userId, user.id))
        .get()

      if (!post || (post.userId !== user.id && user)) {
        throw new Response('Forbidden', { status: 403 })
      }

      await db
        .update(posts)
        .set({ deletedAt: new Date().toISOString() })
        .where(eq(posts.id, postId))

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    default:
      throw new Response('Unknown action', { status: 400 })
  }
}

export default function Gallery({ loaderData }: Route.ComponentProps) {
  // Image State
  const [userImage, setUserImage] = useState<string | null>(null)
  // Prompt State
  const [prompt] = useState<string>(
    carolPrompts.prompts[
      Math.floor(Math.random() * carolPrompts.prompts.length)
    ]
  )
  // Tracks which post IDs are pending confirmation
  const [pendingDelete, setPendingDelete] = useState<Set<string>>(new Set())

  // Get loader data
  const comments = loaderData?.DbData
  const userInfo = loaderData?.userData
  const actionData = useActionData<{
    formErrors?: { message?: string }
    success?: boolean
    editPostAuth?: boolean
    postId?: string
  }>()
  console.log(actionData)
  console.log('loaderData', loaderData)

  const fetcher = useFetcher()
  // const userInfo = sampleUserInfo

  const submit = useSubmit()

  // Form setup
  const form = useForm<z.infer<typeof memoryFormSchema>>({
    resolver: zodResolver(memoryFormSchema)
  })

  const handleFormSubmit = (value: { message: string }) => {
    if (!loaderData.userData) {
      form.setError('message', {
        message: 'Please sign in to submit this memory'
      })
      return
    }
    submit(
      { ...value, _action: 'formSubmit' },
      { action: '/gallery', method: 'post' }
    )
  }

  const updateForm = useForm<z.infer<typeof memoryFormSchema>>({
    resolver: zodResolver(memoryFormSchema)
  })

  useEffect(() => {
    // Handle Google avatar display
    if (userInfo?.picture) {
      setUserImage(`${userInfo.picture}-rj`)
    } else {
      setUserImage(null)
    }

    // Handle Google sign-in redirect
    if (fetcher.data?.url) {
      window.location.href = fetcher.data.url
    }

    // Handle server-side validation errors
    if (actionData?.formErrors) {
      form.setError('message', {
        type: 'server',
        message: actionData.formErrors.message
      })
    }

    if (actionData?.success) {
      form.reset({ message: '' })
    }

    if (actionData?.editPostAuth && actionData.postId) {
      const postToEdit = comments.find(c => c.id === actionData.postId)
      if (postToEdit) {
        updateForm.reset({ message: postToEdit.text ?? '' })
      }
    }
  }, [userInfo, fetcher.data, actionData, form])

  function handleDeleteClick(id: string) {
    // Add the post to pending deletion
    setPendingDelete(prev => new Set(prev).add(id))

    // Auto-revert after 5 seconds
    setTimeout(() => {
      setPendingDelete(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 5000) // 5000ms = 5 seconds
  }

  // Render
  return (
    <>
      <PageHeader>Remember Carol with us</PageHeader>

      <section className="flex flex-col items-center py-12 gap-12">
        <h2 className="font-ephesis text-5xl font-bold text-maroon">
          Through Pictures
        </h2>
        <div className="bg-maroon p-16 rounded-md shadow-lg">
          <div className="w-7xl flex justify-center items-center min-h-[50rem]">
            <Carousel className="w-full max-w-2xl">
              <CarouselContent>
                {/* TODO: Populate with a gallery of photos. Google api? */}
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem key={index} className="basis-3/4 self-center">
                    <div className="p-1 bg-amber-50">
                      <img
                        src={`https://placehold.co/${Math.floor(
                          Math.random() * (1200 - 600 + 1) + 600
                        )}x${Math.floor(
                          Math.random() * (800 - 400 + 1) + 400
                        )}/png`}
                        alt=""
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          {/* TODO: Add link */}
          <p className="text-center pt-12 text-slate-50 underline">
            View more pictures
          </p>
        </div>
        <h2 className="font-ephesis text-5xl font-bold text-maroon py-6">
          Through Memories
        </h2>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="font-bold text-xl text-center text-maroon"
          >
            Share a Memory of Carol
          </label>
          <div className="w-3xl flex gap-2">
            {typeof userImage === 'string' ? (
              <div className="flex flex-col">
                <fetcher.Form method="post" action="/gallery">
                  <input type="hidden" name="_action" value="signOut" />
                  <Button className="size-24 aspect-square rounded-md bg-maroon p-1 text-slate-50 text-wrap underline relative hover:opacity-75">
                    <img
                      src={userImage}
                      alt="Your google avatar"
                      className="absolute size-full rounded-md"
                    />
                    <p className="text-blue-700 underline z-10 absolute bottom-0.5 bg-lilac opacity-75 rounded-sm p-1">
                      Sign out
                    </p>
                  </Button>
                </fetcher.Form>
              </div>
            ) : (
              <fetcher.Form method="post" action="/gallery">
                <input type="hidden" name="_action" value="signIn" />
                <Button className="size-24 aspect-square rounded-md bg-maroon p-1 text-slate-50 text-wrap underline">
                  Sign in
                  <GoogleIcon className="size-6" />
                </Button>
              </fetcher.Form>
            )}
            <Form {...form}>
              <fetcher.Form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="w-full"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={prompt}
                          className="bg-slate-100 p-8 shadow-sm rounded-md min-h-24 w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button type="submit">Submit</Button>
                    </FormItem>
                  )}
                />
              </fetcher.Form>
            </Form>
          </div>
          {userInfo?.role === 'admin' && (
            <Button type="button" variant={'link'} asChild>
              <Link to={'/gallery/admin'}>To admin Dashboard</Link>
            </Button>
          )}
        </div>
        <Separator />
        {comments &&
          comments.map(({ id, userPicture, userName, text, userId }) => {
            return (
              <div className="w-3xl flex gap-2" key={id}>
                {userPicture && (
                  <img
                    src={`${userPicture}-rj`}
                    alt=""
                    className="h-24 aspect-square rounded-md"
                  />
                )}
                {actionData?.editPostAuth && actionData.postId === id ? (
                  <Form {...updateForm}>
                    <fetcher.Form
                      onSubmit={updateForm.handleSubmit(values => {
                        const fd = new FormData()
                        fd.append('postId', id)
                        fd.append('message', values.message)
                        submit(fd, { method: 'put' })
                      })}
                      className="w-full"
                    >
                      <FormField
                        control={updateForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                className="bg-slate-100 p-8 shadow-sm rounded-md min-h-24 w-full"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <div className="flex gap-1 w-full">
                              <Button className="grow" type="submit">
                                Submit
                              </Button>
                              <Button type="button" className="grow">
                                <Link to={'/gallery'}>Cancel</Link>
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    </fetcher.Form>
                  </Form>
                ) : (
                  <div className="bg-slate-100 p-8 shadow-sm rounded-md flex flex-col gap-1 min-h-10 w-full relative">
                    <div className="flex flex-col gap-2 wrap-break-word">
                      <h3 className="font-bold">{userName}</h3>
                      <p className="text-wrap">{text}</p>
                    </div>
                    {userInfo?.id === userId ? (
                      <div className="absolute bottom-1 right-1 flex gap-1">
                        <Button
                          className="opacity-75 hover:opacity-100"
                          variant={'outline'}
                          onClick={() => {
                            submit(
                              { _action: 'edit', postId: id },
                              { method: 'post' }
                            )
                          }}
                        >
                          Edit
                        </Button>
                        {/* Button for initial delete select*/}
                        {!pendingDelete.has(id) ? (
                          <Button
                            className="opacity-75 hover:opacity-100 hover:bg-maroon hover:text-white bg-maroon text-white"
                            variant={'outline'}
                            onClick={() => handleDeleteClick(id)}
                          >
                            Delete
                          </Button>
                        ) : (
                          <Button
                            className="opacity-75 hover:opacity-100 hover:bg-maroon hover:text-white bg-maroon text-white"
                            variant={'outline'}
                            onClick={() => {
                              // Perform the delete
                              submit(
                                { _action: 'delete', postId: id },
                                { method: 'delete' }
                              )
                              // Remove from pending set immediately
                              setPendingDelete(prev => {
                                const newSet = new Set(prev)
                                newSet.delete(id)
                                return newSet
                              })
                            }}
                          >
                            I'm sure I want to delete
                          </Button>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            )
          })}
      </section>
    </>
  )
}
