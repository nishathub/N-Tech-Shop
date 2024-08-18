import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, brand, details, price, image, rating, type, _id, color } =
    product;

  return (
    <div>
      <div className="flex gap-4 items-center rounded-md bg-base-100 p-1 md:p-4 shadow-xl md:max-h-56">
        <img className="w-20 sm:w-20 md:w-32" src={image} alt="product-image" />
        <div className="w-full md:p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold mb-4 w-40 sm:w-60 ">{name}</h2>
            <p>Device : {type}</p>
            <p>Brand : {brand}</p>
            <p>Rating : {rating}/5</p>
            <p>Price : ${price}</p>
            <p>Color : {color}</p>
          </div>
          <div className="flex flex-col gap-4 pl-4 md:pl-0">
            <Link to={`/products/brand/${brand}/${_id}`}>
              <button className="btn btn-primary p-1 md:p-4">Details</button>
            </Link>
            <Link to={`/products/brand/${brand}/update/${_id}`}>
              <button className="btn btn-accent p-1 md:p-4">Update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
