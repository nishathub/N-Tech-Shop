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
    const handleQuantityIncrease = () =>{
        setItemQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            updateCartItemQuantities(_id, newQuantity);
            return newQuantity;
        })
    }
    const handleQuantityDecrease = () =>{
        setItemQuantity(prevQuantity => {
            if(prevQuantity ===1){
                console.log('Quantity can not be 0');
                return prevQuantity;
            } else{
                const newQuantity = prevQuantity - 1;
                updateCartItemQuantities(_id, newQuantity);
                return newQuantity;
            }
        })
    }
    return (
        <div>
            <div className="flex gap-4 items-center rounded-md bg-base-100 p-4 shadow-xl max-h-56">
                <div className="flex items-center gap-4">
                    <button onClick={() => handleDeleteCartItem(_id)} className="btn btn-ghost text-2xl">&#10060;</button>
                </div>
                <div className="w-full p-4 flex justify-between items-center">

                    <div className="flex gap-4">
                        <img className="w-32" src={image} alt="product-image" />
                        <div>
                            <h2 className="text-lg font-bold mb-4">{name}</h2>
                            <p>Device : {type}</p>
                            <p>Brand : {brand}</p>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center">
                        <div className="flex gap-1">
                            <button onClick={handleQuantityDecrease} className="btn btn-error text-2xl">-</button>
                            <input onChange={handleInputChange} className="input input-bordered w-16 text-center" type="number" name="quantity" min={1} value={itemQuantity}  />
                            <button onClick={handleQuantityIncrease} className="btn btn-success text-2xl">+</button>
                        </div>
                        <div className="bg-base-300 p-2 rounded-md w-24 text-center">
                            <p className="text-xl">$ <span>{oneProductAmount}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem2;