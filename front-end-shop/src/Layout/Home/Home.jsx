import { useLoaderData } from "react-router-dom";
import BrandDisplay from "../../Components/BrandShowCase/BrandDisplay";
import { CarouselCustomNavigation } from "../../Components/HomeBanner/CarouselCustomNavigation";
import { Gallery } from "../../Components/Gallery/Gallery";



const Home = () => {
    const allProducts = useLoaderData();
    const firstFiveProducts = allProducts.slice(0, 5);
    const galleryProducts = allProducts.slice(0, 9);

    return (
        <div className="space-y-8 py-4">
            <div>
                <CarouselCustomNavigation allProducts={firstFiveProducts}></CarouselCustomNavigation>
            </div>
            <div>
                <BrandDisplay></BrandDisplay>
            </div>
            <div>
                <Gallery galleryProducts={galleryProducts}></Gallery>
            </div>
        </div>
    );
};

export default Home;