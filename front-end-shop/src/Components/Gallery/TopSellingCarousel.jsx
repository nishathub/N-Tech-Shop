import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GalleryProductCard from "./GalleryProductCard";
import { Link } from 'react-router-dom';

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
            <h2 className="text-lg md:text-3xl py-8 text-gray-900 font-bold ml-4">Top Selling Products</h2>
            <div className=''>
                <Slider {...settings}>
                    {evenIndexProducts.map((product, index) => (
                        <Link to={`/products/brand/${product.brand}/${product._id}`} key={index}>
                            <GalleryProductCard product={product}></GalleryProductCard>
                        </Link>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default TopSellingCarousel;