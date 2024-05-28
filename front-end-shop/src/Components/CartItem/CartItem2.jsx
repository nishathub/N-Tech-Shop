import { useEffect, useState } from "react";

const CartItem2 = ({ item, handleDeleteCartItem, updateCartItemQuantities }) => {

    const { name, brand, color, price, image, rating, type, _id } = item;

    const [itemQuantity, setItemQuantity] = useState(1);
    const oneProductAmount = itemQuantity * price;




    const handleInputChange = (e) => {
        e.preventDefault();
        const productQuantity = e.target.value;
        setItemQuantity(productQuantity);
        updateCartItemQuantities(_id, productQuantity);
    }
    const handleQuantityIncrease = () => {
        setItemQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            updateCartItemQuantities(_id, newQuantity);
            return newQuantity;
        })
    }
    const handleQuantityDecrease = () => {
        setItemQuantity(prevQuantity => {
            if (prevQuantity === 1) {
                console.log('Quantity can not be 0');
                return prevQuantity;
            } else {
                const newQuantity = prevQuantity - 1;
                updateCartItemQuantities(_id, newQuantity);
                return newQuantity;
            }
        })
    }
    return (
        <div>
            <div className="flex md:gap-4 items-center rounded-md bg-base-100 md:p-4 shadow-xl max-h-56">
                <div className="flex items-center">
                    <button onClick={() => handleDeleteCartItem(_id)} className="md:btn btn-ghost md:text-2xl">&#10060;</button>
                </div>
                <div className="w-full p-1 md:p-4 flex justify-between items-center">

                    <div className="flex gap-4">
                        <img className="w-8 md:w-32" src={image} alt="product-image" />
                        <div>
                            <h2 className="text-sm md:text-lg w-40 md:w-fit md:font-bold md:mb-4">{name}</h2>
                            <div className="hidden md:block">
                                <p>Device : {type}</p>
                                <p>Brand : {brand}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
                        <div className="flex gap-2 md:gap-0">
                            <button onClick={handleQuantityDecrease} className="md:btn btn-error text-pink-200 bg-base-300 w-6 md:w-12 md:text-2xl">-</button>
                            <input onChange={handleInputChange} className="md:w-16 w-6 text-center" type="text" disabled name="quantity" min={1} value={itemQuantity} />
                            <button onClick={handleQuantityIncrease} className="md:btn btn-success text-green-200 bg-base-300 w-6 md:w-12 md:text-2xl">+</button>
                        </div>
                        <div className="bg-base-300 p-2 rounded-md w-24 text-center">
                            <p className="md:text-xl">$ <span>{oneProductAmount}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem2;