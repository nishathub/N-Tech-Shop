import { useContext, useEffect, useState } from "react";
import { GiMoneyStack, GiReturnArrow, GiCheckedShield } from "react-icons/gi";
import { TbBrandAuth0 } from "react-icons/tb";

import Swal from "sweetalert2";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CartItem2 from "../Components/CartItem/CartItem2";
import '../SweetAlertStyle.css';


const Cart = () => {

    const { showCartItems, setShowCartItems, cartDisplayLoading} = useContext(BrandShopContext);
    const [cartItemQuantities, setCartItemQuantities] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(0);

    const handleDeleteCartItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                container: 'swal-custom-container',
                title: 'swal-custom-title',
                text: 'swal-custom-text',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://back-end-shop-i79v47290-nishats-projects-890e0902.vercel.app/cartItems/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            console.log(data);
                            Swal.fire({
                                title: "Deleted",
                                text: "You won't be able to revert this!",
                                showConfirmButton: false,
                                timer: 2000,
                                customClass: {
                                    container: 'swal-custom-container',
                                    title: 'swal-custom-title',
                                    content: 'swal-custom-content',
                                }
                            });
                            const updatedCartItems = showCartItems.filter(item => item._id !== id);
                            setShowCartItems(updatedCartItems);
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong",
                                timer: 2000,
                                showConfirmButton: false,
                                customClass: {
                                    container: 'swal-custom-container',
                                    title: 'swal-custom-title',
                                    content: 'swal-custom-content',
                                }
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong",
                            timer: 2000,
                            showConfirmButton: false,
                            customClass: {
                                container: 'swal-custom-container',
                                title: 'swal-custom-title',
                                content: 'swal-custom-content',
                            }
                        });
                        console.error('Error deleting cart item:', error);
                    });
            }
        });
    };

    const updateCartItemQuantities = (id, quantity) => {

        setCartItemQuantities(previousQuantities => {

            const newQuantities = { ...previousQuantities };  // create new by copying old state
            newQuantities[id] = quantity; // update new quantity to the targeted id
            return newQuantities; // this function return an object {id: quantity}
        })
    }

    const calculateSubTotal = () => {
        let subTotal = 0;
        for (let i = 0; i < showCartItems.length; i++) {
            const item = showCartItems[i]; // get the current product
            const quantity = cartItemQuantities[item._id] || 1; // get quantity by searching by id
            const price = item.price;
            const amount = quantity * price;
            subTotal += amount;
        }
        return subTotal;
    }
    const calculateDiscount = (e) => {
        e.preventDefault();

        const form = e.target;
        const couponCode = form.coupon.value;
        if (couponCode === 'NTECH10') {
            Swal.fire({
                title: "10% Discounted",
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    container: 'swal-custom-container',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                }
            });
            return setDiscount((0.1 * subTotal).toFixed(2))
        }
        // If coupon not matched

        Swal.fire({
            title: "No coupon found",
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                container: 'swal-custom-container',
                title: 'swal-custom-title',
                content: 'swal-custom-content',
            }
        });
        return setDiscount(0);
    }

    useEffect(() => {
        const subTotal = calculateSubTotal();
        setSubTotal(subTotal);
        if (subTotal < 5000) {
            setTax(0);
        } else {
            const tax = subTotal * 0.05;
            const formattedTax = tax.toFixed(2);
            setTax(formattedTax)
        }

    }, [cartItemQuantities, showCartItems]) // whenever these changes, update the subtotal



    const deliveryCharge = 70;
    const totalAmount = subTotal + parseFloat(tax) + deliveryCharge - discount;

    return (
        <div className="bg-[#D7D8D9] md:py-20 p-4 text-gray-900">
            <div className="max-w-7xl mx-auto px-1">

                {
                    cartDisplayLoading ? <h2>Loading</h2>
                        :

                        <div>
                            {showCartItems.length < 1 ?
                                <div className="md:h-96">

                                    <h2 className="py-12 text-center md:text-4xl text-red-700 ">
                                        Your Cart is Empty
                                    </h2>
                                </div>
                                :
                                // Main Design Starts Here

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                                    <div className="flex flex-col gap-4 lg:col-span-2">
                                        <div className="flex flex-col gap-4">

                                            {showCartItems.map(item => (
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
                                            <form onSubmit={calculateDiscount} className="flex flex-col gap-2 md:flex-row md:gap-6">
                                                <input className="input" type="text" name="coupon" placeholder="Coupon Code" />
                                                <input className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-1/2 md:w-1/3" type="submit" value="Apply Coupon" />
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="">
                                            <div className="w md:text-lg bg-[#BABCBF] p-4">
                                                <div className="flex justify-between">
                                                    <p>Subtotal</p>
                                                    <p>$ {subTotal}</p>
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
                                                <div className="w-full border my-4 border-gray-900">

                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="font-bold">Grand Total</p>
                                                    <p className="font-bold">$ {totalAmount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-[#BABCBF]">
                                            <div className="">
                                                <ul className="space-y-3">
                                                    <li className="flex items-center gap-2"> <div className="text-2xl"><GiMoneyStack /></div>
                                                        <p>Cash on Delivery Available</p>
                                                    </li>
                                                    <li className="flex items-center gap-2"> <div className="text-2xl"><GiReturnArrow /></div>
                                                        <p>7 Days replacement Policy</p>
                                                    </li>
                                                    <li className="flex items-center gap-2"> <div className="text-2xl"><TbBrandAuth0 /></div>
                                                        <p>100% Money Back Guarantee</p>
                                                    </li>
                                                    <li className="flex items-center gap-2"> <div className="text-2xl"><GiCheckedShield /></div>
                                                        <p>100% Original Product</p>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="hover:bg-gray-200 hover:text-gray-800 font-bold p-3 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-full mt-4">Check Out</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                }
            </div>

        </div>
    );
};

export default Cart;
