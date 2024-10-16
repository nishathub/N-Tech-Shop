import BrandCard from "../BrandShowCase/BrandCard";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BrandCarouselStyle.css";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";

const BrandCarousel = () => {
  const { productBrands } = useContext(BrandShopContext);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // or 5
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
        breakpoint: 520,
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
    <div className="max-w-7xl mx-auto px-4 xl:px-0">
      <div className="flex justify-between items-center mb-8 group">
        <h2 className="text-xl md:text-2xl lg:text-3xl py-2 text-gray-900 font-bold ml-4">
          Available Brands
        </h2>
        <div className="border border-black hidden md:block md:w-1/3 lg:w-1/2 xl:w-2/3"></div>
      </div>
      <Slider {...settings}>
        {productBrands.map((brandItem) => (
          <BrandCard key={brandItem.name} brand={brandItem} />
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;
