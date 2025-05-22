import { Link } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu'
import { Separator } from './ui/separator'

export default function Navbar() {
  return (
    <nav className="flex justify-between w-full px-5 py-2.5 z-30 bg-lilac">
      <Link to="/">
        <h1 className="font-ephesis text-6xl font-bold text-orange-200 text-shadow-md text-shadow-black">
          Carol Ann Trainor
        </h1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-accent/0 hover:bg-accent/25">
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-64">
                <NavigationMenuLink className="hover:bg-lilac/75">
                  <Link to="/about">Carol's Life</Link>
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
                <h2 className="text-sm p-2 pb-0 font-semibold">Articles</h2>
                <NavigationMenuLink className="hover:bg-lilac/75">
                  <a href="https://www.hudsonstarobserver.com/obituaries/carol-ann-trainor/article_170650eb-7da0-5e91-8921-bc94149ea1cb.html">
                    Star-Observer: Obituary
                  </a>
                </NavigationMenuLink>
                <NavigationMenuLink className="hover:bg-lilac/75">
                  <a href="https://www.hudsonstarobserver.com/obituaries/remembering-carol-trainor-a-community-involved-restaurateur-whose-community-returned-the-favor/article_e13d2854-6b76-4ddb-882c-6eafb8001394.html">
                    Star-Observer: Remembering Carol
                  </a>
                </NavigationMenuLink>
                <Separator />
                <NavigationMenuLink className="hover:bg-lilac/75">
                  <a href="https://urbanoliveandvine.com/">
                    Urban Olive and Vine
                  </a>
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
    </nav>
  )
}
