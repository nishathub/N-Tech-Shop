import BrandCard from "../BrandShowCase/BrandCard";
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BrandCarouselStyle.css';

const BrandCarousel = () => {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        fetch('/brandList.json')
            .then(res => res.json())
            .then(data => setBrand(data))
            .catch(error => console.error(error.message));
    }, []);

    const settings = {
        dots: true,
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
                    dots: true
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };

    return (
        <div className="max-w-6xl mx-auto px-1 md:px-0">
            <Slider {...settings}>
                {brand.map(brandItem => (
                    <BrandCard key={brandItem.name} brand={brandItem} />
                ))}
            </Slider>
        </div>
    );
};

export default BrandCarousel;