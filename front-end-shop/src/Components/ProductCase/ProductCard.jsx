import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {

    const { name, brand, details, price, image, rating, type, _id } = product;
    

    return (
        <div>
            <div className="flex gap-4 items-center rounded-md bg-base-100 p-4 shadow-xl max-w- max-h-56">
                <img className="w-32" src={image} alt="product-image" />
                <div className="w-full p-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold mb-4">{name}</h2>
                        <p>Device : {type}</p>
                        <p>Brand : {brand}</p>
                        <p>Rating : {rating}/5</p>
                        <p>Price : ${price}</p>
                        <p>Color : {details}</p>

                    </div>
                    <div className="flex flex-col gap-4">
                        <Link to={`/products/brand/${brand}/${_id}`}><button className="btn btn-primary">Details</button></Link>
                        <button className="btn btn-accent">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;