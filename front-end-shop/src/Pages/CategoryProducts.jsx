
import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCase/ProductCard";
import { CarouselTransition } from "../Components/ProductCase/CarouselTransition";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { useContext, useEffect, useState } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";


const CategoryProducts = () => {
    const { categoryName } = useParams();
    const oneCategoryProducts = useLoaderData();
    const {categories} = useContext(BrandShopContext);
    const selectedCategory = categories.find(category => category.categoryName === categoryName);
    const categoryBgStyle = {backgroundImage : `url(${selectedCategory.categoryPhotoLink})`};

    const bgStyle = { height: '80vh' };
    return (
        <div style={!oneCategoryProducts.length ? bgStyle : {}} className="py-12 bg-[#BABCBF] px-4 xl:px-0">
            { // if No products available, show message
                oneCategoryProducts.length < 1 ?
                    <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">{categoryName} products are currently out of stock <br /> Please Checkout Later</h2>
                    :
                    <div className="max-w-7xl mx-auto px-1">
                        <div className="flex justify-center mb-12">
                            <div className="relative group">
                                <div style={categoryBgStyle} className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 bg-gray-200  p-4 bg-cover">
                                </div>
                                <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                                    <h4 className="text-center font-bold text-white">{selectedCategory.categoryName}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                            {oneCategoryProducts.map(product => <GalleryProductCard key={product._id} product={product}></GalleryProductCard>)}
                        </div>
                    </div>
            }


        </div>
    );
};

export default CategoryProducts;