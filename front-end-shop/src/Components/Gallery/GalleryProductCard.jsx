

const GalleryProductCard = ({product}) => {
    return (
        <div className="p-2 rounded-sm bg-gray-900 ">
            <div>
                <img
                    className="h-60 w-full max-w-full object-cover object-center"
                    src={product.image}
                    alt="gallery-photo"
                />
            </div>
            <div className="flex justify-between py-4">
                <div className="space-y-2">
                    <h2 className="text-lg text-[#3BBFE3] uppercase font-bold">{product.name}</h2>
                    <h4 className="text-lg text-gray-200 font-bold">$ {product.price}</h4>
                </div>
                <div className="space-y-2">
                    <p>{product.type}</p>
                    <p className="text-yellow-500">{product.rating} &#9733;</p>
                </div>
            </div>
        </div>
    );
};

export default GalleryProductCard;