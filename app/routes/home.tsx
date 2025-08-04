import { Fragment } from 'react'
import type { Route } from './+types/home'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { carolHeadshot, headerLilacImg } from '~/assets'
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
import { formSchema } from '~/lib/formSchema'
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  console.log(loaderData)

  // list of donations
  const donationsList = loaderData[0].references.donations
  // list of totals
  const donationCounts = loaderData[1].references.counts

  // TODO: Add functionality
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <header className="h-[56rem] relative">
        <img
          src={headerLilacImg}
          alt=""
          className="w-full h-full object-cover object-top border-b-[1rem] border-maroon shadow-lg"
        />
        <div className="absolute bottom-0 left-0 h-full w-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center rounded-xl bg-accent/75 p-8 shadow-lg">
            <div className="flex justify-center items-center gap-8">
              <h2 className="font-ephesis text-6xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                1966
              </h2>
              <img
                src={carolHeadshot}
                alt="A photo of Carol Trainor with her bright pink hair in front of her beloved lilac bush at her house"
                className="h-[30rem] ring-maroon ring-8 rounded-xl shadow-xl shadow-black"
              />
              <h2 className="font-ephesis text-6xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                2025
              </h2>
            </div>
            <div className="flex flex-col items-center py-5 gap-1.5">
              {/* TODO: Add a button to redirect. Usually present in hero image */}
              <h2 className="font-ephesis text-5xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                The world is in your hands, now use it.
              </h2>
              <h2 className="font-ephesis text-4xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
                ~ Phil Collins
              </h2>
            </div>
          </div>
        </div>
      </header>
      <main className="py-12 flex justify-center">
        <section className="flex justify-evenly w-full ">
          <div className="w-6xl text-lg/8 p-12 flex flex-col gap-24">
            <div className="">
              <h2 className="text-4xl font-bold pb-4">
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
            <div>
              <h2 className="text-4xl font-bold pb-4">
                Celebrate Carol's Life
              </h2>
              <h2 className="text-2xl font-bold pb-4">Visitations</h2>
              <div className="flex gap-8">
                <div className="bg-slate-100 p-8 shadow-sm rounded-md flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CalendarHeart />
                    <h3 className="text-lg font-bold">Friday, June 20, 2025</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock />
                    <h3>2PM - 6PM</h3>
                  </div>
                  <div>
                    <p>
                      <a
                        href="https://www.oconnellfuneralhomes.com/"
                        className="underline"
                      >
                        O'Connell Family Funeral Home
                      </a>
                    </p>
                    <p className="text-sm">
                      520 11th Street South Hudson, WI 54016
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <a href="https://www.facebook.com/share/1GgRLGXKA3/">
                      <Button>
                        <FacebookIcon />
                      </Button>
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button>Add to Calendar</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20250620T200000Z%2F20250621T000000Z&details=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&location=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&text=Carol%20Trainor%20Visitation">
                            Google Calendar
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://calendar.yahoo.com/?desc=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&dur=false&et=20250621T000000Z&in_loc=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&st=20250620T200000Z&title=Carol%20Trainor%20Visitation&v=60">
                            Yahoo
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://outlook.live.com/calendar/0/action/compose?allday=false&body=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&enddt=2025-06-20T19%3A00%3A00&location=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2025-06-20T15%3A00%3A00&subject=Carol%20Trainor%20Visitation">
                            Outlook
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://calendar.aol.com/?desc=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&dur=false&et=20250621T000000Z&in_loc=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&st=20250620T200000Z&title=Carol%20Trainor%20Visitation&v=60">
                            AOL Calendar
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="bg-slate-100 p-8 shadow-sm rounded-md flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <CalendarHeart />
                    <h3 className="text-lg font-bold">
                      Saturday, June 21, 2025
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock />
                    <h3>11AM - 3PM</h3>
                  </div>
                  <div>
                    <p>
                      <a
                        href="https://www.oconnellfuneralhomes.com/"
                        className="underline"
                      >
                        O'Connell Family Funeral Home
                      </a>
                    </p>
                    <p className="text-sm">
                      520 11th Street South Hudson, WI 54016
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <a href="https://www.facebook.com/share/1LwVhF7NPC/">
                      <Button>
                        <FacebookIcon />
                      </Button>
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button>Add to Calendar</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20250621T170000Z%2F20250621T210000Z&details=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&location=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&text=Carol%20Trainor%20Visitation">
                            Google Calendar
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://calendar.yahoo.com/?desc=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&dur=false&et=20250621T210000Z&in_loc=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&st=20250621T170000Z&title=Carol%20Trainor%20Visitation&v=60">
                            Yahoo
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://outlook.live.com/calendar/0/action/compose?allday=false&body=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&enddt=2025-06-21T16%3A00%3A00&location=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2025-06-21T12%3A00%3A00&subject=Carol%20Trainor%20Visitation">
                            Outlook
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <a href="https://calendar.aol.com/?desc=Carol%20Trainor%20passed%20away%20on%20May%205%2C%202025.%20Visitations%20open%20to%20the%20public%20will%20be%202-6%20PM%20Friday%20June%2020%20and%2011%20AM%20-%203%20PM%20Saturday%20June%2021%20at%20the%20O%E2%80%99Connell%20Family%20Funeral%20Home%20in%20Hudson%2C%20WI.&dur=false&et=20250621T210000Z&in_loc=520%2011th%20Street%20South%20Hudson%2C%20WI%2054016&st=20250621T170000Z&title=Carol%20Trainor%20Visitation&v=60">
                            AOL Calendar
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl font-bold">Obituary</h2>
              <p className="self-start">
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
              <Link to="/about#obituary">
                <Button className="w-full">Go to full Obituary</Button>
              </Link>
            </div>
          </div>
          <div className="w-2xl bg-slate-100 shadow-md rounded-md text-lg/8 p-12 gap-8 flex flex-col">
            <h2 className="text-4xl font-bold pb-4 text-center">
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
            <p className="text-center text-3xl font-bold">
              $
              {donationCounts.amount_raised_unattributed.toLocaleString(
                'en-US'
              )}
            </p>
            <p className="text-center text-2xl">
              Contributed so far by{' '}
              <span className="font-bold">
                {donationCounts.total_donations.toLocaleString('en-US')}
              </span>{' '}
              people
            </p>
            <Separator />
            <h3 className="text-2xl font-bold">Recent Contributions</h3>
            {donationsList.map(({ is_anonymous, name, amount }, index) => {
              return (
                <Fragment key={amount + name + index}>
                  {index != 0 && <Separator key={name + amount + index} />}
                  <div
                    key={name + amount + index + index}
                    className="text-lg flex justify-between"
                  >
                    <p>{name}</p>
                    <p>${amount}</p>
                  </div>
                </Fragment>
              )
            })}
            <Button>Contribute</Button>
          </div>
        </section>
      </main>
      <section className="flex flex-col items-center pt-8" id="contact">
        <article className="flex flex-col gap-8 w-full text-lg bg-slate-50 rounded-md p-8 shadow-md py-16">
          <h2 className="font-ephesis text-7xl font-extrabold py-12 self-center">
            Reach Out to Carol's Family
          </h2>
          <div className="flex justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-7xl"
              >
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
        </article>
      </section>
    </>
  )
}
