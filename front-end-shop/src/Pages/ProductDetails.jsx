import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import '../SweetAlertStyle.css';


const ProductDetails = () => {
    const oneProduct = useLoaderData();
    const {setAddCartClick} = useContext(BrandShopContext);
    const { name, brand, color, price, image, rating, type, country, year, warranty, box, _id } = oneProduct;
    const handleAddToCart = () => {
        
        fetch('https://back-end-shop-4lq6iejmf-nishats-projects-890e0902.vercel.app/cartItems', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({productId : _id, name: name})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: "Item Added to the Cart",
                    timer: 2000,
                    customClass: {
                        container: 'swal-custom-container',
                        title: 'swal-custom-title',
                        content: 'swal-custom-content',
                    }
                }); 
                  setAddCartClick(true);
            }
        })
        .catch(error =>{
            console.error(error)
        })

    }
    return (
        <div className="py-8">
            <div className="flex flex-col gap-4 items-center rounded-md bg-base-100 p-4 shadow-xl max-w-4xl mx-auto">
                <div className="my-4">
                    <h2 className="sm:text-3xl text-xl text-center uppercase font-semibold text-accent tracking-wider">{name}</h2>
                </div>
                <div className="my-4">
                    <div className="capitalize grid sm:grid-cols-2 sm:gap-8 text-lg">
                        <div>
                            <p><span className="text-accent">Device</span> : {type}</p>
                            <p><span className="text-accent">Brand</span>  : {brand}</p>
                            <p><span className="text-accent">Rating</span> : {rating ? rating : "rating-point"} / 5 </p>
                            <p><span className="text-accent">Price</span> : ${price}</p>
                        </div>
                        <div>
                            <p><span className="text-accent">Color</span> : {color}</p>
                            <p><span className="text-accent">Country of Origin:</span> {country}</p>
                            <p><span className="text-accent">Warranty period:</span> {warranty} years</p>
                            <p><span className="text-accent">Inside Box :</span> {box}</p>
                        </div>
                    </div>
                </div>
                <div><img className="w-full" src={image} alt="product-image" /></div>
                <div className="w-full">
                    <button onClick={handleAddToCart} className="btn btn-accent w-full text-lg">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;