import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CartItemCard from "../Components/CartItem/CartItemCard";
import Swal from "sweetalert2";

const Cart = () => {
    const cartItems = useLoaderData();
    const [showCartItems, setShowCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {

                const cartItemsIds = cartItems.map(item => item.productId); // collection of cart item ids
                const displayItems = data.filter(product => cartItemsIds.includes(product._id)); // match id and get items
                setShowCartItems(displayItems);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, [cartItems]);

    const handleDeleteCartItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/cartItems/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data) {
                            console.log(data);
                            Swal.fire("Deleted!", "Your item has been deleted.", "success");
                            const updatedCartItems = showCartItems.filter(item => item._id !== id);
                            setShowCartItems(updatedCartItems);
                        } else {
                            Swal.fire("Error!", "Something went wrong!", "error");
                        }
                    })
                    .catch(error => {
                        Swal.fire("Error!", "Something went wrong!", "error");
                        console.error('Error deleting cart item:', error);
                    });
            }
        });
    };

    return (
        <div className="my-8 flex flex-col gap-4">
            {showCartItems.map(item => (
                <CartItemCard key={item._id} item={item} handleDeleteCartItem={handleDeleteCartItem} />
            ))}
        </div>
    );
};

export default Cart;
