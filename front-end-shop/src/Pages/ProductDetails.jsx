import { Link, useLoaderData, useParams } from "react-router-dom";


const ProductDetails = () => {
    const { brandName, productId } = useParams();
    const oneProduct = useLoaderData();
    console.log(oneProduct);
    const { name, brand, color, price, image, rating, type, country, year, warranty, box, _id } = oneProduct;
    return (
        <div className="py-8">
            <div className="flex flex-col gap-4 items-center rounded-md bg-base-100 p-4 shadow-xl max-w-4xl mx-auto">
                <div className="my-4">
                    <h2 className="sm:text-3xl text-xl text-center uppercase font-semibold text-accent tracking-wider">{name}</h2>
                </div>
                <div className="my-4">
                    <div className="capitalize grid sm:grid-cols-2 sm:gap-8 text-lg">
                        <div>
                            <p>Device : {type}</p>
                            <p>Brand : {brand}</p>
                            <p>Rating : {rating}/5</p>
                            <p>Price : ${price}</p>
                        </div>
                        <div>
                            <p>Color : {color}</p>
                            <p>Country of Origin: {country}</p>
                            <p>Warranty period: {warranty}</p>
                            <p>Inside Box : {box}</p>
                        </div>
                    </div>
                </div>
                <div><img className="w-full" src={image} alt="product-image" /></div>
                <div className="w-full">
                    <Link to={`/products/brand/${brand}/${_id}`}><button className="btn btn-accent w-full text-lg">Add to Cart</button></Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;