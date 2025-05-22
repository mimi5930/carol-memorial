import type { Route } from './+types/home'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../components/ui/navigation-menu'
import { carolHeadshot, headerLilacImg } from '~/assets'
import { Button } from '~/components/ui/button'
import { Link } from 'react-router'
import CalendarHeart from '~/components/svg/CalendarHeart'
import Clock from '~/components/svg/Clock'
import FacebookIcon from '~/components/svg/FacebookIcon'
import { Separator } from '~/components/ui/separator'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Carol Trainor' },
    {
      name: 'description',
      content: 'A memorial website for Carol Ann Trainor'
    }
  ]
}

export default function Home() {
  return (
    <>
      <header className="h-[56rem] relative">
        <img
          src={headerLilacImg}
          alt=""
          className="w-full h-full object-cover object-top border-b-8 border-amber-400 shadow-lg"
        />
        <div className="absolute bottom-0 left-0 h-full w-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center rounded-xl bg-accent/70 p-8 shadow-lg">
            <div className="flex justify-center items-center gap-8">
              <h2 className="font-ephesis text-6xl font-extrabold text-orange-200 text-shadow-md text-shadow-black">
                1966
              </h2>
              <img
                src={carolHeadshot}
                alt="A photo of Carol Trainor with her bright pink hair in front of her beloved lilac bush at her house"
                className="h-[30rem] ring-amber-400 ring-8 rounded-xl shadow-xl shadow-black"
              />
              <h2 className="font-ephesis text-6xl font-extrabold text-orange-200 text-shadow-md text-shadow-black">
                2025
              </h2>
            </div>
            <div className="flex flex-col items-center py-5 gap-1.5">
              {/* TODO: Add a button to redirect. Usually present in hero image */}
              <h2 className="font-ephesis text-5xl font-extrabold text-orange-200 text-shadow-md text-shadow-black">
                The world is in your hands, now use it.
              </h2>
              <h2 className="font-ephesis text-4xl font-extrabold text-orange-200 text-shadow-md text-shadow-black">
                ~ Phil Collins
              </h2>
            </div>
          </div>
        </div>
      </header>
      <main className="py-12 flex justify-center">
        <section className="flex justify-evenly w-full ">
          <div className="w-5xl bg-slate-100 rounded-xl shadow-md text-lg/8 p-12 flex flex-col gap-24">
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
                <div className="bg-lilac p-8 shadow-sm rounded-md flex flex-col gap-1">
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
                    <Button>
                      <a href="https://www.facebook.com/share/1GgRLGXKA3/">
                        <FacebookIcon />
                      </a>
                    </Button>
                    <Button>Add to Calendar</Button>
                  </div>
                </div>
                <div className="bg-lilac p-8 shadow-sm rounded-md flex flex-col gap-1">
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
                    <Button>
                      <a href="https://www.facebook.com/share/1LwVhF7NPC/">
                        <FacebookIcon />
                      </a>
                    </Button>
                    <Button>Add to Calendar</Button>
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
              <Button>Go to full Obituary</Button>
            </div>
          </div>
          <div className="w-3xl bg-slate-100 shadow-md text-lg/8 p-12 gap-8 flex flex-col h-max">
            <h2 className="text-4xl font-bold pb-4 text-center">
              In Lieu of Flowers
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
            <p className="text-center text-3xl font-bold">$13,000</p>
            <p className="text-center text-2xl">
              Contributed so far by 12 people
            </p>
            <Separator />
            <h3 className="text-2xl font-bold">Recent Contributions</h3>
            <div className="text-lg flex justify-between">
              <p>John Doe</p>
              <p>$20.00</p>
            </div>
            <Separator />
            <div className="text-lg flex justify-between">
              <p>Anonymous</p>
              <p>$20.00</p>
            </div>
            <Separator />
            <div className="text-lg flex justify-between">
              <p>Anonymous</p>
              <p>$20.00</p>
            </div>
            <Button>Contribute</Button>
          </div>
        </section>
        {/* <section className="p-12 flex flex-col items-center w-7xl gap-6 bg-slate-100 rounded-xl shadow-md text-lg/8">
          <h2 className="font-ephesis text-7xl font-extrabold py-2">
            Carol's Life
          </h2>
          <p className="self-start">
            Carol A. Trainor, age 58, of Hudson, Wisconsin, passed away on May
            5, 2025. Carol was born October 20, 1966 in St. Paul, MN to Richard
            and Louise (Thompson) Weiher. She married Chad Trainor on September
            1, 1993 in Milwaukee, WI.
          </p>
          <p>
            Carol was a Hudson native and graduated from Hudson High School in
            1985 and went on to earn a degree in Applied Mathematics from
            UW-River Falls. A lifelong lover of music, Carol accompanied her
            school choirs on piano growing up, served as a pianist for the
            Hudson United Methodist Church for over a decade, and was the
            accompanist of the Hudson Middle School Choirs for the past several
            years. She performed in multiple handbell choirs since her teenage
            years, including the Weigand Ringers, Alleluia Ringers, and
            Gospbells with her mother, sister, and several friends.
          </p>
          <p>
            Carol and her husband Chad became the owners of Urban Olive and Vine
            in 2018. Carol was a fixture in Urban who was always easy to spot
            with her funky colored hair. She wore many hats in her role,
            including server, barista, cook, bookkeeper, and community
            ambassador. Carol's greatest joy and accomplishment at Urban,
            however, was by far being a mentor to the teens she worked with.
            From providing a safe space to express themselves, to tutoring them
            with their math homework, to being someone they could always confide
            in, she cared for her young employees like family.
          </p>
          <p>
            Carol loved gardening, crocheting, and spending time with her
            family. She loved living in the same city as her mother, sister, and
            beloved nieces and nephew. She loved to relax on her patio swing on
            a hot summer evening and admire her show-stopping garden. She
            crocheted a blanket and scarf for just about everyone in her family.
            Above all, Carol dedicated her life to loving and caring for her
            children and husband, who adored her in return, and she loved
            nothing more than spending every second she could with her beloved
            granddaughter.
          </p>
          <p>
            Carol is survived by her loving husband of nearly 32 years, Chad;
            daughter, Brianna (Matthew Schiessl); son, Morgan (Michael Miller);
            mother, Louise Weiher; sister Diane (Leif) Hallen; granddaughter,
            Lydia; nieces and nephew, Mariah, Sarah, Jenna, and Nicholas; and
            many other loving cousins and relatives. She was preceded in death
            by her father, Richard Weiher.
          </p>
          <p>
            A visitation open to the public will be 2-6 PM Friday June 20 and 11
            AM - 3 PM Saturday June 21 at the O’Connell Family Funeral Home in
            Hudson, WI. In lieu of flowers, donations may be made to the family
            which will be used to establish a memorial fund by Carol’s family,
            which will be for the purpose of giving back to the Hudson Area
            community in her memory.
          </p>
          <div className="flex gap-5">
            <Button variant="secondary">Download Carol's Obituary</Button>
            <Button>Carol's Memorial Fund</Button>
          </div>
        </section> */}
      </main>
      <footer className="h-[25rem] bg-slate-500 flex flex-col justify-center items-center text-base text-orange-50">
        <div>
          <h2 className="font-bold text-2xl pb-3">Carol Ann Trainor</h2>
          <div className="flex gap-32">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-lg">ABOUT</h3>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                Carol's Life
              </Link>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                Memorial Fund
              </Link>
              <h3 className="font-bold">LINKS</h3>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                Articles
              </Link>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                Urban Olive and Vine
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">DONATE</h3>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                Paypal
              </Link>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                Other payments
              </Link>
              <Link
                to="/"
                className="text-sm hover:underline underline-offset-3"
              >
                GALLERY
              </Link>
              <h3 className="font-bold">Contact</h3>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
