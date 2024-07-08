import BrandCard from "../BrandShowCase/BrandCard";
import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BrandCarouselStyle.css';
import { BrandShopContext } from "../../AuthProvider/AuthProvider";

const BrandCarousel = () => {
    const {productBrands} = useContext(BrandShopContext);

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
                    dots: false
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-1 md:px-0">
            <Slider {...settings}>
                {productBrands.map(brandItem => (
                    <BrandCard key={brandItem.name} brand={brandItem} />
                ))}
            </Slider>
        </div>
    );
};

export default BrandCarousel;