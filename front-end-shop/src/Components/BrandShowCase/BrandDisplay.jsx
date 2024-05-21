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
        <div className=" py-4">
            <h2 className="text-center text-xl my-4">Available Brands</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 items-center place-items-center gap-8 p-4">
                {brand.map(brand => <BrandCard key={brand.name} brand={brand}></BrandCard>)}
            </div>
        </div>
    );
};

export default BrandDisplay;