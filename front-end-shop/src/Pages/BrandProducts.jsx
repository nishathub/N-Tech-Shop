
import { useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCase/ProductCard";
import { CarouselTransition } from "../Components/ProductCase/CarouselTransition";


const BrandProducts = () => {
    const { brandName } = useParams();
    const oneBrandProducts = useLoaderData();
    console.log(oneBrandProducts);

    return (
        <div className="py-8">
            { // if No products available, show message
                oneBrandProducts.length < 1 ?
                    <h2 className="text-center text-2xl text-red-400 font-bold my-4">{brandName} Products Not Available <br /> Please Checkout Later</h2>
                    :
                    <div>
                        <div>
                           <h2 className="text-3xl text-center uppercase font-semibold text-accent tracking-wider">{brandName}</h2> 
                        </div>
                        <div className="my-8">
                            <CarouselTransition products ={oneBrandProducts}></CarouselTransition>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-4 justify-center">
                            {oneBrandProducts.map(product => <ProductCard key={product._id} product={product}></ProductCard>)}
                        </div>
                    </div>
            }


        </div>
    );
};

export default BrandProducts;