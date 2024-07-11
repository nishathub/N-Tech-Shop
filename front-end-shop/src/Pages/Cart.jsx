import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CartItem2 from "../Components/CartItem/CartItem2";
import '../SweetAlertStyle.css';

const Cart = () => {

    const { showCartItems, setShowCartItems, cartDisplayLoading } = useContext(BrandShopContext);
    const [cartItemQuantities, setCartItemQuantities] = useState({});
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);

    console.log(cartDisplayLoading);

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
                fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/cartItems/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            console.log(data);
                            Swal.fire({
                                title: "Deleted",
                                text: "You won't be able to revert this!",
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

    console.log(cartItemQuantities);

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
    const totalAmount = subTotal + parseFloat(tax) + deliveryCharge;

    return (
        <div className="bg-gray-200 py-20 text-gray-900">
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
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                                    <div className="flex flex-col gap-4 lg:col-span-2">

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
                                    <div className="col-span-1">
                                        <div className="">
                                            <div className="w md:text-lg bg-[#D9D9D9] p-4">
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
                                                <div className="w-full border my-4 border-gray-900">

                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="font-bold">Grand Total</p>
                                                    <p className="font-bold">$ {totalAmount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 bg-[#D9D9D9]">
                                            <div className="">
                                                <ul className="space-y-2">
                                                    <li>&#10003; Cash on Delivery Available</li>
                                                    <li>&#10003; 7 Days replacement Policy</li>
                                                    <li>&#10003; 100% Money Back Guarantee</li>
                                                    <li>&#10003; 100% Original Product</li>
                                                </ul>
                                            </div>
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
