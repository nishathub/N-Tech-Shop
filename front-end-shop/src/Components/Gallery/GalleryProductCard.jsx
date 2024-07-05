
import './GalleryProductCardStyle.css'

const GalleryProductCard = ({ product }) => {
    const totalStars = 5;
    return (
        <div className="p-2 rounded-sm bg-[#D9D9D9] hover:bg-white gallery-product-card">

            <div className='product-image'>
                {product.rating == 5 && (
                    <div className="product-badge">
                        <span className="product-badge-star">&#9733;</span>
                        <span className="product-badge-text">Top Rated</span>
                    </div>
                )}
                {product.rating == 3 && (
                    <div className="product-badge">
                        <span className="product-badge-star">$</span>
                        <span className="product-badge-text">20% OFF</span>
                    </div>
                )}
                <img
                    className="h-60 w-full max-w-full object-cover object-center"
                    src={product.image}
                    alt="gallery-photo"
                />
            </div>
            <div className="flex justify-between py-4">
                <div className="space-y-1">
                    <h2 className="text-lg text-gray-900 uppercase font-bold">{product.name}</h2>
                    <h4 className="text-lg text-gray-700 font-bold">$ {product.price}</h4>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-700 font-bold">{product.type}</p>
                    {/* <p className="text-yellow-900">{product.rating} &#9733;</p> */}
                    <div className="rating rating-xs">
                        {[...Array(totalStars)].map((_, index) => {
                            const isFilled = index < product.rating;
                            const starClass = isFilled ? 'mask mask-star-2 bg-orange-900' : 'mask mask-star-2 bg-orange-400';
                            return <input key={index} type="radio" name={`rating-${product.id}`} className={starClass} defaultChecked={isFilled} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryProductCard;