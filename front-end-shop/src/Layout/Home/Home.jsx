import { useLoaderData } from "react-router-dom";
import BrandDisplay from "../../Components/BrandShowCase/BrandDisplay";
import { CarouselCustomNavigation } from "../../Components/HomeBanner/CarouselCustomNavigation";
import { Gallery } from "../../Components/Gallery/Gallery";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import BrandCarousel from "../../Components/BrandCarousel/BrandCarousel";
import WebsiteFeatures from "../../Components/WebsiteFeatures/WebsiteFeatures";
import FlagshipCard from "../../Components/FlagshipCard/FlagshipCard";
import TopSellingCarousel from "../../Components/Gallery/TopSellingCarousel";
import CategoryContainer from "../../Components/ProductCategory/CategoryContainer";

const Home = () => {
  const allProducts = useLoaderData();
  const oddIndexProducts = allProducts.filter(
    (element, index) => index % 2 === 1,
  );
  const evenIndexProducts = allProducts.filter(
    (element, index) => index % 2 === 0,
  );
  const oddFiveProducts = oddIndexProducts.slice(0, 5);
  const evenNineProducts = evenIndexProducts.slice(0, 10);

  return (
    <div className="py-12">
      <div className="">
        <CarouselCustomNavigation
          oddIndexProducts={oddFiveProducts}
        ></CarouselCustomNavigation>
      </div>
      <div className="bg-[#BABCBF] pt-12 md:pt-24 md:pb-12">
        <CategoryContainer></CategoryContainer>
      </div>
      <div className="bg-[#BABCBF] py-12">
        <TopSellingCarousel
          evenIndexProducts={evenNineProducts}
        ></TopSellingCarousel>
      </div>
      <div className="bg-[#BABCBF] md:py-12">
        <FlagshipCard></FlagshipCard>
      </div>
      <div className="bg-[#BABCBF] py-12 ">
        <BrandCarousel></BrandCarousel>
      </div>
      <div className="bg-[#BABCBF] md:py-12 pb-12 lg:pb-0 ">
        <WebsiteFeatures></WebsiteFeatures>
      </div>
      <div className="relative lg:py-12 ">
        <div className="xl:absolute -bottom-24 left-1/2 xl:-translate-x-1/2 xl:w-[1280px] max-w-7xl mx-auto">
          <NewsLetter></NewsLetter>
        </div>
      </div>
    </div>
  );
};

export default Home;
