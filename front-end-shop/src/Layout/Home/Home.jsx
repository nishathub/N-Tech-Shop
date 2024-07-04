import { useLoaderData } from "react-router-dom";
import BrandDisplay from "../../Components/BrandShowCase/BrandDisplay";
import { CarouselCustomNavigation } from "../../Components/HomeBanner/CarouselCustomNavigation";
import { Gallery } from "../../Components/Gallery/Gallery";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";

const Home = () => {
    const allProducts = useLoaderData();
    const oddIndexProducts = allProducts.filter((element, index) => index % 2 === 1);
    const evenIndexProducts = allProducts.filter((element, index) => index % 2 === 0);
    const oddFiveProducts = oddIndexProducts.slice(4,8);
    

    return (
        <div className="">
            <div>
                <CarouselCustomNavigation oddIndexProducts={oddFiveProducts}></CarouselCustomNavigation>
            </div>
            <div className="bg-gray-200 py-12">
                <Gallery evenIndexProducts={evenIndexProducts}></Gallery>
            </div>
            <div className="bg-gray-400 py-12">
                <BrandDisplay></BrandDisplay>
            </div>
            <div className="bg-teal-900">
                <NewsLetter></NewsLetter>
            </div>
        </div>
    );
};

export default Home;