import React, { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";

export function CarouselCustomNavigation({ allProducts }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % allProducts.length);
        }, 2000); // 2000ms = 2s

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [allProducts.length]);

    return (
        <Carousel
            className="rounded-xl h-96"
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
                                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                    activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                );
            }}
        >
            {allProducts.map((product, index) => (
                <img
                    key={index}
                    src={product.image}
                    alt={`image ${index + 1}`}
                    className="h-full w-full object-cover"
                />
            ))}
        </Carousel>
    );
}
