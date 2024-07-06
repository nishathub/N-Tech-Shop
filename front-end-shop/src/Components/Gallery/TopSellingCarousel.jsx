import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TopSellingCarouselStyle.css';
import GalleryProductCard from "./GalleryProductCard";

const TopSellingCarousel = ({ evenIndexProducts }) => {

    const settings = {
        dots: true,
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
            <h2 className="text-lg md:text-3xl py-8 tracking-wider text-gray-900 font-semibold">Top Selling Products</h2>
            <Slider {...settings}>
                {evenIndexProducts.map(product => (
                    <GalleryProductCard key={product.name} product={product} />
                ))}
            </Slider>
        </div>
    );
};

export default TopSellingCarousel;