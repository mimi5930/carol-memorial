import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '~/components/ui/carousel'
import { db } from '~/db'
import { posts, users } from '~/db/schema'
import { eq } from 'drizzle-orm'
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
import { redirect, useSubmit, useFetcher, data } from 'react-router'
import { Button } from '~/components/ui/button'
import GoogleIcon from '~/components/svg/GoogleIcon'
import {
  createAuthorizeUrl,
  handleGoogleOAuth
} from '~/utils/googleAuth.server'
// import sampleUserInfo from '../../sampleUserInfo.json'
import {
  destroyUserSession,
  getUserFromSession,
  storeUserSession
} from '~/utils/JWT.server'

async function checkCookiesForUserInfo(request: Request) {
  // See if user is stored in the session
  const cookie = request.headers.get('Cookie')
  console.log('cookies in headers', cookie)
  if (!cookie) return undefined

  return await getUserFromSession(cookie)
}

export async function loader({ request }: Route.LoaderArgs) {
  // Holder for Set-Cookie header
  let setCookieHeader: string | undefined
  // See if user is stored in the session
  let user = await checkCookiesForUserInfo(request)
  // query search params for 'code' field from google auth
  const code = new URL(request.url).searchParams.get('code')

  // See if user was redirected from google auth
  if (!user && code) {
    const profile = await handleGoogleOAuth(code)
    // set user value to oAuth values and store in session memory
    if (profile.ok) {
      user = profile.data
      setCookieHeader = await storeUserSession(profile.data.sub)
      console.log('user session set', setCookieHeader)

      // Remove ?code from URL to prevent "invalid_grant" on refresh
      return redirect('/gallery', {
        headers: { 'Set-Cookie': setCookieHeader }
      })
    }
    // !Next! in the action (when pressing log in button, add functionality to check session storage)
    // TODO: Admin privs
    // TODO: Log out
    // TODO: Edit/Delete posts
  }

  // Get posts from db
  // await seedData()
  try {
    const res = await db
      .select({
        id: posts.id,
        text: posts.text,
        userId: posts.userId,
        userName: users.name,
        userPicture: users.picture
      })
      .from(posts)
      .leftJoin(users, eq(users.id, posts.userId))
      .groupBy(posts.id)
    return data(
      { DbData: res, userData: user },
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
  const url = new URL(request.url)
  const signOut = url.searchParams.get('sign-out')
  const signIn = url.searchParams.get('sign-in')

  if (typeof signOut === 'string') {
    // Sign user out (get rid of auth session)
    console.log('ran signOut function!')
    const cookieHeader = request.headers.get('Cookie')
    const clearedCookie = await destroyUserSession(cookieHeader)

    return redirect('/gallery', { headers: { 'Set-Cookie': clearedCookie } })
  }

  if (typeof signIn === 'string') {
    console.log('rand signIn function')
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
  }
}

export default function Gallery({ loaderData }: Route.ComponentProps) {
  // Image State
  const [userImage, setUserImage] = useState<string | null>(null)

  // Get loader data
  const comments = loaderData?.DbData
  const userInfo = loaderData?.userData

  // const userInfo = sampleUserInfo

  useEffect(() => {
    if (userInfo?.picture) {
      setUserImage(`${userInfo.picture}-rj`)
    } else {
      setUserImage(null)
    }
  }, [userInfo])

  // Form setup
  const form = useForm<z.infer<typeof memoryFormSchema>>({
    resolver: zodResolver(memoryFormSchema)
  })

  // Form submission
  function onSubmit(data: z.infer<typeof memoryFormSchema>) {
    console.log(data)
  }

  // Prompt State
  const [prompt] = useState<string>(
    carolPrompts.prompts[
      Math.floor(Math.random() * carolPrompts.prompts.length)
    ]
  )

  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data?.url) {
      window.location.href = fetcher.data.url
    }
  }, [fetcher.data])

  // Render
  return (
    <section className="flex flex-col items-center py-12 gap-12">
      <h1 className="font-ephesis text-7xl font-extrabold text-maroon py-6">
        Remember Carol With Us...
      </h1>
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
              <fetcher.Form method="post" action="/gallery?sign-out">
                <Button className="size-24 aspect-square rounded-md bg-maroon p-1 text-slate-50 text-wrap underline relative hover:opacity-75">
                  <img
                    src={userImage}
                    alt="Your google avatar"
                    className="absolute size-full rounded-md"
                  />
                  <p className="text-blue-700 underline z-10 absolute bottom-0.5 bg-lilac opacity-75 rounded-lg p-1">
                    Sign out
                  </p>
                </Button>
              </fetcher.Form>
            </div>
          ) : (
            <fetcher.Form method="post" action="/gallery?sign-in">
              <Button className="size-24 aspect-square rounded-md bg-maroon p-1 text-slate-50 text-wrap underline">
                Sign in
                <GoogleIcon className="size-6" />
              </Button>
            </fetcher.Form>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* TODO: Needs error handling for when user is not signed in */}
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
            </form>
          </Form>
        </div>
      </div>
      <Separator />
      {comments &&
        comments.map(({ id, userPicture, userName, text }) => {
          return (
            <div className="w-3xl flex gap-2" key={id}>
              {userPicture && (
                <img
                  src={userPicture}
                  alt=""
                  className="h-24 aspect-square rounded-md"
                />
              )}
              <div className="bg-slate-100 p-8 shadow-sm rounded-md flex flex-col gap-1 min-h-10 w-full relative">
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold">{userName}</h3>
                  <p>{text}</p>
                </div>
              </div>
            </div>
          )
        })}
    </section>
  )
}
