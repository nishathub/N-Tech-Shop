
const CartItemCard = ({item, handleDeleteCartItem}) => {

    const { name, brand, color, price, image, rating, type, _id } = item;
    return (
        <div>
            <div className="flex gap-4 items-center rounded-md bg-base-100 p-4 shadow-xl max-w- max-h-56">
                <img className="w-32" src={image} alt="product-image" />
                <div className="w-full p-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold mb-4">{name}</h2>
                        <p>Device : {type}</p>
                        <p>Brand : {brand}</p>
                        <p>Price : ${price}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="btn btn-success text-2xl">+</button>
                        <button onClick={() => handleDeleteCartItem(_id)} className="btn btn-error text-2xl">-</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;