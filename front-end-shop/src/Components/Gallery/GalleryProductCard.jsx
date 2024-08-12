
import { Link } from 'react-router-dom';
import './GalleryProductCardStyle.css'
import { useContext, useState } from 'react';
import { BrandShopContext } from '../../AuthProvider/AuthProvider';

const GalleryProductCard = ({ product }) => {
    const {isAdmin} = useContext(BrandShopContext);
    const totalStars = 5;
    const saleStyle = { textDecoration: product.rating < 4 ? 'line-through' : 'none', color: product.rating < 4 ? 'red' : '' };
    const priceStyle = { display: product.rating < 4 ? 'flex' : 'none' };
    const discountedPrice = (product.price * 0.8).toFixed(2);

    return (
        <div className="p-2 rounded-sm bg-[#D7D8D9] hover:bg-gray-100 duration-300 gallery-product-card max-w-96 xl:min-w-96">
            {/* DYNAMIC BADGE ACCORDING TO RATING  */}
            <div className='product-image'>
                {product.rating == 5 && (
                    <div className="product-badge">
                        <span className="product-badge-star">&#9733;</span>
                        <span className="product-badge-text">Top Rated</span>
                    </div>
                )}
                {product.rating < 4 && (
                    <div className="product-badge">
                        <span className="product-badge-star">$</span>
                        <span className="product-badge-text">20% OFF</span>
                    </div>
                )}
                <img
                    className="h-80 w-full max-w-full object-cover object-center"
                    src={product.image}
                    alt="product-photo"
                />
            </div>
            <div className="flex justify-between py-4 items-center bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] px-2">
                <div className="space-y-1">
                    <h2 className="text-sm text-gray-900 ">{product.brand}</h2>
                    <h2 className="text-lg text-gray-900 font-bold">{product.name}</h2>
                    <div className='flex gap-4'>
                        <h4 style={saleStyle} className="text-lg text-gray-700 font-bold">$ {product.price}</h4>
                        <h4 style={priceStyle} className="text-lg text-gray-700 font-bold">$ {discountedPrice}</h4>
                    </div>
                </div>
                <div className="space-y-2 flex flex-col">
                    <p className="text-gray-700 font-bold">{product.type}</p>
                    {/* RATING  */}
                    <div className="rating rating-xs">
                        {[...Array(totalStars)].map((_, index) => {
                            const isFilled = index < product.rating;
                            const starClass = isFilled ? 'mask mask-star-2 bg-orange-900' : 'mask mask-star-2 bg-orange-400';
                            return <input key={index} type="radio" name={`rating-${product.id}`} className={starClass} defaultChecked={isFilled} />;
                        })}
                    </div>
                </div>
            </div>
            {/* CARD WILL HAVE BUTTONS ON BRAND PAGE, BUT NOT IN THE HOMEPAGE  */}
            {location.pathname === '/' ?
                ''
                :
                <div>
                    {isAdmin ?
                        <div className=" ">

                            <Link to={`/products/brand/${product.brand}/${product._id}`}><button className="w-1/2 bg-gray-700 p-2 hover:bg-gray-200 text-gray-200 hover:text-gray-800 duration-300">Details</button></Link>
                            <Link to={`/products/brand/${product.brand}/update/${product._id}`}><button className="w-1/2 bg-gray-800 p-2 hover:bg-gray-200 text-gray-200 hover:text-gray-800 duration-300">Update</button></Link>
                            
                        </div>
                        :
                        <div className=" ">
                            <Link to={`/products/brand/${product.brand}/${product._id}`}><button className="w-full bg-gray-800 p-2 hover:bg-gray-200 text-gray-200 hover:text-gray-800 duration-300 rounded-sm">Details</button></Link>
                        </div>
                    }
                </div>

            }
        </div>
    );
};

export default GalleryProductCard;