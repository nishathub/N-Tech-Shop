import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GalleryProductCard from "./GalleryProductCard";
import { Link } from "react-router-dom";

const TopSellingCarousel = ({ evenIndexProducts }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // or 5
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0 ">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl py-2 text-gray-900 font-bold ml-4">
          Top Selling Products
        </h2>
        <div className="border border-black hidden md:block md:w-1/3 lg:w-1/2 xl:w-2/3"></div>
      </div>
      <div className="">
        <Slider {...settings}>
          {evenIndexProducts.map((product, index) => (
            <Link
              to={`/products/brand/${product.brand}/${product._id}`}
              key={index}
            >
              <GalleryProductCard product={product}></GalleryProductCard>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopSellingCarousel;
