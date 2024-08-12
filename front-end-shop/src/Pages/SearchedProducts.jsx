import { useContext } from "react";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { BrandShopContext } from "../AuthProvider/AuthProvider";

const SearchedProducts = () => {
    const {foundProducts} = useContext(BrandShopContext);
    return (
        <div className="py-12 max-w-7xl mx-auto px-1">
            <div>
                <h2 className="text-gray-900 text-xl text-center py-8">{foundProducts.length} items found</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                { foundProducts.map(product => <GalleryProductCard key={product._id} product={product}></GalleryProductCard>
                )
                    
                }
            </div>
        </div>
    );
};

export default SearchedProducts;