
import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCase/ProductCard";


const BrandProducts = () => {
    const {brandName} = useParams();
    const oneBrandProducts = useLoaderData();
    console.log(oneBrandProducts);

    return (
        <div>
            <h2>{brandName} Products Available</h2>

            <div className="grid sm:grid-cols-2 gap-4">
                {oneBrandProducts.map(product => <ProductCard key={product._id} product = {product}></ProductCard>)}
            </div>
        </div>
    );
};

export default BrandProducts;