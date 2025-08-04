export type GofundmeDonationsData = {
  meta: { has_next: boolean; last_updated_at: string }
  references: {
    donations: {
      amount: number
      checkout_id: string
      created_at: string
      currencycode: string
      donation_id: number
      fund_id: number
      is_anonymous: boolean
      is_offline: boolean
      name: string
      profile_url: string
      verified: boolean
    }[]
  }
}

export type GofundmeCountData = {
  meta: { last_updated_at: string }
  references: {
    counts: {
      amount_raised_unattributed: number
      campaign_hearts: number
      number_of_donations_unattributed: number
      social_share_total: number
      total_co_photos: number
      total_comments: number
      total_community_photos: number
      total_donations: number
      total_photos: number
      total_unique_donors: number
      total_updates: number
    }
  }
}
export type GofundmeData = [GofundmeDonationsData, GofundmeCountData]

// TODO: Add error handling
export async function getCampaignData() {
  const campaignName = 'support-chad-carol-in-their-time-of-need'
  // fetch donations [0] and count [1]
  let donationRes = await Promise.all([
    fetch(
      `https://gateway.gofundme.com/web-gateway/v1/feed/${campaignName}/donations?limit=3&offset=0`
    ).then(res => res.json()),
    fetch(
      `https://gateway.gofundme.com/web-gateway/v1/feed/${campaignName}/counts`
    ).then(res => res.json())
  ])
  // return both in JSON format
  return donationRes as GofundmeData
}

// fetches just the basic information (total amount, number of contributions)
export async function getBasicCampaignData() {
  const campaignName = 'support-chad-carol-in-their-time-of-need'
  const campaignRes = await fetch(
    `https://gateway.gofundme.com/web-gateway/v1/feed/${campaignName}/counts`
  ).then(res => res.json())
  return campaignRes as GofundmeCountData
}
