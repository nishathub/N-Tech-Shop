import { useContext, useState } from "react";
import { Navigate, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import '../SweetAlertStyle.css';



const ProductDetails = () => {
    const [isPhysicalSpecOpen, setPhysicalSpecOpen] = useState(false);
    const [isDisplayOpen, setDisplayOpen] = useState(false);
    const oneProduct = useLoaderData();
    const { name, brand, color, price, image, rating, type, country, year, warranty, box, _id } = oneProduct;
    const { setAddCartClick, user, loading } = useContext(BrandShopContext);
    const discountedPrice = (price * 0.8).toFixed(2);
    const totalStars = 5;
    const location = useLocation();
    const attemptURL = location.pathname;
    const navigate = useNavigate();
    const specificationStyle = {
        maxHeight: isPhysicalSpecOpen ? '100vh' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.7s ease-in-out',
    };
    const displayStyle = {
        maxHeight: isDisplayOpen ? '100vh' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.7s ease-in-out',
    };

    const handleAddToCart = () => {
        if (!loading && !user) {
            Swal.fire({
                title: "Log in to add product",
                timer: 2000,
                showConfirmButton: false,
                customClass: {
                    container: 'swal-custom-container',
                    title: 'swal-custom-title',
                    content: 'swal-custom-content',
                }
            });
           return navigate('/login', { state: attemptURL});
        }

        const userMail = user.email;
        fetch('https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/cartItems', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ productId: _id, name: name, email: userMail })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Item Added to the Cart",
                        timer: 2000,
                        showConfirmButton: false,
                        customClass: {
                            container: 'swal-custom-container',
                            title: 'swal-custom-title',
                            content: 'swal-custom-content',
                        }
                    });
                    setAddCartClick(true);
                }
            })
            .catch(error => {
                console.error(error)
            })

    }

    return (
        <div className="py-12 bg-[#BABCBF]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start max-w-7xl mx-auto px-4">
                {/* IMAGE  */}
                <div className="rounded-sm flex justify-center">
                    <div><img className="h-auto sm:h-96 w-fit" src={image} alt="product-image" /></div>
                </div>
                {/* DESCRIPTION  */}
                <div>
                    <div className="rounded-md text-gray-800 p-4 bg-[#D7D8D9] space-y-4">
                        <div className=" flex flex-col-reverse md:flex-row justify-between md:items-center">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold mb-2">{name}</h2>
                                <h4>{country} | {color} | {year}</h4>
                                <div className="rating rating-xs">
                                    {[...Array(totalStars)].map((_, index) => {
                                        const isFilled = index < rating;
                                        const starClass = isFilled ? 'mask mask-star-2 bg-orange-900' : 'mask mask-star-2 bg-orange-400';
                                        return <input key={index} type="radio" name={`rating-${_id}`} className={starClass} defaultChecked={isFilled} />;
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0 mb-4 md:mb-0">
                                <p> {rating < 4 && 'Discount Price:'}</p>
                                <p className="text-2xl md:text-3xl">${rating < 4 ? discountedPrice : price}</p>
                                <p className="line-through text-red-500">{rating < 4 && '$' + price}</p>

                            </div>
                        </div>
                        <div>
                            <p>The {name} can be a lucrative deal at this price currently in the tech market. With a gorgeous {color} look and high performance, it should be worthy to be a choice.</p>
                        </div>
                        <div>
                            <p className="bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] w-fit p-2 rounded-md">10 Days Replacement & 2 Years Service Warranty</p>
                        </div>
                        <div>
                            <p className="bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] w-fit p-2 rounded-md">Status : <span className="text-green-700 font-bold">Stock available</span></p>
                        </div>

                    </div>
                    <div className="w-full mt-2">
                        <button onClick={handleAddToCart} className="w-full hover:bg-[#e2e2e2] hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 duration-300">Add to Cart</button>
                    </div>
                    <div className="mt-6 rounded-md text-gray-800 p-4 bg-[#D7D8D9] space-y-4">
                        <h2 className="text-2xl md:text-3xl mb-2">Specification</h2>
                        <div>
                            <div onClick={() => setPhysicalSpecOpen(!isPhysicalSpecOpen)} className="flex justify-between items-center bg-gray-200 p-2 rounded-md hover:cursor-pointer">
                                <h4>Physical Specification</h4>
                                <span> {isPhysicalSpecOpen ? '\u2B9D' : '\u2B9F'}</span>
                            </div>
                            <div style={specificationStyle}>
                                <div className="space-y-2 p-4">
                                    <p>Build</p>
                                    <p>Weight</p>
                                    <p>Dimension</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => setDisplayOpen(!isDisplayOpen)} className="flex justify-between bg-gray-200 p-2 rounded-md hover:cursor-pointer">
                                <h4>Display</h4>
                                <span> {isDisplayOpen ? '\u2B9D' : '\u2B9F'}</span>
                            </div>
                            <div style={displayStyle}>
                                <div className="space-y-2 p-4">
                                    <p>Size</p>
                                    <p>Type</p>
                                    <p>Resolution</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;