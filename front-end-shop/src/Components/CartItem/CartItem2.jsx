import { useState } from "react";
import { MdDelete } from "react-icons/md";

const CartItem2 = ({
  item,
  handleDeleteCartItem,
  updateCartItemQuantities,
}) => {
  const { name, brand, color, price, image, rating, type, _id } = item;

  const [itemQuantity, setItemQuantity] = useState(1);
  const oneProductAmount = itemQuantity * price;

  const handleInputChange = (e) => {
    e.preventDefault();
    const productQuantity = e.target.value;
    setItemQuantity(productQuantity);
    updateCartItemQuantities(_id, productQuantity);
  };
  const handleQuantityIncrease = () => {
    setItemQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateCartItemQuantities(_id, newQuantity);
      return newQuantity;
    });
  };
  const handleQuantityDecrease = () => {
    setItemQuantity((prevQuantity) => {
      if (prevQuantity === 1) {
        console.log("Quantity can not be 0");
        return prevQuantity;
      } else {
        const newQuantity = prevQuantity - 1;
        updateCartItemQuantities(_id, newQuantity);
        return newQuantity;
      }
    });
  };
  return (
    <div className="text-gray-900">
      <div className="flex md:gap-4 items-center bg-[#EBEFF2] max-h-56 px-2 ">
        <div className="flex items-center">
          <button
            onClick={() => handleDeleteCartItem(_id)}
            className="text-xl md:text-2xl hover:text-red-900 duration-300"
          >
            <MdDelete />
          </button>
        </div>
        <div className="w-full p-1 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-16 h-16 md:w-32 md:h-32 hidden sm:block">
              <img
                className="h-full w-full object-contain"
                src={image}
                alt="product-image"
              />
            </div>
            <div className="my-auto">
              <h2 className="text-sm md:text-lg w-32 md:w-fit md:font-bold md:mb-2">
                {name}
              </h2>
              <div className="hidden md:block">
                <p>{color}</p>
                <p>${price}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
            <div className="flex gap-2 md:gap-0">
              <button
                onClick={handleQuantityDecrease}
                className="rounded-sm text-white bg-red-900 hover:bg-red-500 w-6 md:w-12 md:text-2xl"
              >
                -
              </button>
              <input
                onChange={handleInputChange}
                className="md:w-16 w-6 text-center"
                type="text"
                disabled
                name="quantity"
                min={1}
                value={itemQuantity}
              />
              <button
                onClick={handleQuantityIncrease}
                className="rounded-sm bg-green-900 hover:bg-green-600 text-white  w-6 md:w-12 md:text-2xl"
              >
                +
              </button>
            </div>
            <div className="bg-[#e0e0e0] p-1 rounded-md w-24 text-center">
              <p className="md:text-xl">
                $ <span>{oneProductAmount}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem2;
