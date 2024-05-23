import { useLoaderData, useParams } from "react-router-dom";


const ProductDetails = () => {
    const {brandName, productId} = useParams();
    const oneProduct = useLoaderData();
    console.log(oneProduct);
    const {name, brand, color, price, image, rating, type, country, year, warranty, box} = oneProduct;
    return (
        <div className="h-screen">
            <h2>{name} </h2>
        </div>
    );
};

export default ProductDetails;