import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="h-[25rem] bg-slate-500 flex flex-col justify-center items-center text-base text-orange-50">
      <div>
        <h2 className="font-bold text-3xl pb-6">
          <Link to="/">Carol Ann Trainor</Link>
        </h2>
        <div className="flex gap-32">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">ABOUT</h3>
            <Link to="/about" className="hover:underline underline-offset-3">
              Carol's Life
            </Link>
            {/* TODO: Add link */}
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Memorial Fund
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">LINKS</h3>
            <h4 className="text-lg font-semibold">Articles</h4>
            <a
              className="text-sm hover:underline underline-offset-3"
              href="https://www.hudsonstarobserver.com/obituaries/carol-ann-trainor/article_170650eb-7da0-5e91-8921-bc94149ea1cb.html"
            >
              Star-Observer: Obituary
            </a>
            <a
              className="text-sm hover:underline underline-offset-3"
              href="https://www.hudsonstarobserver.com/obituaries/remembering-carol-trainor-a-community-involved-restaurateur-whose-community-returned-the-favor/article_e13d2854-6b76-4ddb-882c-6eafb8001394.html"
            >
              Star-Observer: Remembering Carol
            </a>
            <h4 className="text-lg font-semibold">Websites</h4>
            <a
              className="text-sm hover:underline underline-offset-3"
              href="https://urbanoliveandvine.com/"
            >
              Urban Olive and Vine
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">DONATE</h3>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Paypal
            </Link>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Other payments
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {/* TODO: ADD destination for link */}
            <Link
              to="/"
              className="font-bold text-xl hover:underline underline-offset-3"
            >
              GALLERY
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {/* TODO: ADD destination for link */}
            <Link
              to="/"
              className="font-bold text-xl hover:underline underline-offset-3"
            >
              CONTACT
            </Link>
          </div>
        </div>
        {/* <div className="flex gap-32">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">ABOUT</h3>
            <Link
              to="/about"
              className="text-base hover:underline underline-offset-3"
            >
              Carol's Life
            </Link>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Memorial Fund
            </Link>
            <h3 className="font-bold text-xl">LINKS</h3>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Articles
            </Link>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Urban Olive and Vine
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold">DONATE</h3>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Paypal
            </Link>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Other payments
            </Link>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              GALLERY
            </Link>
            <h3 className="font-bold">Contact</h3>
          </div>
        </div> */}
      </div>
    </footer>
  )
}
