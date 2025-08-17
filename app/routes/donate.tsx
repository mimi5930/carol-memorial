import type { Route } from './+types/donate'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { headerLilacImg } from '~/assets'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Donations – Carol Trainor' },
    {
      name: 'description',
      content:
        "Support Carol's memorial fund by donating via Venmo, PayPal, or other platforms."
    }
  ]
}

export default function Donations() {
  return (
    <>
      {/* Hero Section */}
      <header className="h-[28rem] relative">
        <img
          src={headerLilacImg}
          alt=""
          className="w-full h-full object-cover object-top border-b-[1rem] border-maroon shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-accent/70">
          <h1 className="font-ephesis text-6xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
            Give Your Support
          </h1>
          <p className="mt-4 text-xl text-center max-w-2xl text-maroon">
            Carol&apos;s Memorial Fund has been established as a way to extend
            the love, kindness, and support that her family has been so deeply
            grateful to receive. Thank you for considering a gift.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 flex justify-center">
        <section className="w-full max-w-5xl flex flex-col gap-16 px-6">
          {/* Donation Options */}
          <div className="bg-slate-100 shadow-md rounded-xl p-12 flex flex-col gap-8">
            <h2 className="text-4xl font-bold text-center">Ways to Donate</h2>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Venmo */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center gap-4">
                <h3 className="text-2xl font-bold">Venmo</h3>
                <p className="text-center">
                  Send your gift directly via Venmo.
                </p>
                <a
                  href="https://venmo.com/JChadTrainor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Donate with Venmo</Button>
                </a>
              </div>

              {/* PayPal */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center gap-4">
                <h3 className="text-2xl font-bold">PayPal</h3>
                <p className="text-center">Secure donations through PayPal.</p>
                <a
                  href="https://paypal.me/JChadTrainor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Donate with PayPal</Button>
                </a>
              </div>

              {/* Optional Third Option */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center gap-4">
                <h3 className="text-2xl font-bold">GoFundMe</h3>
                <p className="text-center">
                  Contribute through our campaign page.
                </p>
                <a
                  href="https://www.gofundme.com/f/YOUR_CAMPAIGN"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full">Donate via GoFundMe</Button>
                </a>
              </div>
            </div>
          </div>

          {/* Totals & Contributions (optional re-use) */}
          <div className="bg-slate-50 shadow-md rounded-xl p-12 flex flex-col gap-6 items-center">
            <h2 className="text-3xl font-bold">Your Impact</h2>
            <p className="text-2xl">
              <span className="font-bold">$12,540</span> raised so far by{' '}
              <span className="font-bold">86</span> kind supporters
            </p>
            <Separator />
            <div className="flex flex-col gap-2 w-full">
              <h3 className="text-xl font-bold">Recent Contributions</h3>
              <div className="flex justify-between">
                <p>Anonymous</p>
                <p>$100</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>Mary S.</p>
                <p>$50</p>
              </div>
              <Separator />
              <div className="flex justify-between">
                <p>Tom & Linda</p>
                <p>$200</p>
              </div>
            </div>
          </div>

          {/* Closing CTA */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-center max-w-3xl">
              Every gift, big or small, helps Carol’s legacy live on and brings
              comfort to her family. We are so grateful for your generosity.
            </p>
            <a href="#top">
              <Button size="lg" className="rounded-2xl shadow-lg">
                Back to Top
              </Button>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
