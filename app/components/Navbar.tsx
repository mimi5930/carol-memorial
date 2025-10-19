import { Link, useLocation, useNavigate } from 'react-router'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Hamburger } from '~/components/svg'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)

  return (
    <nav className="flex justify-between items-center w-full px-5 py-2.5 z-30 bg-lilac">
      <Link to="/">
        <h1 className="font-ephesis text-4xl md:text-6xl font-bold text-sandy-brown text-shadow-md text-shadow-black">
          Carol Ann Trainor
        </h1>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-accent/0 hover:bg-accent/25">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-64">
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <Link to="/about">Carol's Life</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <Link to="/memorial">Memorial Fund</Link>
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
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <a
                      href="https://www.hudsonstarobserver.com/obituaries/carol-ann-trainor/article_170650eb-7da0-5e91-8921-bc94149ea1cb.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Star-Observer: Obituary
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <a
                      href="https://www.hudsonstarobserver.com/obituaries/remembering-carol-trainor-a-community-involved-restaurateur-whose-community-returned-the-favor/article_e13d2854-6b76-4ddb-882c-6eafb8001394.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Star-Observer: Remembering Carol
                    </a>
                  </NavigationMenuLink>
                  <Separator />
                  <h2 className="text-sm p-2 pb-0 font-semibold">
                    Urban Olive and Vine
                  </h2>
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <a
                      href="https://urbanoliveandvine.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <a
                      href="https://www.instagram.com/urbanoliveandvine/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </NavigationMenuLink>
                  <a
                    href="https://www.facebook.com/urbanoliveandvine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <NavigationMenuLink className="hover:bg-lilac/75">
                      Facebook
                    </NavigationMenuLink>
                  </a>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-accent/0 hover:bg-accent/25">
                Donate
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-64">
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <a
                      href="https://www.paypal.com/paypalme/JChadTrainor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Paypal
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="hover:bg-lilac/75">
                    <Link to="/donate">Other payments</Link>
                  </NavigationMenuLink>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem
              asChild
              className="px-4 py-2 text-sm font-medium"
            >
              <Link to="/gallery">Gallery</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className="px-4 py-2 text-sm font-medium"
            >
              <Link to="/#contact">CONTACT</Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="p-2">
              <Hamburger className="w-6 h-6 text-sandy-brown" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-lilac px-6 py-6"
            onCloseAutoFocus={event => event.preventDefault()}
          >
            <div className="h-full overflow-y-auto pr-2">
              <div className="flex flex-col gap-4 text-base font-medium text-slate-600">
                {/* About */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-maroon">
                    About
                  </h2>
                  <Link
                    to="/about"
                    className="hover:text-black transition-colors py-1.5"
                    onClick={() => setSheetOpen(false)}
                  >
                    Carol's Life
                  </Link>
                  <Link
                    to="/memorial"
                    className="hover:text-black transition-colors py-1.5"
                    onClick={() => setSheetOpen(false)}
                  >
                    Memorial Fund
                  </Link>
                </div>

                <Separator />

                {/* Explore */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-maroon">
                    Explore
                  </h2>
                  <Link
                    to="/gallery"
                    className="hover:text-black transition-colors py-1.5"
                    onClick={() => setSheetOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link to="/#contact" onClick={() => setSheetOpen(false)}>
                    Contact
                  </Link>
                </div>

                <Separator />

                {/* Donate */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-maroon">
                    Donate
                  </h2>
                  <a
                    href="https://www.paypal.com/paypalme/JChadTrainor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors py-1.5"
                  >
                    Paypal
                  </a>
                  <Link
                    to="/donate"
                    className="hover:text-black transition-colors py-1.5"
                    onClick={() => setSheetOpen(false)}
                  >
                    Other Payments
                  </Link>
                </div>

                <Separator />

                {/* Links */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-maroon">
                    Links:
                  </h2>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-maroon">
                    Articles
                  </h2>
                  <a
                    href="https://www.hudsonstarobserver.com/obituaries/carol-ann-trainor/article_170650eb-7da0-5e91-8921-bc94149ea1cb.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors py-1.5"
                  >
                    Star-Observer: Obituary
                  </a>
                  <a
                    href="https://www.hudsonstarobserver.com/obituaries/remembering-carol-trainor-a-community-involved-restaurateur-whose-community-returned-the-favor/article_e13d2854-6b76-4ddb-882c-6eafb8001394.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors py-1.5"
                  >
                    Star-Observer: Remembering Carol
                  </a>

                  <h2 className="text-sm font-semibold uppercase tracking-wide text-maroon">
                    Urban Olive and Vine
                  </h2>
                  <a
                    href="https://urbanoliveandvine.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors py-1.5"
                  >
                    Website
                  </a>
                  <a
                    href="https://www.instagram.com/urbanoliveandvine/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors py-1.5"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/urbanoliveandvine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors py-1.5"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
