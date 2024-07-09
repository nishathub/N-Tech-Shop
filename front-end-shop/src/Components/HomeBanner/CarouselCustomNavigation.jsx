import { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function CarouselCustomNavigation({ oddIndexProducts }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % oddIndexProducts.length);
        }, 4500);

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [oddIndexProducts.length]);

    return (
        <div className="">
            <Carousel
            prevArrow={false} // hiding arrows
            nextArrow={false}
            interval='1000'
                className="h-40 md:h-[500px]"
                navigation={({ setActiveIndex: setActiveIndexInternal, activeIndex: activeIndexInternal, length }) => {
                    // Sync internal state with our custom state
                    if (activeIndexInternal !== activeIndex) {
                        setActiveIndexInternal(activeIndex);
                    }
                    return (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                        }`}
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>
                    );
                }}
            >
                {oddIndexProducts.map((product, index) => (
                    <div
                        className="h-[500px] relative"
                        key={index}
                    >
                        <img
                            src={product.image}
                            alt={`image ${index + 1}`}
                            className="h-full mx-auto"
                        />
                        <div className="absolute hidden md:block top-1/2 left-0 -translate-y-1/2 bg-black/60 w-full md:pl-40 py-6">
                            <p className="text-xl text-gray-200">Super Value Deals</p>
                            <p className="text-3xl md:text-5xl text-gray-200 first-letter:text-[#0bb7e6]">{product.name}</p>
                            <button onClick={()=> navigate(`/products/brand/${product.brand}/${product._id}`)} className="bg-gray-200 text-gray-800 font-bold p-2 rounded-md hover:bg-base-100 hover:text-gray-200 duration-300 w-40 mt-8">Shop Now</button>
                            </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
