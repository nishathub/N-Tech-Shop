import { useContext, useEffect, useState } from "react";
import BrandCard from "./BrandCard";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";


const BrandDisplay = () => {
   const {productBrands} = useContext(BrandShopContext);
    return (
        <div className=" max-w-7xl mx-auto md:px-4 px-1">
            <h2 className="text-lg md:text-3xl py-8 tracking-wider text-gray-900 font-semibold">Available Brands</h2>            <div className="grid sm:grid-cols-2 md:grid-cols-3 items-center place-items-center gap-8">
                {productBrands.map(brand => <BrandCard key={productBrands.name} brand={productBrands}></BrandCard>)}
            </div>
        </div>
    );
};

export default BrandDisplay;