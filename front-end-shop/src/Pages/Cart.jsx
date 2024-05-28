import { useContext, useEffect, useState } from "react";
import CartItemCard from "../Components/CartItem/CartItemCard";
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
    // WE HAVE TRANSFERRED THESE CODES TO AUTHPROVIDER, TO USE INFO ON OTHER COMPONENTS


    // const cartItems = useLoaderData();
    // const [showCartItems, setShowCartItems] = useState([]);

    // useEffect(() => {
    //     fetch('https://back-end-shop-4lq6iejmf-nishats-projects-890e0902.vercel.app/products')
    //         .then(res => res.json())
    //         .then(data => {

    //             const cartItemsIds = cartItems.map(item => item.productId); // collection of cart item ids
    //             const displayItems = data.filter(product => cartItemsIds.includes(product._id)); // match id and get items
    //             setShowCartItems(displayItems);
    //         })
    //         .catch(error => console.error('Error fetching products:', error));
    // }, [cartItems]);

    const handleDeleteCartItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                container: 'swal-custom-container',
                title: 'swal-custom-title',
                icon: 'swal-custom-icon',
                text: 'swal-custom-text',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://back-end-shop-4lq6iejmf-nishats-projects-890e0902.vercel.app/cartItems/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            console.log(data);
                            Swal.fire({
                                title: "Deleted",
                                text: "You won't be able to revert this!",
                                icon: "success",
                                timer: 2000,
                                customClass: {
                                    container: 'swal-custom-container',
                                    title: 'swal-custom-title',
                                    icon: 'swal-custom-icon',
                                    content: 'swal-custom-content',
                                }
                            });
                            const updatedCartItems = showCartItems.filter(item => item._id !== id);
                            setShowCartItems(updatedCartItems);
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong",
                                icon: "error",
                                timer: 2000,
                                customClass: {
                                    container: 'swal-custom-container',
                                    title: 'swal-custom-title',
                                    icon: 'swal-custom-icon',
                                    content: 'swal-custom-content',
                                }
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong",
                            icon: "error",
                            timer: 2000,
                            customClass: {
                                container: 'swal-custom-container',
                                title: 'swal-custom-title',
                                icon: 'swal-custom-icon',
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
            setTax(subTotal * 0.05)
        }

    }, [cartItemQuantities, showCartItems]) // whenever these changes, update the subtotal



    const deliveryCharge = 70;
    const totalAmount = subTotal + tax + deliveryCharge;

    return (
        <div>
            {
                cartDisplayLoading ? <h2>Loading</h2>
                    :

                    <div>
                        {showCartItems.length < 1 ?
                            <div className="md:h-96">

                                <h2 className="my-12 text-center md:text-4xl text-red-200 ">
                                    Your Cart is Empty
                                </h2>
                            </div>
                            :
                            <div>
                                <div className="my-8 flex flex-col gap-4">

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
                                    <div className=" md:text-lg gap-4 items-center rounded-md bg-teal-900 p-4 shadow-xl max-h-56 px-8">
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
                                        <div className="w-full border my-4 border-accent">

                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-green-100">Grand Total</p>
                                            <p className="text-green-100">$ {totalAmount}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-8">
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
                        }
                    </div>
            }

        </div>
    );
};

export default Cart;
