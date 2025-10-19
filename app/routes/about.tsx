import { Button } from '~/components/ui/button'
import type { Route } from '../+types/root'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About – Carol Trainor' },
    {
      name: 'description',
      content: "Carol's biography and legacy."
    }
  ]
}

export default function About() {
  return (
    <section className="flex flex-col items-center pt-6 sm:pt-8 px-4">
      <article className="flex flex-col gap-6 sm:gap-8 w-full max-w-7xl text-base sm:text-lg bg-slate-50 rounded-md p-4 sm:p-8 shadow-md">
        <h2 className="font-ephesis text-4xl sm:text-7xl text-maroon font-extrabold py-6 sm:py-12 text-center">
          Remembering Carol&apos;s Life
        </h2>

        {/* Biography */}
        <p>
          Carol Ann Trainor (née Weiher) was a remarkable woman whose warmth,
          creativity, and dedication to others left an indelible mark on her
          family, friends, and community. Born on October 20, 1966, in St. Paul,
          Minnesota, to Richard and Louise (Thompson) Weiher, Carol grew up in
          Hudson, Wisconsin, a place she would forever call home. Her childhood
          was filled with the rhythms of music, the bonds of family, and the
          roots of friendships that would last a lifetime.
        </p>
        <p>
          A proud graduate of Hudson High School in 1985, Carol went on to
          pursue her love for problem-solving by earning a degree in Applied
          Mathematics from the University of Wisconsin–River Falls. Her sharp
          mind and strong work ethic were matched by her artistic spirit,
          particularly her deep love for music. From a young age, Carol
          accompanied her school choirs on piano and would go on to share her
          musical gifts throughout her life. She played for over a decade at
          Hudson United Methodist Church, brought joy as the accompanist for the
          Hudson Middle School Choirs in recent years, and rang in countless
          seasons with handbell choirs—including the Weigand Ringers, Alleluia
          Ringers, and Gospbells—often alongside her mother, sister, and
          friends.
        </p>
        <p>
          On September 1, 1993, Carol married the love of her life, Chad
          Trainor, in Milwaukee, Wisconsin. Together they built a life grounded
          in love, laughter, and mutual support. In 2018, they embarked on a new
          adventure as the owners of Urban Olive and Vine, a popular Hudson café
          and gathering place. Carol’s presence there became as iconic as her
          ever-changing, brightly colored hair. She thrived in the bustle of the
          café, wearing many hats—server, barista, cook, bookkeeper, and
          community ambassador. Yet, for Carol, her most treasured role at Urban
          was as a mentor to the many teens who worked alongside her. She
          offered guidance, compassion, and encouragement, whether she was
          helping with math homework, lending an ear to personal struggles, or
          simply providing a safe space where young people felt valued and
          heard.
        </p>
        <p>
          Outside of her professional and musical pursuits, Carol’s home life
          was filled with beauty and creativity. She was an avid gardener whose
          flower beds were the envy of the neighborhood, a gifted crocheter
          whose handmade blankets and scarves became treasured keepsakes, and a
          devoted wife, mother, sister, and grandmother. Some of her happiest
          moments were spent relaxing on her patio swing on a warm summer
          evening, taking in the vibrant colors of her garden while sharing
          stories and laughter with her family.
        </p>
        <p>
          Family was the heart of Carol’s life. She cherished living close to
          her mother, sister, and beloved nieces and nephew, always eager to
          host gatherings and celebrate milestones together. Above all, her
          greatest joy came from being with her children, Brianna and Morgan,
          and her precious granddaughter, Lydia. She poured her heart into every
          moment with them, whether it was a quiet conversation over coffee or a
          lively family celebration.
        </p>
        <p>
          Carol’s life was one of generosity, artistry, and steadfast love. She
          is survived by her devoted husband of nearly 32 years, Chad; daughter,
          Brianna (Matthew Schiessl); son, Morgan (Michael Miller); mother,
          Louise Weiher; sister, Diane (Leif) Hallen; granddaughter, Lydia;
          nieces and nephew, Mariah, Sarah, Jenna, and Nicholas; as well as many
          extended family members, friends, and the countless lives she touched.
          She was preceded in death by her father, Richard Weiher.
        </p>
        <p>
          Though her passing on May 5, 2025, leaves a deep ache in the hearts of
          all who knew her, Carol’s spirit will continue to shine through the
          music she played, the gardens she nurtured, and the love she gave so
          freely. Her family will honor her memory through a memorial fund
          dedicated to giving back to the Hudson area community she cared for so
          deeply.
        </p>
      </article>

      {/* Obituary */}
      <article
        id="obituary"
        className="flex flex-col w-full max-w-7xl bg-slate-50 mt-6 sm:mt-8 rounded-md shadow-md p-4 sm:p-8 mb-6 sm:mb-8 gap-6 sm:gap-8 text-base sm:text-lg"
      >
        <h2 className="font-ephesis text-4xl sm:text-7xl text-maroon font-extrabold py-6 sm:py-12 text-center">
          Carol&apos;s Obituary
        </h2>

        <p>
          Carol A. Trainor, age 58, of Hudson, Wisconsin, passed away on May 5,
          2025. Carol was born October 20, 1966 in St. Paul, MN to Richard and
          Louise (Thompson) Weiher. She married Chad Trainor on September 1,
          1993 in Milwaukee, WI.
        </p>
        <p>
          Carol was a Hudson native and graduated from Hudson High School in
          1985 and went on to earn a degree in Applied Mathematics from UW-River
          Falls. A lifelong lover of music, Carol accompanied her school choirs
          on piano growing up, served as a pianist for the Hudson United
          Methodist Church for over a decade, and was the accompanist of the
          Hudson Middle School Choirs for the past several years. She performed
          in multiple handbell choirs since her teenage years, including the
          Weigand Ringers, Alleluia Ringers, and Gospbells with her mother,
          sister, and several friends.
        </p>
        <p>
          Carol and her husband Chad became the owners of Urban Olive and Vine
          in 2018. Carol was a fixture in Urban who was always easy to spot with
          her funky colored hair. She wore many hats in her role, including
          server, barista, cook, bookkeeper, and community ambassador. Carol's
          greatest joy and accomplishment at Urban, however, was by far being a
          mentor to the teens she worked with. From providing a safe space to
          express themselves, to tutoring them with their math homework, to
          being someone they could always confide in, she cared for her young
          employees like family.
        </p>
        <p>
          Carol loved gardening, crocheting, and spending time with her family.
          She loved living in the same city as her mother, sister, and beloved
          nieces and nephew. She loved to relax on her patio swing on a hot
          summer evening and admire her show-stopping garden. She crocheted a
          blanket and scarf for just about everyone in her family. Above all,
          Carol dedicated her life to loving and caring for her children and
          husband, who adored her in return, and she loved nothing more than
          spending every second she could with her beloved granddaughter.
        </p>
        <p>
          Carol is survived by her loving husband of nearly 32 years, Chad;
          daughter, Brianna (Matthew Schiessl); son, Morgan (Michael Miller);
          mother, Louise Weiher; sister Diane (Leif) Hallen; granddaughter,
          Lydia; nieces and nephew, Mariah, Sarah, Jenna, and Nicholas; and many
          other loving cousins and relatives. She was preceded in death by her
          father, Richard Weiher.
        </p>
        <p>
          A visitation open to the public will be 2-6 PM Friday June 20 and 11
          AM - 3 PM Saturday June 21 at the O’Connell Family Funeral Home in
          Hudson, WI. In lieu of flowers, donations may be made to the family
          which will be used to establish a memorial fund by Carol’s family,
          which will be for the purpose of giving back to the Hudson Area
          community in her memory.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <Button asChild>
            <a
              href="https://www.hudsonstarobserver.com/obituaries/carol-ann-trainor/article_170650eb-7da0-5e91-8921-bc94149ea1cb.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star-Observer Obituary
            </a>
          </Button>
          <Button>Memorial Fund</Button>
        </div>
      </article>
    </section>
  )
}
