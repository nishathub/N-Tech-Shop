import { useEffect, useState } from "react";
import BrandCard from "./BrandCard";


const BrandDisplay = () => {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        fetch('/brandList.json')
            .then(res => res.json())
            .then(data => setBrand(data))
            .catch(error => console.error(error.message))
    }, [])
    return (
        <div className=" max-w-6xl mx-auto md:px-4 px-1">
            <h2 className="text-lg md:text-3xl py-8 tracking-wider text-gray-900 font-semibold">Available Brands</h2>            <div className="grid sm:grid-cols-2 md:grid-cols-3 items-center place-items-center gap-8">
                {brand.map(brand => <BrandCard key={brand.name} brand={brand}></BrandCard>)}
            </div>
        </div>
    );
};

export default BrandDisplay;