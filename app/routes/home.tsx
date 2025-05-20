import type { Route } from './+types/home'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '../components/ui/navigation-menu'
import { headerLilacImg } from '~/assets'

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
      <div className="flex justify-between w-full px-5 py-2.5 z-30 bg-lilac">
        <h1 className="font-ephesis text-6xl font-bold  text-shadow-sm">
          Carol Ann Trainor
        </h1>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-accent/0 hover:bg-accent/25">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-64">
                  <NavigationMenuLink className="hover:bg-lilac/75">
                    Carol's Life
                  </NavigationMenuLink>
                  <NavigationMenuLink className="hover:bg-lilac/75">
                    Memorial Fund
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-accent/0 hover:bg-accent/25">
                Links
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-64">
                  <NavigationMenuLink className="hover:bg-lilac/75">
                    Articles
                  </NavigationMenuLink>
                  <NavigationMenuLink className="hover:bg-lilac/75">
                    Urban Olive and Vine
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-accent/0 hover:bg-accent/25">
                Donate
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-64">
                  <NavigationMenuLink className="hover:bg-lilac/75">
                    PayPal
                  </NavigationMenuLink>
                  <NavigationMenuLink className="hover:bg-lilac/75">
                    Other payments
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="px-4 py-2 text-sm font-medium">
              Gallery
            </NavigationMenuItem>
            <NavigationMenuItem className="px-4 py-2 text-sm font-medium">
              CONTACT
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <header className="h-[56rem]">
        <img
          src={headerLilacImg}
          alt=""
          className="w-full h-full object-cover object-top border-b-8 border-amber-400"
        />
      </header>
    </>
  )
}
