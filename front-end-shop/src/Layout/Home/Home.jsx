import { useLoaderData } from "react-router-dom";
import BrandDisplay from "../../Components/BrandShowCase/BrandDisplay";
import { CarouselCustomNavigation } from "../../Components/HomeBanner/CarouselCustomNavigation";
import { Gallery } from "../../Components/Gallery/Gallery";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";

const Home = () => {
    const allProducts = useLoaderData();
    const oddIndexProducts = allProducts.filter((element, index) => index % 2 === 1);
    const evenIndexProducts = allProducts.filter((element, index) => index % 2 === 0);
    

    return (
        <div className="md:space-y-8 py-4">
            <div>
                <CarouselCustomNavigation oddIndexProducts={oddIndexProducts}></CarouselCustomNavigation>
            </div>
            <div>
                <BrandDisplay></BrandDisplay>
            </div>
            <div>
                <Gallery evenIndexProducts={evenIndexProducts}></Gallery>
            </div>
            <div>
                <NewsLetter></NewsLetter>
            </div>
        </div>
    );
};

export default Home;