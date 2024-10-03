import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";
import CustomLoading from "../Shared/CustomLoading/CustomLoading";

const SingleCartItem = ({ item, handleDeleteCartItem }) => {
  const [isCartQuantityUpdateLoading, setCartQuantityUpdateLoading] =
    useState(false);
  const { customAlert, setCartItemsRefetch } = useContext(BrandShopContext);
  const { name, color, price, image, _id, quantity } = item;
  const oneProductAmount = quantity * price;

  // Quantity Decrease function
  const handleDecreaseCartItemQuantity = async (e) => {
    e.preventDefault();
    if (quantity == 1) {
      customAlert("Min Quantity 1");
      return;
    }
    const newQuantity = quantity - 1;
    const updatedCartItem = {
      quantity: newQuantity,
    };

    setCartQuantityUpdateLoading(true);
    try {
      const response = await fetch(
        `https://back-end-shop-1fmy48h1a-nishats-projects-890e0902.vercel.app/cartItems/${_id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedCartItem),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.modifiedCount > 0) {
        customAlert("Cart quantity decreased");
      }
    } catch (error) {
      console.error(error);
      customAlert("Error");
    } finally {
      setCartQuantityUpdateLoading(false);
      setCartItemsRefetch(true);
    }
  };
  // Quantity Increase function
  const handleIncreaseCartItemQuantity = async (e) => {
    e.preventDefault();
    if (quantity == 5) {
      customAlert("Maximum Quantity 5");
      return;
    }
    const newQuantity = quantity + 1;
    const updatedCartItem = {
      quantity: newQuantity,
    };

    setCartQuantityUpdateLoading(true);
    try {
      const response = await fetch(
        `https://back-end-shop-1fmy48h1a-nishats-projects-890e0902.vercel.app/cartItems/${_id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedCartItem),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.modifiedCount > 0) {
        customAlert("Cart quantity Increased");
      }
    } catch (error) {
      console.error(error);
      customAlert("Error");
    } finally {
      setCartQuantityUpdateLoading(false);
      setCartItemsRefetch(true);
    }
  };

  return (
    <div className="text-gray-900">
      <div>
        {isCartQuantityUpdateLoading && (
          <div className="fixed inset-0 flex justify-center items-center">
            <CustomLoading size={32}></CustomLoading>
          </div>
        )}
      </div>
      <div className="flex md:gap-4 items-center bg-[#BABCBF] max-h-56 px-2 ">
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
                onClick={handleDecreaseCartItemQuantity}
                className="rounded-sm text-white bg-red-900 hover:bg-red-500 w-6 md:w-12 md:text-2xl"
              >
                -
              </button>
              <input
                className="md:w-16 w-6 text-center"
                type="text"
                disabled
                name="quantity"
                min={1}
                value={quantity}
              />
              <button
                onClick={handleIncreaseCartItemQuantity}
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

export default SingleCartItem;
