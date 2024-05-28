import { useState } from "react";
import { useNavigate } from "react-router-dom";



const BrandCard = ({brand}) => {

    const navigate = useNavigate();

    const handleBrandClick = (brandName) => {
         navigate(`/products/brand/${brandName}`)

    }
    return (
        <div className=" rounded-md bg-blue-gray-900 hover:shadow-blue-700 shadow-md duration-300 max-w-sm">
            <img className="p-4 h-40 sm:h-full" src={brand.brand_photo_link} alt="" />
            <button onClick={() => handleBrandClick(brand.name)} className="btn w-full text-lg ">{brand.name}</button>
        </div>
    );
};

export default BrandCard;