import { Carousel } from "@material-tailwind/react";

export function CarouselTransition({ products }) {
  return (
    <Carousel transition={{ duration: 2 }} className="rounded-xl h-40 md:h-96">
      <img
        src={products[0]?.image}
        alt="image 1"
        className="w-full h-full object-cover "
      />
      <img
        src={products[1]?.image}
        alt="image 2"
        className="h-full w-full object-cover"
      />
      <img
        src={products[2]?.image}
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}
