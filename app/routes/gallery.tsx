import { carolHeadshot } from '~/assets'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '~/components/ui/carousel'

export default function CarouselDemo() {
  return (
    <section className="flex flex-col items-center py-12">
      <h1 className="font-ephesis text-7xl font-extrabold py-12">
        Remember Carol With Us
      </h1>
      <div className="bg-maroon p-16 rounded-md shadow-lg">
        <div className="w-7xl flex justify-center items-center ">
          <Carousel className="w-full max-w-2xl">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-3/4">
                  <div className="p-1 bg-amber-50">
                    <img src={carolHeadshot} alt="" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <p className="text-center pt-12 text-slate-50 underline">
          View more pictures
        </p>
      </div>
    </section>
  )
}
