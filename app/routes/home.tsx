import { Fragment } from 'react'
import type { Route } from './+types/home'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { carolHeadshot, headerLilacImg, hydrangeas } from '~/assets'
import { Button } from '~/components/ui/button'
import { Link } from 'react-router'
import CalendarHeart from '~/components/svg/CalendarHeart'
import Clock from '~/components/svg/Clock'
import FacebookIcon from '~/components/svg/FacebookIcon'
import { Separator } from '~/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { z } from 'zod'
import { contactFormSchema } from '~/lib/formSchema'
import { getCampaignData } from '~/lib/getCampaignData'
import { Textarea } from '~/components/ui/textarea'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carol Trainor' },
    {
      name: 'description',
      content: 'A memorial website for Carol Ann Trainor'
    }
  ]
}
// loader function
export async function loader() {
  return await getCampaignData()
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema)
  })

  // list of donations
  const donationsList = loaderData[0].references.donations
  // list of totals
  const donationCounts = loaderData[1].references.counts

  // TODO: Add functionality
  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      {/* Header */}
      <header className="h-[40rem] md:h-[56rem] relative">
        <img
          src={headerLilacImg}
          alt=""
          className="w-full h-full object-cover object-top border-b-[0.5rem] md:border-b-[1rem] border-maroon shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center rounded-xl bg-accent/75 p-6 md:p-8 shadow-lg mx-4">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
              <h2 className="font-ephesis text-4xl md:text-6xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                1966
              </h2>
              <img
                src={carolHeadshot}
                alt="Carol Trainor"
                className="h-64 md:h-[30rem] ring-maroon ring-4 md:ring-8 rounded-xl shadow-xl shadow-black"
              />
              <h2 className="font-ephesis text-4xl md:text-6xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                2025
              </h2>
            </div>
            <div className="flex flex-col items-center py-5 gap-2 text-center">
              <h2 className="font-ephesis text-2xl md:text-5xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                The world is in your hands, now use it.
              </h2>
              <h2 className="font-ephesis text-xl md:text-4xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                ~ Phil Collins
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      {/* Main content */}
      <main className="py-12 flex justify-center">
        <section
          className="
      flex justify-evenly w-full
      flex-col lg:flex-row gap-12
      px-4 sm:px-6 md:px-12
    "
        >
          {/* Left column */}
          <div className="w-full lg:w-6xl text-base md:text-lg/8 p-4 sm:p-8 lg:p-12 flex flex-col gap-16 lg:gap-24">
            {/* Family message */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold pb-4">
                A Personal Message from Carol's Family
              </h2>
              <p>
                "Thank you for visiting this memorial site and for taking a
                moment to honor the memory of Carol. Your presence here means so
                much to our family. Whether you are a close friend, a relative,
                or someone who simply wants to pay their respects, we are deeply
                grateful for your support, love, and shared remembrance during
                this time."
              </p>
            </div>

            <Separator />

            {/* Glimpse of life */}
            <section className="py-8 sm:py-12">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">
                  A Glimpse of Carol’s Life
                </h2>
                <p className="text-slate-600 mb-6 sm:mb-10 max-w-2xl">
                  A few memories from family and friends that capture her
                  warmth, humor, and love.
                </p>

                {/* Memory posts */}
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 text-left">
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="italic text-slate-700">
                      “Carol never let anyone leave her home without food in
                      their hands and a smile on their face.”
                    </p>
                    <p className="mt-4 text-sm text-slate-500">
                      – A longtime neighbor
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="italic text-slate-700">
                      “Her laughter was contagious. She turned ordinary days
                      into joyful ones.”
                    </p>
                    <p className="mt-4 text-sm text-slate-500">
                      – A close friend
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="italic text-slate-700">
                      “She taught me how to garden, and every spring I still
                      hear her voice reminding me where to plant the tulips.”
                    </p>
                    <p className="mt-4 text-sm text-slate-500">
                      – A family member
                    </p>
                  </div>
                </div>

                {/* Button to gallery */}
                <div className="mt-8 sm:mt-10">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/gallery">View Full Gallery</Link>
                  </Button>
                </div>
              </div>
            </section>

            <Separator />

            {/* Obituary */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Obituary
              </h2>
              <p>
                Carol A. Trainor, age 58, of Hudson, Wisconsin, passed away on
                May 5, 2025. Carol was born October 20, 1966 in St. Paul, MN to
                Richard and Louise (Thompson) Weiher. She married Chad Trainor
                on September 1, 1993 in Milwaukee, WI
              </p>
              <p>
                Carol was a Hudson native and graduated from Hudson High School
                in 1985 and went on to earn a degree in Applied Mathematics from
                UW-River Falls. A lifelong lover of music, Carol accompanied her
                school choirs on piano growing up, served as a pianist for the
                Hudson United Methodist Church for over a decade, and was the
                accompanist of the Hudson Middle School Choirs for the past
                several years...
              </p>
              <div className="w-full sm:w-auto">
                <Button asChild className="w-full">
                  <Link to="/about#obituary">Go to full Obituary</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right column (donations) */}
          <div className="w-full lg:w-2xl bg-slate-100 shadow-md rounded-md text-base md:text-lg/8 p-6 sm:p-8 lg:p-12 gap-6 lg:gap-8 flex flex-col">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold pb-4 text-center">
              Give Your Support
            </h2>
            <p>
              Carol's family asks for you to please make a donation to{' '}
              <a className="underline">Carol's Memorial Fund.</a>
            </p>
            <p>
              This fund has been thoughtfully established as a way to extend the
              love, kindness, and support that our family has been so deeply
              grateful to receive during difficult times. It is our hope that
              through this fund, we can offer comfort, assistance, and a sense
              of solidarity to others who may be going through similar
              experiences of loss or hardship.
            </p>

            <Separator />
            <p className="text-center text-2xl sm:text-3xl font-bold">
              $
              {donationCounts.amount_raised_unattributed.toLocaleString(
                'en-US'
              )}
            </p>
            <p className="text-center text-lg sm:text-2xl">
              Contributed so far by{' '}
              <span className="font-bold">
                {donationCounts.total_donations.toLocaleString('en-US')}
              </span>{' '}
              people
            </p>
            <Separator />
            <h3 className="text-xl sm:text-2xl font-bold">
              Recent Contributions
            </h3>
            {donationsList.map(({ name, amount }, index) => {
              return (
                <Fragment key={amount + name + index}>
                  {index != 0 && <Separator key={name + amount + index} />}
                  <div
                    key={name + amount + index + index}
                    className="text-base sm:text-lg flex justify-between"
                  >
                    <p>{name}</p>
                    <p>${amount}</p>
                  </div>
                </Fragment>
              )
            })}
            <Button className="w-full sm:w-auto">Contribute</Button>
          </div>
        </section>
      </main>

      <section className="flex flex-col items-center pt-8" id="contact">
        <article className="flex flex-col gap-8 w-full text-lg bg-slate-50 p-8 shadow-md py-16 relative border-t-[0.5rem] md:border-t-[1rem] border-maroon">
          <h2 className="font-ephesis text-7xl font-extrabold py-12 self-center z-10">
            Reach Out to Carol's Family
          </h2>
          <div className="flex justify-center z-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-7xl"
              >
                {/* TODO: Add honeypot */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="message" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <img
            src={hydrangeas}
            alt=""
            className="w-full h-full object-cover absolute filter top-0 left-0 opacity-5"
          />
        </article>
      </section>
    </>
  )
}
