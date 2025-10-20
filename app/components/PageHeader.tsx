import { flowerBorder } from '~/assets'

export default function PageHeader({
  ...props
}: React.ComponentPropsWithoutRef<'header'>) {
  return (
    <header
      className="lg:h-[28rem] h-48 relative border-b-[1rem] border-maroon"
      {...props}
    >
      <img
        src={flowerBorder}
        alt=""
        className="w-full h-full object-cover object-bottom shadow-lg opacity-30"
      />
      <div className="w-full h-full absolute top-0 right-0 bg-gradient-to-b from-lilac to-transparent to-80%" />
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <h1 className="font-ephesis text-5xl px-4 text-center md:text-9xl font-extrabold text-sandy-brown text-shadow-md text-shadow-black">
          {props.children}
        </h1>
      </div>
    </header>
  )
}
