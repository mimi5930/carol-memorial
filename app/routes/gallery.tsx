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
              {/* TODO: Populate with a gallery of photos. Google api? */}
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index} className="basis-3/4 self-center">
                  <div className="p-1 bg-amber-50">
                    <img
                      src={`https://placehold.co/${Math.floor(
                        Math.random() * (1200 - 600 + 1) + 600
                      )}x${Math.floor(
                        Math.random() * (800 - 400 + 1) + 400
                      )}/png`}
                      alt=""
                    />
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
