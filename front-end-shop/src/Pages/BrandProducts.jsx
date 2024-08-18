import { useLoaderData, useParams } from "react-router-dom";
import GalleryProductCard from "../Components/Gallery/GalleryProductCard";
import { useContext, useEffect, useState } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";

const BrandProducts = () => {
  const { brandName } = useParams();
  const oneBrandProducts = useLoaderData();
  const [displayProducts, setDisplayProducts] = useState(oneBrandProducts);
  const { productBrands } = useContext(BrandShopContext);
  const selectedBrand = productBrands.find((brand) => brand.name === brandName);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const bgStyle = { height: "80vh" };

  // To set available categories of a specific brand
  useEffect(() => {
    const categoryBrands = [
      ...new Set(oneBrandProducts.map((product) => product.type)),
    ];
    setCategories(categoryBrands);
  }, [oneBrandProducts]);

  const handleCategoryButtonClick = (categoryName) => {
    const clickedCategoryProducts = oneBrandProducts.filter(
      (product) => product.type === categoryName,
    );
    setDisplayProducts(clickedCategoryProducts);
    setSelectedCategory(categoryName);
  };

  return (
    <div
      style={!oneBrandProducts.length ? bgStyle : {}}
      className="md:py-12 p-4 md:p-0 bg-[#BABCBF]"
    >
      {
        // if No products available, show message
        oneBrandProducts.length < 1 ? (
          <div>
            <div className="w-full mx-auto group">
              <div className="rounded-sm justify-center flex">
                <img
                  className="h-20 group-hover:scale-110 duration-700"
                  src={selectedBrand.brand_photo_link}
                  alt="brand-logo"
                />
              </div>
            </div>
            <h2 className="text-center md:text-2xl text-red-600 font-bold mt-12">
              {brandName} products are currently out of stock <br /> Please
              Checkout Later
            </h2>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="md:mb-12">
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
            <div className="h-20 flex gap-4 items-center justify-center px-6 mt-4 mb-12">
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
        )
      }
    </div>
  );
};

export default BrandProducts;
