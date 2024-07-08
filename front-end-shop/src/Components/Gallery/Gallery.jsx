import { Link } from "react-router-dom";
import GalleryProductCard from "./GalleryProductCard";


export function Gallery({ evenIndexProducts }) {

    return (
        <div className="w-11/12 sm:w-full mx-auto max-w-7xl md:px-0 px-1">
            <h2 className="text-lg md:text-3xl py-8 tracking-wider text-gray-900 font-semibold">Top Selling Products</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {evenIndexProducts.map((product, index) => (
                    <Link to={`/products/brand/${product.brand}/${product._id}`} key={index}>
                        <GalleryProductCard product={product}></GalleryProductCard>
                    </Link>
                ))}
            </div>
        </div>
    );
}
