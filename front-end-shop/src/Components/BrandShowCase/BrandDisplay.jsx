import { useEffect, useState } from "react";
import BrandCard from "./BrandCard";


const BrandDisplay = () => {
    const [brand, setBrand] = useState([]);

    useEffect(() => {
        fetch('/brandList.json')
            .then(res => res.json())
            .then(data => setBrand(data))
    }, [])
    return (
        <div className=" py-8">
            <h2 className="text-center text-lg md:text-2xl my-4 tracking-wider text-accent font-semibold">Available Brands</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 items-center place-items-center gap-8">
                {brand.map(brand => <BrandCard key={brand.name} brand={brand}></BrandCard>)}
            </div>
        </div>
    );
};

export default BrandDisplay;