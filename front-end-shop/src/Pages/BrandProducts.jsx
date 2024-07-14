
import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCase/ProductCard";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { useContext } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import BrandCard from "../Components/BrandShowCase/BrandCard";


const BrandProducts = () => {
    const { brandName } = useParams();
    const oneBrandProducts = useLoaderData();
    const { productBrands } = useContext(BrandShopContext);
    const selectedBrand = productBrands.find(brand => brand.name === brandName);
    const bgStyle = { height: '80vh' };
    return (
        <div style={!oneBrandProducts.length ? bgStyle : {}} className="md:py-12 p-4 md:p-0 bg-[#BABCBF]">
            { // if No products available, show message
                oneBrandProducts.length < 1 ?
                    <div>
                        <div className="w-full mx-auto group">
                            <div
                                className="rounded-sm justify-center flex">
                                <img className="h-20 group-hover:scale-110 duration-700" src={selectedBrand.brand_photo_link} alt="brand-logo" />
                            </div>
                        </div>
                        <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">{brandName} products are currently out of stock <br /> Please Checkout Later</h2>
                    </div>
                    :
                    <div className="max-w-7xl mx-auto">
                        <div className="md:mb-12">
                            <div className="w-full mx-auto group">
                                <div
                                    className="rounded-sm justify-center flex ">
                                    <img className="h-20 group-hover:scale-110 duration-700" src={selectedBrand.brand_photo_link} alt="brand-logo" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                            {oneBrandProducts.map(product => <GalleryProductCard key={product._id} product={product}></GalleryProductCard>)}
                        </div>
                    </div>
            }


        </div>
    );
};

export default BrandProducts;