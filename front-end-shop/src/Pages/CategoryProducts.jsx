
import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCase/ProductCard";
import { CarouselTransition } from "../Components/ProductCase/CarouselTransition";


const CategoryProducts = () => {
    const { categoryName } = useParams();
    const oneCategoryProducts = useLoaderData();
    const bgStyle = {height: '80vh'};
    return (
        <div style={!oneCategoryProducts.length ? bgStyle : {}} className="py-8">
            { // if No products available, show message
                oneCategoryProducts.length < 1 ?
                    <h2 className="text-center md:text-2xl text-red-400 font-bold mt-12">{categoryName} products are currently out of stock <br /> Please Checkout Later</h2>
                    :
                    <div>
                        <div>
                           <h2 className="sm:text-3xl text-xl text-center uppercase font-semibold text-[#3BBFE3] tracking-wider">{categoryName}</h2> 
                        </div>
                        <div className="my-8">
                            <CarouselTransition products ={oneCategoryProducts}></CarouselTransition>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4 justify-center">
                            {oneCategoryProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)}
                        </div>
                    </div>
            }


        </div>
    );
};

export default CategoryProducts;