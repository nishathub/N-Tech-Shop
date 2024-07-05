import { useState } from "react";
import { useNavigate } from "react-router-dom";



const BrandCard = ({brand}) => {

    const navigate = useNavigate();

    const handleBrandClick = (brandName) => {
         navigate(`/products/brand/${brandName}`)

    }
    return (
        <div 
        onClick={() => handleBrandClick(brand.name)}
        className=" rounded-md hover:cursor-pointer max-w-sm border border-black">
            <img className="p-4 h-40" src={brand.brand_photo_link} alt="" />
            {/* <p className="btn hover:w-full">{brand.name} Products</p> */}
        </div>
    );
};

export default BrandCard;