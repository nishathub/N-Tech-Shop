import { useLoaderData } from "react-router-dom";
import BrandDisplay from "../../Components/BrandShowCase/BrandDisplay";
import { CarouselCustomNavigation } from "../../Components/HomeBanner/CarouselCustomNavigation";



const Home = () => {
    const allProducts = useLoaderData();
    const firstFiveProducts = allProducts.slice(0,5);
    return (
        <div>
            <div>
                <CarouselCustomNavigation allProducts={firstFiveProducts}></CarouselCustomNavigation>
            </div>
            <div>
                <BrandDisplay></BrandDisplay>
            </div>
        </div>
    );
};

export default Home;