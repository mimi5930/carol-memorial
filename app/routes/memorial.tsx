import { getBasicCampaignData } from '~/lib/getCampaignData'
import type { Route } from './+types/memorial'
import { Separator } from '~/components/ui/separator'
import { Button } from '~/components/ui/button'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Memorial – Carol Trainor' },
    {
      name: 'description',
      content:
        "Information regarding the memorial fund established in Carol's memory."
    }
  ]
}

export async function loader() {
  return await getBasicCampaignData()
}

export default function memorial({ loaderData }: Route.ComponentProps) {
  const { amount_raised_unattributed, total_unique_donors } =
    loaderData.references.counts
  return (
    <section className="flex flex-col items-center py-8">
      <article className="flex flex-col gap-18 w-7xl text-lg bg-slate-50 rounded-md p-8 shadow-md pb-24">
        <h2 className="font-ephesis text-maroon text-7xl font-extrabold py-12 text-center">
          Honoring the Legacy of Carol Trainor: A Memorial Fund of Hope and
          Healing
        </h2>
        <h3 className="text-3xl font-bold">
          A Journey Marked by Resilience, Strength, and Unanswered Questions
        </h3>
        <p>
          Carol Trainor&apos;s life was one of deep love and unwavering
          commitment to those around her. In November 2024, Carol&apos;s health
          began to rapidly decline, and she was admitted to Fairview Hospital,
          where she began a battle against a series of mysterious medical
          challenges. Despite numerous tests and treatments, doctors were unable
          to pinpoint a definitive diagnosis. The medical community was left
          grasping for answers as Carol suffered from brain seizures—episodes
          that impacted her daily life in ways no one could have foreseen.
          Through each step of this unknown journey, Carol remained a pillar of
          strength. She continued to fight with grace. Her dedication to her
          family and her community never wavered, even as she faced this
          terrifying health crisis.
        </p>
        <h3 className="text-3xl font-bold">
          The Unbreakable Bond of Family and Community Support
        </h3>
        <p>
          Carol was surrounded by love and support during her medical journey,
          and the unwavering dedication of her family became the foundation for
          her strength. Her husband, Chad, stood by her side through every
          hospital visit, late-night stay, and moment of fear. Their bond was a
          source of unspoken comfort, a steady presence in the face of
          uncertainty.
        </p>
        <p>
          Carol&apos;s strength during her medical journey was mirrored by the
          unwavering love and support of her family. Surrounded by the care of
          her children, her devoted mother, her sister, her nieces and nephew,
          and her extended family, Carol was never alone in her fight. Their
          presence brought comfort during long hospital stays, moments of
          uncertainty, and countless days of waiting and hoping. The deep bond
          they shared was evident in every quiet gesture, every night spent at
          her side, and every word of encouragement spoken from the heart.
          Carol&apos;s love for her family was the foundation of her life, and
          their love for her was steadfast and enduring—a testament to the
          strength of the ties that held them together.
        </p>
        <p>
          Beyond her family, the Hudson community rallied around Carol and her
          loved ones, providing support in any way they could. From donations to
          emotional encouragement, the community's response was a testament to
          the mark Carol had left on those around her. As a key figure at Urban
          Olive and Vine, Carol was more than just a familiar face; she was a
          friend, mentor, and pillar of the community. Her kindness, work ethic,
          and dedication to helping others made her a beloved member of Hudson.
          As her health took its toll, this same community stepped up to help
          Carol and her family with the same love and generosity Carol had
          always shown them.
        </p>
        <h3 className="text-3xl font-bold">
          A Memorial Fund to Continue Carol's Legacy of Care and Compassion
        </h3>
        <p>
          In honor of Carol&apos;s life and the profound impact she had on those
          around her, her family has chosen to establish this memorial fund as a
          way to give back to the community that supported her so
          unconditionally. The mission of this fund is simple: to assist those
          who are facing similar health challenges and to provide a safety net
          for families dealing with the emotional, physical, and financial
          hardships of serious illness. The goal is to make a lasting
          impact—just as Carol did—by helping people in need, offering them the
          support and resources they need to navigate difficult medical
          journeys.
        </p>
        <p>
          Carol&apos;s story is one of strength, but also one of vulnerability.
          Her family&apos;s unwavering support and the community&apos;s
          outpouring of love during her time of need exemplify the power of
          compassion. This memorial fund aims to carry on that legacy, providing
          hope and assistance to those who find themselves in the midst of an
          uncertain medical journey, just as Carol did.
        </p>
        <h3 className="text-3xl font-bold">
          A Memorial Fund to Continue Carol's Legacy of Care and Compassion
        </h3>
        <p className="font-bold">
          The Carol A. Trainor Memorial Fund will focus on providing:
        </p>
        <ul className="list-disc list-outside pl-5">
          <li>
            Financial assistance for medical care, helping to alleviate the
            burden of healthcare costs for families facing serious illness.
          </li>
          <li>
            Support for caregiving families, including respite care and
            transportation to medical appointments, ensuring that families like
            Carol&apos;s can receive the help they need during difficult times.
          </li>
          <li>
            Bereavement support, offering counseling and emotional resources for
            those navigating the grief that often accompanies the loss of a
            loved one.
          </li>
          <li>
            Youth mentorship and community engagement programs at Urban Olive
            and Vine and other local initiatives, in honor of Carol&apos;s
            commitment to mentoring young people and giving back to the
            community.
          </li>
        </ul>
        <p>
          By establishing this fund, Carol&apos;s family hopes to create a
          lasting impact that reflects the values Carol held dear: compassion,
          community, and the unwavering support of those who love you.
          Carol&apos;s passing has left an irreplaceable void, but her legacy
          will live on through this fund—ensuring that others will receive the
          care, love, and support that Carol was fortunate enough to experience
          in her own life.
        </p>
        <h3 className="text-3xl font-bold">
          Giving Back to the Community Carol Loved
        </h3>
        <p>
          As we remember Carol Trainor and celebrate her life, we also recognize
          the profound influence she had on her family, friends, and community.
          The funds raised will ensure that Carol&apos;s compassion and
          generosity continue to touch lives for years to come. This memorial
          fund is not just a way to honor her memory—it is a way to continue her
          work of lifting others up and making a difference.
        </p>
        <p>
          We invite you to join us in this mission of love, support, and
          community care by contributing to the Carol A. Trainor Memorial Fund.
          Together, we can ensure that Carol&apos;s legacy of care and kindness
          lives on, offering hope and assistance to those in need in Hudson and
          beyond.
        </p>
        <Separator className="my-12" />
        <h3 className="text-3xl font-bold text-center">
          Thanks to the loving support of the community,
        </h3>
        <p className="text-center text-6xl font-bold text-maroon">
          ${amount_raised_unattributed.toLocaleString('en-US')}
        </p>
        <p className="text-center font-bold text-3xl">
          has been contributed so far by{' '}
          <span className="text-5xl text-maroon">
            {total_unique_donors.toLocaleString('en-US')}
          </span>{' '}
          people.
        </p>
        <p>
          Every donation, no matter how small, makes a meaningful difference.
          Whether it&apos;s a few dollars or a larger gift, your support helps
          carry out the mission of this fund—offering real, tangible help to
          individuals and families facing medical hardships. These contributions
          go directly toward easing the burden for those navigating uncertainty,
          just as Carol and her family once did. Each act of generosity becomes
          a ripple of hope, compassion, and care—extending Carol&apos;s legacy
          in the most heartfelt way.
        </p>
        <h3 className="text-3xl font-bold text-center">
          Make your contribution here
        </h3>
        {/* TODO: Add functionality */}
        <Button>Donate</Button>
      </article>
    </section>
  )
}
