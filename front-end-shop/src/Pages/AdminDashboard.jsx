import { useContext, useState } from "react";
import AdminPageProductList from "../Components/AdminPage/AdminPageProductList";
import AdminPageCategories from "../Components/AdminPage/AdminPageCategories";
import AdminPageBrands from "../Components/AdminPage/AdminPageBrands";
import AdminHome from "../Components/AdminPage/AdminHome";
import AdminMenu from "../Components/AdminPage/AdminMenu";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";

const AdminDashboard = () => {
  const [isDashboardExpand, setDashboardExpand] = useState(false);
  const [displayHeadingText, setDisplayHeadingText] = useState("Display");
  const [isProductListActive, setProductListActive] = useState(false);
  const [isCategoriesActive, setCategoriesActive] = useState(false);
  const [isBrandsActive, setBrandsActive] = useState(false);
  const [isAdminHomeActive, setAdminHomeActive] = useState(true);
  const {
    allProducts,
    loadCart,
    isLoadingAllProducts,
    productBrands,
    categories,
  } = useContext(BrandShopContext);

  const resetAllActive = () => {
    setProductListActive(false);
    setCategoriesActive(false);
    setBrandsActive(false);
    setAdminHomeActive(false);
  };
  const handleAdminMenuClick = () => {
    setDisplayHeadingText("Display");
    resetAllActive();
    setAdminHomeActive(true);
  };
  const handleProductListClick = () => {
    setDisplayHeadingText("Product List");
    resetAllActive();
    setProductListActive(true);
  };
  const handleCategoriesClick = () => {
    setDisplayHeadingText("Categories");
    resetAllActive();
    setCategoriesActive(true);
  };
  const handleBrandsClick = () => {
    setDisplayHeadingText("Brands");
    resetAllActive();
    setBrandsActive(true);
  };
  return (
    <div className="max-w-7xl p-4 mx-auto text-gray-900">
      <div className="flex gap-2">
        {/* LEFT MENU  */}
        <AdminMenu
          isDashboardExpand={isDashboardExpand}
          setDashboardExpand={setDashboardExpand}
          handleAdminMenuClick={handleAdminMenuClick}
          handleProductListClick={handleProductListClick}
          handleCategoriesClick={handleCategoriesClick}
          handleBrandsClick={handleBrandsClick}
          isProductListActive={isProductListActive}
          isCategoriesActive={isCategoriesActive}
          isBrandsActive={isBrandsActive}
        ></AdminMenu>
        {/* RIGHT SIDE DISPLAY  */}
        <div className="border border-black h-[80vh] overflow-y-auto flex-grow rounded-md">
          <h4 className="w-full bg-base-100 text-gray-100 border-b-2 text-center text-lg font-semibold py-[9px]">
            {displayHeadingText}
          </h4>
          <div>
            {loadCart ? (
              <div className="fixed bg-white/50 z-50 inset-0 flex items-center justify-center">
                {" "}
                <CustomLoading size={32}></CustomLoading>
              </div>
            ) : (
              <div className="p-4">
                {isAdminHomeActive && (
                  <AdminHome
                    allProducts={allProducts}
                    categories={categories}
                    productBrands={productBrands}
                  ></AdminHome>
                )}
                {isProductListActive && (
                  <AdminPageProductList
                    allProducts={allProducts}
                  ></AdminPageProductList>
                )}
                {isCategoriesActive && (
                  <AdminPageCategories
                    categories={categories}
                  ></AdminPageCategories>
                )}
                {isBrandsActive && (
                  <AdminPageBrands
                    productBrands={productBrands}
                  ></AdminPageBrands>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
