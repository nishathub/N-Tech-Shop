import { useContext, useEffect, useState } from "react";
import { GiMoneyStack, GiReturnArrow, GiCheckedShield } from "react-icons/gi";
import { TbBrandAuth0 } from "react-icons/tb";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CartItem2 from "../Components/CartItem/CartItem2";
import { Link } from "react-router-dom";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";
import SingleCartItem from "../Components/CartItem/SingleCartItem";

const NewCartPage = () => {
  const {
    cartItems,
    cartDisplayLoading,
    cartSubTotal,
    setCartSubTotal,
    tax,
    setTax,
    discount,
    setDiscount,
    cartItemsTotalPrice,
    setCartItemTotalPrice,
    isOrderPlaced,
    customAlert,
    setCartItemsRefetch,
  } = useContext(BrandShopContext);
  const [isDeleteItemLoading, setDeleteItemLoading] = useState(false);
  const deliveryCharge = 70;
  console.log(cartDisplayLoading);

  const handleDeleteCartItem = async (id) => {
    console.log(id);

    setDeleteItemLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/cart/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        customAlert(response.statusText || "Error");
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      console.log("from cart delete function:", result);
      if (result.deletedCount > 0) {
        customAlert("Deleted");
        setTimeout(() => {
          setCartItemsRefetch(true);
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to delete the item:", error);
      customAlert("Error");
    } finally {
      setDeleteItemLoading(false);
    }
  };

  const calculatecartSubTotal = () => {
    let cartSubTotal = 0;
    if (cartItems.length) {
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const quantity = item.quantity;
        const price = item.price;
        const amount = quantity * price;
        cartSubTotal += amount;
      }
    }
    return cartSubTotal;
  };
  const calculateDiscount = (e) => {
    e.preventDefault();

    const form = e.target;
    const couponCode = form.coupon.value;

    if (couponCode === import.meta.env.VITE_COUPON_CODE) {
      customAlert("10% discounted");
      return setDiscount((0.1 * cartSubTotal).toFixed(2));
    }
    // If coupon not matched

    customAlert("No coupon found");
    return setDiscount(0);
  };

  useEffect(() => {
    const cartSubTotal = calculatecartSubTotal();
    setCartSubTotal(cartSubTotal);
    if (cartSubTotal < 5000) {
      setTax(0);
    } else {
      const tax = cartSubTotal * 0.05;
      const formattedTax = tax.toFixed(2);
      setTax(formattedTax);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, setTax, setCartSubTotal, isOrderPlaced]); // whenever these changes, update the cartSubtotal

  const totalAmount =
    cartSubTotal + parseFloat(tax) + deliveryCharge - discount;
  setCartItemTotalPrice(totalAmount.toFixed(2));

  return (
    <div className="bg-[#D7D8D9] md:py-20 p-4 text-gray-900 relative">
      {isDeleteItemLoading && (
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
            {cartItems.length < 1 ? (
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
                    {cartItems.map((item) => (
                      // <CartItemCard key={item._id} item={item} handleDeleteCartItem={handleDeleteCartItem} />
                      <SingleCartItem
                        key={item._id}
                        item={item}
                        handleDeleteCartItem={handleDeleteCartItem}
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
                        <p>$ {cartSubTotal}</p>
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

export default NewCartPage;
