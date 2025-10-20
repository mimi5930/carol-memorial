import { Fragment } from 'react'
import { Separator } from './ui/separator'
import type {
  GofundmeCountData,
  GofundmeDonationsData
} from '~/lib/getCampaignData'

export default function ContributionCardSections({
  gofundmeCountData,
  gofundmeDonationsData
}: React.ComponentPropsWithoutRef<'div'> & {
  gofundmeCountData: GofundmeCountData
  gofundmeDonationsData: GofundmeDonationsData
}) {
  // Totals data from gofundme
  const donationCounts = gofundmeCountData.references.counts

  // Return first three donations
  const donationsList = gofundmeDonationsData.references.donations.slice(0, 3)

  return (
    <div>
      <p className="text-center text-2xl sm:text-3xl font-bold">
        ${donationCounts.amount_raised_unattributed.toLocaleString('en-US')}
      </p>
      <p className="text-center text-lg sm:text-2xl">
        Contributed so far by{' '}
        <span className="font-bold">
          {donationCounts.total_donations.toLocaleString('en-US')}
        </span>{' '}
        people
      </p>
      <Separator />
      <h3 className="text-xl sm:text-2xl font-bold">Recent Contributions</h3>
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
    </div>
  )
}
