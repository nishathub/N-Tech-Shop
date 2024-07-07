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
        className="round-sm hover:cursor-pointer max-w-sm border border-gray-400 mx-2 bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] hover:bg-[#D9D9D9] justify-center flex ">
            <img className="p-4 h-40 hover:scale-105 duration-700" src={brand.brand_photo_link} alt="" />
            {/* <p className="btn hover:w-full">{brand.name} Products</p> */}
        </div>
    );
};

export default BrandCard;