import { useParams } from "react-router-dom";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { useContext, useEffect, useState } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [brands, setBrands] = useState([
    "Apple",
    "Sony",
    "Samsung",
    "Xiaomi",
    "Intel",
    "Google",
  ]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categoryErrorText, setCategoryErrorText] = useState("");
  const [categoryProductsLoading, setCategoryProductsLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState(categoryProducts);
  const [brandName, setBrandName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const { categories, customAlert, brandShopAPI } =
    useContext(BrandShopContext);
  const selectedCategory = categories.find(
    (category) => category.categoryName === categoryName
  );
  const categoryBgStyle = {
    backgroundImage: `url(${selectedCategory?.categoryPhotoLink})`,
  };

  // Load Category Products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategoryProductsLoading(true);
        const response = await fetch(
          `${brandShopAPI}/products/category/${categoryName}`
        );
        if (!response.ok) {
          console.error("Response Error");
          setCategoryErrorText("Response Error, Try Again Later");
          customAlert("Response Error!");
        }
        const result = await response.json();
        setCategoryProducts(result);
        setDisplayProducts(result);
      } catch (err) {
        console.error("error : ", err);
        customAlert("Error!");
        setCategoryErrorText("Error Loading Data, Try Again");
      } finally {
        setCategoryProductsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);
  // To set available brands of a specific category
  useEffect(() => {
    const categoryBrands = [
      ...new Set(categoryProducts.map((product) => product.brand)),
    ];
    setBrands(categoryBrands);
    setBrandName((prevState) => ["all", ...prevState]);
    console.log(["all", ...categoryBrands]);
  }, [categoryName, categoryProducts]);

  const handleBrandButtonClick = (brandName) => {
    const clickedBrandProducts = categoryProducts.filter(
      (product) => product.brand === brandName
    );
    setDisplayProducts(clickedBrandProducts);
    setBrandName(brandName);
    setSelectedBrand(brandName);
  };

  // DYNAMIC RENDERING
  if (categoryProductsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <CustomLoading size={32}></CustomLoading>
      </div>
    );
  }
  if (categoryErrorText) {
    return (
      <div className="w-full mx-auto group mt-4">
        <div className="flex justify-center">
          <div className="relative group">
            <div
              style={categoryBgStyle}
              className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 bg-gray-200  p-4 bg-cover"
            ></div>
            <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500">
              <h4 className="text-center font-bold text-white">
                {selectedCategory.categoryName}
              </h4>
            </div>
          </div>
        </div>
        <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">
          {categoryErrorText}
        </h2>
      </div>
    );
  }
  if (categoryProducts.length < 1) {
    return (
      <div className="w-full mx-auto group mt-4">
        <div className="flex justify-center">
          <div className="relative group">
            <div
              style={categoryBgStyle}
              className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 bg-gray-200  p-4 bg-cover"
            ></div>
            <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500">
              <h4 className="text-center font-bold text-white">
                {selectedCategory.categoryName}
              </h4>
            </div>
          </div>
        </div>
        <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">
          {categoryName} products are currently out of stock <br /> Please
          Checkout Later
        </h2>
      </div>
    );
  }

  return (
    <div className="pb-12 pt-4 bg-[#EBEFF2] px-4 xl:px-0">
      <div className="max-w-7xl mx-auto px-1">
        <div className="flex justify-center">
          <div className="relative group">
            <div
              style={categoryBgStyle}
              className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 bg-gray-200  p-4 bg-cover"
            ></div>
            <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500">
              <h4 className="text-center font-bold text-white">
                {selectedCategory.categoryName}
              </h4>
            </div>
          </div>
        </div>
        <div className="h-16 flex gap-4 items-center justify-center px-6 mt-4 mb-8">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandButtonClick(brand)}
              className={`font-bold p-2 rounded-md cursor-pointer duration-300 ${
                selectedBrand === brand
                  ? "bg-gray-900 text-gray-200 hover:bg-gray-900 hover:text-gray-200"
                  : "bg-gray-200 text-gray-900 "
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
        <div>
          {!displayProducts.length ? (
            <h2 className="text-center md:text-2xl text-red-600 font-bold h-40">
              {brandName} products are currently out of stock <br /> Please
              Checkout Later
            </h2>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {displayProducts.map((product) => (
                <GalleryProductCard
                  key={product._id}
                  product={product}
                  maxWidth={340}
                  minWidth={340}
                  imageHeight={220}
                ></GalleryProductCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
