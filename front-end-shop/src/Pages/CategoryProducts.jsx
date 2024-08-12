
import { useLoaderData, useParams } from "react-router-dom";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { useContext, useEffect, useState } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";


const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [brands, setBrands] = useState(['Apple', 'Sony', 'Samsung', 'Xiaomi', 'Intel', 'Google']);
    const oneCategoryProducts = useLoaderData();
    const [displayProducts, setDisplayProducts] = useState(oneCategoryProducts);
    const [brandName, setBrandName] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const { categories } = useContext(BrandShopContext);
    const selectedCategory = categories.find(category => category.categoryName === categoryName);
    const categoryBgStyle = { backgroundImage: `url(${selectedCategory.categoryPhotoLink})` };

    const bgStyle = { height: '80vh' };

    // To set available brands of a specific category
    useEffect(()=> {
        const categoryBrands = [...new Set(oneCategoryProducts.map(product => product.brand))];
        setBrands(categoryBrands);
        setBrandName((prevState) => (['all', ...prevState]))
        console.log(['all', ...categoryBrands]);
    },[categoryName, oneCategoryProducts])

    const handleBrandButtonClick = (brandName) => {
        const clickedBrandProducts = oneCategoryProducts.filter(product => product.brand === brandName);
        setDisplayProducts(clickedBrandProducts);
        setBrandName(brandName);
        setSelectedBrand(brandName);
    }

    return (
        <div style={!oneCategoryProducts.length ? bgStyle : {}} className="py-12 bg-[#BABCBF] px-4 xl:px-0">
            { // if No products available, show message
                oneCategoryProducts.length < 1 ?
                    <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">{categoryName} products are currently out of stock <br /> Please Checkout Later</h2>
                    :
                    <div className="max-w-7xl mx-auto px-1">
                        <div className="flex justify-center">
                            <div className="relative group">
                                <div style={categoryBgStyle} className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 bg-gray-200  p-4 bg-cover">
                                </div>
                                <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500">
                                    <h4 className="text-center font-bold text-white">{selectedCategory.categoryName}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="h-20 flex gap-4 items-center justify-center px-6 mt-4 mb-12">
                            {brands.map((brand) => (
                                <button
                                    key={brand}
                                    onClick={() => handleBrandButtonClick(brand)}
                                    className={`font-bold p-2 rounded-md cursor-pointer duration-300 ${selectedBrand === brand
                                            ? 'bg-gray-900 text-gray-200 hover:bg-gray-900 hover:text-gray-200'
                                            : 'bg-gray-200 text-gray-900 '
                                        }`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                        <div>
                            {!displayProducts.length ?
                                <h2 className="text-center md:text-2xl text-red-600 font-bold h-40">{brandName} products are currently out of stock <br /> Please Checkout Later</h2>
                                :
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                                    {displayProducts.map(product => <GalleryProductCard key={product._id} product={product}></GalleryProductCard>)}
                                </div>
                            }
                        </div>
                    </div>
            }


        </div>
    );
};

export default CategoryProducts;