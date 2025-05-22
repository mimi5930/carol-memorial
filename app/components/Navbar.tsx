import { Link } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu'

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
    </nav>
  )
}
