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
  getAuthorizedUserData
} from '~/actions/googleAuth.server'

export async function loader({ params, request }: Route.LoaderArgs) {
  // See if user is signed in with google
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  if (code) {
    const user = getAuthorizedUserData(code)
    console.log(user)
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
    return res
  } catch (error) {
    return console.log(error)
  }
}

export async function action({ request }: Route.ActionArgs) {
  const res = await createAuthorizeUrl()
  return data(
    { url: res.url },
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

export default function Gallery({ loaderData }: Route.ComponentProps) {
  // Get loader data
  const comments = loaderData

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
          <fetcher.Form method="post" action="/gallery/">
            <Button className="size-24 aspect-square rounded-md bg-maroon p-1 text-slate-50 text-wrap underline">
              Sign in
              <GoogleIcon className="size-6" />
            </Button>
          </fetcher.Form>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
