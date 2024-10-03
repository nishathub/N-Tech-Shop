import { useContext, useEffect, useState } from "react";
import { GiMoneyStack, GiReturnArrow, GiCheckedShield } from "react-icons/gi";
import { TbBrandAuth0 } from "react-icons/tb";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CartItem2 from "../Components/CartItem/CartItem2";
import { Link } from "react-router-dom";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";

const Cart = () => {
  const {
    showCartItems,
    setShowCartItems,
    cartDisplayLoading,
    cartItemQuantities,
    setCartItemQuantities,
    cartsubTotal,
    setcartSubTotal,
    tax,
    setTax,
    discount,
    setDiscount,
    cartItemsTotalPrice,
    setCartItemTotalPrice,
    isOrderPlaced,
    customAlert,
  } = useContext(BrandShopContext);
  const [isLoading, setLoading] = useState(false);

  const deliveryCharge = 70;

  const handleDeleteCartItem = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://back-end-shop-1fmy48h1a-nishats-projects-890e0902.vercel.app/cartItems/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        customAlert(response.statusText || "Error");
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Item deleted successfully:", result);
      customAlert("Deleted");
      const updatedCartItems = showCartItems.filter((item) => item._id !== id);
      setShowCartItems(updatedCartItems);
    } catch (error) {
      console.error("Failed to delete the item:", error);
      customAlert("Error");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantities = (id, quantity) => {
    setCartItemQuantities((previousQuantities) => {
      const newQuantities = { ...previousQuantities }; // create new by copying old state
      newQuantities[id] = quantity; // update new quantity to the targeted id
      return newQuantities; // this function return an object {id: quantity}
    });
  };

  const calculatecartSubTotal = () => {
    let cartsubTotal = 0;
    for (let i = 0; i < showCartItems.length; i++) {
      const item = showCartItems[i]; // get the current product
      const quantity = cartItemQuantities[item._id] || 1; // get quantity by searching by id
      const price = item.price;
      const amount = quantity * price;
      cartsubTotal += amount;
    }
    return cartsubTotal;
  };
  const calculateDiscount = (e) => {
    e.preventDefault();

    const form = e.target;
    const couponCode = form.coupon.value;
    if (couponCode === "NTECH10") {
      customAlert("10% discounted");
      return setDiscount((0.1 * cartsubTotal).toFixed(2));
    }
    // If coupon not matched

    customAlert("No coupon found");
    return setDiscount(0);
  };

  useEffect(() => {
    const cartsubTotal = calculatecartSubTotal();
    setcartSubTotal(cartsubTotal);
    if (cartsubTotal < 5000) {
      setTax(0);
    } else {
      const tax = cartsubTotal * 0.05;
      const formattedTax = tax.toFixed(2);
      setTax(formattedTax);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cartItemQuantities,
    showCartItems,
    setTax,
    setcartSubTotal,
    isOrderPlaced,
  ]); // whenever these changes, update the cartsubtotal

  const totalAmount =
    cartsubTotal + parseFloat(tax) + deliveryCharge - discount;

  useEffect(() => {
    setCartItemTotalPrice(totalAmount.toFixed(2));
  }, [totalAmount, setCartItemTotalPrice]);

  return (
    <div className="bg-[#D7D8D9] md:py-20 p-4 text-gray-900 relative">
      {isLoading && (
        <div className="absolute bg-white/40 inset-0 flex items-center justify-center">
          {" "}
          <CustomLoading size={32}></CustomLoading>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-1">
        {cartDisplayLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {" "}
            <CustomLoading size={32}></CustomLoading>
          </div>
        ) : (
          <div>
            {showCartItems.length < 1 ? (
              <div className="md:h-96">
                <h2 className="py-12 text-center md:text-4xl text-red-700 ">
                  Your Cart is Empty
                </h2>
              </div>
            ) : (
              // Main Design Starts Here

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="flex flex-col gap-4 lg:col-span-2">
                  <div className="flex flex-col gap-4">
                    {showCartItems.map((item) => (
                      // <CartItemCard key={item._id} item={item} handleDeleteCartItem={handleDeleteCartItem} />
                      <CartItem2
                        key={item._id}
                        item={item}
                        handleDeleteCartItem={handleDeleteCartItem}
                        updateCartItemQuantities={updateCartItemQuantities}
                      />
                    ))}
                  </div>
                  <div>
                    <form
                      onSubmit={calculateDiscount}
                      className="flex flex-col gap-2 md:flex-row md:gap-6"
                    >
                      <input
                        className="input"
                        type="text"
                        name="coupon"
                        placeholder="Coupon Code"
                      />
                      <input
                        className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-1/2 md:w-1/3"
                        type="submit"
                        value="Apply Coupon"
                      />
                    </form>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="">
                    <div className="w md:text-lg bg-[#BABCBF] p-4">
                      <div className="flex justify-between">
                        <p>cartSubtotal</p>
                        <p>$ {cartsubTotal}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Tax (5% above $5000)</p>
                        <p>$ {tax}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Delivery Charge</p>
                        <p>$ {deliveryCharge}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Discount</p>
                        <p>$ {discount}</p>
                      </div>
                      <div className="w-full border my-4 border-gray-900"></div>
                      <div className="flex justify-between">
                        <p className="font-bold">Grand Total</p>
                        <p className="font-bold">$ {cartItemsTotalPrice}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-[#BABCBF]">
                    <div className="">
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          {" "}
                          <div className="text-2xl">
                            <GiMoneyStack />
                          </div>
                          <p>Cash on Delivery Available</p>
                        </li>
                        <li className="flex items-center gap-2">
                          {" "}
                          <div className="text-2xl">
                            <GiReturnArrow />
                          </div>
                          <p>7 Days replacement Policy</p>
                        </li>
                        <li className="flex items-center gap-2">
                          {" "}
                          <div className="text-2xl">
                            <TbBrandAuth0 />
                          </div>
                          <p>100% Money Back Guarantee</p>
                        </li>
                        <li className="flex items-center gap-2">
                          {" "}
                          <div className="text-2xl">
                            <GiCheckedShield />
                          </div>
                          <p>100% Original Product</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <Link to={"/checkout"}>
                      <button className="hover:bg-gray-200 hover:text-gray-800 font-bold p-3 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-full mt-4">
                        Check Out{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
