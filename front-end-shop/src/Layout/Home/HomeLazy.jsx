import { useLoaderData, useNavigation } from "react-router-dom";
import { lazy, Suspense } from "react";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import WebsiteFeatures from "../../Components/WebsiteFeatures/WebsiteFeatures";
import FlagshipCard from "../../Components/FlagshipCard/FlagshipCard";
import CategoryContainer from "../../Components/ProductCategory/CategoryContainer";
import CustomLoading from "../../Components/Shared/CustomLoading/CustomLoading";

// Lazy load the components
const CarouselCustomNavigation = lazy(() =>
  import("../../Components/HomeBanner/CarouselCustomNavigation")
);
const TopSellingCarousel = lazy(() =>
  import("../../Components/Gallery/TopSellingCarousel")
);
const BrandCarousel = lazy(() =>
  import("../../Components/BrandCarousel/BrandCarousel")
);

const HomeLazy = () => {
  const allProducts = useLoaderData();
  const navigation = useNavigation();
  
  // Ensure that allProducts is defined
  if (!allProducts) {
    return <CustomLoading size={32} />;
  }
  const oddIndexProducts = allProducts.filter(
    (element, index) => index % 2 === 1
  );
  const evenIndexProducts = allProducts.filter(
    (element, index) => index % 2 === 0
  );
  const oddFiveProducts = oddIndexProducts.slice(0, 5);
  const evenNineProducts = evenIndexProducts.slice(0, 10);

  // Show a loading spinner while the page is loading
  if (navigation.state === "loading") {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white/50">
        <CustomLoading size={32}></CustomLoading>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="">
        <Suspense fallback={<CustomLoading size={32} />}>
          <CarouselCustomNavigation oddIndexProducts={oddFiveProducts} />
        </Suspense>
      </div>
      <div className="bg-[#BABCBF] pt-12 md:pt-24 md:pb-12">
        <CategoryContainer></CategoryContainer>
      </div>
      <div className="bg-[#BABCBF] py-12">
        <Suspense fallback={<CustomLoading size={32} />}>
          <TopSellingCarousel evenIndexProducts={evenNineProducts} />
        </Suspense>
      </div>
      <div className="bg-[#BABCBF] md:py-12">
        <FlagshipCard></FlagshipCard>
      </div>
      <div className="bg-[#BABCBF] py-12 ">
        <Suspense fallback={<CustomLoading size={32} />}>
          <BrandCarousel />
        </Suspense>
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

export default HomeLazy;
