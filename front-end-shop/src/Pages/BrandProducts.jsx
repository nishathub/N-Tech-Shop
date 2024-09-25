import { useParams } from "react-router-dom";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { useContext, useEffect, useState } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";
const BrandProducts = () => {
  const { brandName } = useParams();
  const [brandProductsLoading, setBrandProductsLoading] = useState(true);
  const [brandErrorText, setBrandErrorText] = useState("");
  const [brandProducts, setBrandProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const { productBrands, customAlert } = useContext(BrandShopContext);
  const selectedBrand = productBrands.find((brand) => brand.name === brandName);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load Brand Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBrandProductsLoading(true);
        const response = await fetch(
          `https://back-end-shop-i79v47290-nishats-projects-890e0902.vercel.app/products/brand/${brandName}`
        );
        if (!response.ok) {
          console.error("Response Error");
          setBrandErrorText("Response Error, Try Again Later");
          customAlert("Response Error!");
        }
        const result = await response.json();
        setBrandProducts(result);
        setDisplayProducts(result);
      } catch (err) {
        console.error("error : ", err);
        customAlert("Error!");
        setBrandErrorText("Error Loading Data, Try Again");
      } finally {
        setBrandProductsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandName]);

  // To set available categories of a specific brand
  useEffect(() => {
    const categoryBrands = [
      ...new Set(brandProducts.map((product) => product.type)),
    ];
    setCategories(categoryBrands);
  }, [brandProducts]);

  const handleCategoryButtonClick = (categoryName) => {
    const clickedCategoryProducts = brandProducts.filter(
      (product) => product.type === categoryName
    );
    setDisplayProducts(clickedCategoryProducts);
    setSelectedCategory(categoryName);
  };

  // DYNAMIC RENDERING
  if (brandProductsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <CustomLoading size={32}></CustomLoading>
      </div>
    );
  }
  if (brandErrorText) {
    return (
      <div className="w-full mx-auto group mt-4">
        <div className="rounded-sm justify-center flex">
          <img
            className="h-20 group-hover:scale-110 duration-700"
            src={selectedBrand.brand_photo_link}
            alt="brand-logo"
          />
        </div>
        <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">
          {brandErrorText}
        </h2>
      </div>
    );
  }

  if (brandProducts.length < 1) {
    return (
      <div className="w-full mx-auto group mt-4">
        <div className="rounded-sm justify-center flex">
          <img
            className="h-20 group-hover:scale-110 duration-700"
            src={selectedBrand.brand_photo_link}
            alt="brand-logo"
          />
        </div>
        <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">
          {brandName} products are currently out of stock <br /> Please Checkout
          Later
        </h2>
      </div>
    );
  }

  return (
    <div className="md:pb-12 px-4 md:p-0 bg-[#BABCBF]">
      <div className="max-w-7xl mx-auto">
        <div className="mt-4">
          <div className="w-full mx-auto group">
            <div className="rounded-sm justify-center flex ">
              <img
                className="h-20 group-hover:scale-110 duration-700"
                src={selectedBrand.brand_photo_link}
                alt="brand-logo"
              />
            </div>
          </div>
        </div>
        <div className="h-16 flex gap-4 items-center justify-center px-6 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryButtonClick(category)}
              className={`font-bold p-2 rounded-md cursor-pointer duration-300 ${
                selectedCategory === category
                  ? "bg-gray-900 text-gray-200 "
                  : "bg-gray-200 text-gray-900 "
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {displayProducts.map((product) => (
            <GalleryProductCard
              key={product._id}
              product={product}
            ></GalleryProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandProducts;
