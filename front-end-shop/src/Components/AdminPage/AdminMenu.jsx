import { MdDashboard, MdDevices } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdCategory } from "react-icons/md";
import { TbBrandBunpo } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const AdminMenu = ({
  isDashboardExpand,
  isProductListActive,
  isCategoriesActive,
  isBrandsActive,
  setDashboardExpand,
  handleAdminMenuClick,
  handleProductListClick,
  handleCategoriesClick,
  handleBrandsClick,
}) => {
    const activeNavStyle = {color: 'orange'};
  return (
    <div
      className={`border border-black ${
        isDashboardExpand ? "lg:w-48 w-12" : "w-12"
      } duration-300 h-[80vh] rounded-md bg-base-100 text-gray-100`}
    >
      {/* HEADING  */}
      <div>
        <div className="flex items-center justify-between p-2 w-full border-b-2 text-center font-semibold">
          <button
            title="Menu"
            className="flex items-center gap-2"
            onClick={handleAdminMenuClick}
          >
            <p
              className={`text-3xl font-bold ${
                isDashboardExpand ? "" : "lg:hidden inline-block"
              }`}
            >
              <MdDashboard />
            </p>
            <p
              className={`font-bold ${
                isDashboardExpand ? "hidden lg:inline-block" : "hidden"
              }`}
            >
              Menu
            </p>
          </button>
          <button
            className="hidden lg:inline-block"
            onClick={() => setDashboardExpand(!isDashboardExpand)}
          >
            {isDashboardExpand ? (
              <p title="Minimize" className="text-3xl">
                <IoIosArrowDropleftCircle />
              </p>
            ) : (
              <p title="Expand" className="text-3xl">
                <IoIosArrowDroprightCircle />
              </p>
            )}
          </button>
        </div>
      </div>
      {/* DASHBOARD NAV BUTTONS  */}
      <div className="p-2 space-y-4 mt-4 w-48">
        <Link
          title="Add a Product"
          to={"/addProduct"}
          className="flex items-center gap-2"
        >
          <p className="text-3xl">
            <IoIosAddCircle />
          </p>
          <p
            className={`font-bold ${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Add a Product
          </p>
        </Link>
        <button
          title="Product-List"
          className="flex items-center gap-2"
          onClick={handleProductListClick}
          style={isProductListActive ? activeNavStyle: {}}
        >
          <p className="text-3xl">
            <MdDevices />
          </p>
          <p
            className={`font-bold ${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Product List
          </p>
        </button>
        <button
          title="Categories"
          className="flex items-center gap-2"
          onClick={handleCategoriesClick}
          style={isCategoriesActive ? activeNavStyle : {}}
        >
          <p className="text-3xl">
            <MdCategory />
          </p>
          <p
            className={`font-bold ${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Categories
          </p>
        </button>
        <button
          title="Brands"
          className="flex items-center gap-2"
          onClick={handleBrandsClick}
          style={isBrandsActive ? activeNavStyle : {}}
        >
          <p className="text-3xl">
            <TbBrandBunpo />
          </p>
          <p
            className={`font-bold ${
              isDashboardExpand ? "hidden lg:inline-block" : "hidden"
            }`}
          >
            Brands
          </p>
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
