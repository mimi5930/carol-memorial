import type { Route } from './+types/donate'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import PageHeader from '~/components/PageHeader'
import { Paypall, Venmo } from '~/components/svg'

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
      <PageHeader>Give Your Support</PageHeader>

      {/* Main Content */}
      <main className="py-16 flex justify-center">
        <section className="w-full max-w-5xl flex flex-col gap-16 px-6">
          <p className="text-xl self-center max-w-2xl text-maroon text-center">
            Carol&apos;s Memorial Fund has been established as a way to extend
            the love, kindness, and support that her family has been so deeply
            grateful to receive.{' '}
            <span className="font-semibold">Thank you</span> for considering a
            gift.
          </p>

          {/* Donation Options */}
          <div className="bg-slate-100 shadow-md rounded-xl p-12 flex flex-col gap-8">
            <h2 className="text-4xl font-bold text-center">Ways to Donate</h2>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Venmo */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center gap-4">
                <a
                  href="https://venmo.com/JChadTrainor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Venmo className="size-24 fill-maroon" />
                </a>
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
                <a
                  href="https://paypal.me/JChadTrainor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Paypall className="size-24 fill-maroon" />
                </a>
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
            </div>
          </div>

          {/* Totals & Contributions */}
          <div className="bg-slate-50 shadow-md rounded-xl p-12 flex flex-col gap-6 items-center">
            <h2 className="text-3xl font-bold">Your Impact</h2>
            <p className="text-lg">
              Your donation to Carol Trainor&apos;s Memorial Fund will make a
              lasting difference in our community. Every gift helps continue
              Carol&apos;s legacy of compassion by supporting individuals and
              families facing unexpected medical hardships. Through your
              generosity, we&apos;ll be able to provide financial assistance,
              comfort, and hope to those struggling with the weight of medical
              challenges, just as Carol always offered care and kindness to
              those around her. Together, we can turn her spirit of giving into
              real help for those who need it most.
            </p>
            <p className="text-lg">
              Every gift, big or small, helps Carol&apos;s legacy live on and
              brings comfort to her family. We are so grateful for your
              generosity.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
