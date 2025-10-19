import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="bg-slate-500 flex flex-col justify-center items-center text-base text-orange-50 py-12 px-6">
      <div className="w-full max-w-6xl flex flex-col items-center md:items-start">
        <h2 className="font-bold text-3xl pb-6 hover:underline underline-offset-3 text-center md:text-left">
          <Link to="/">Carol Ann Trainor</Link>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-32 text-center md:text-left">
          {/* About */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">ABOUT</h3>
            <Link
              to="/about"
              className="text-sm hover:underline underline-offset-3"
            >
              Carol's Life
            </Link>
            <Link
              to="/memorial"
              className="text-sm hover:underline underline-offset-3"
            >
              Memorial Fund
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">LINKS</h3>
            <h4 className="text-lg font-semibold">Articles</h4>
            <a
              className="text-sm hover:underline underline-offset-3"
              href="https://www.hudsonstarobserver.com/obituaries/carol-ann-trainor/article_170650eb-7da0-5e91-8921-bc94149ea1cb.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star-Observer: Obituary
            </a>
            <a
              className="text-sm hover:underline underline-offset-3"
              href="https://www.hudsonstarobserver.com/obituaries/remembering-carol-trainor-a-community-involved-restaurateur-whose-community-returned-the-favor/article_e13d2854-6b76-4ddb-882c-6eafb8001394.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star-Observer: Remembering Carol
            </a>
            <h4 className="text-lg font-semibold">Websites</h4>
            <a
              className="text-sm hover:underline underline-offset-3"
              href="https://urbanoliveandvine.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Urban Olive and Vine
            </a>
          </div>

          {/* Donate */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">DONATE</h3>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Paypal
            </Link>
            <Link to="/" className="text-sm hover:underline underline-offset-3">
              Other payments
            </Link>
          </div>

          {/* Gallery */}
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="font-bold text-xl hover:underline underline-offset-3"
            >
              GALLERY
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <Link
              to="/#contact"
              className="font-bold text-xl hover:underline underline-offset-3"
            >
              CONTACT
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
