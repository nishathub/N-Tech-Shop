import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { CgMenuMotion } from "react-icons/cg";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";
import { MdOutlineSecurity } from "react-icons/md";

const CustomNavbar = () => {
  const {
    loading,
    user,
    isAdmin,
    logOutUser,
    showCartItems,
    cartDisplayLoading,
    allProducts,
    foundProducts,
    setFoundProduct,
    customAlert,
  } = useContext(BrandShopContext);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isProfileActive, setProfileActive] = useState(false);
  const [isMenuActive, setMenuActive] = useState(false);
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchBoxRef = useRef();
  const cartBoxRef = useRef();
  const navMenuRef = useRef();
  const profileBoxRef = useRef();
  const altUserPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";

  const handleSearchInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const foundItems = allProducts.filter((product) =>
      product.name.toLowerCase().includes(inputValue)
    );
    setFoundProduct(foundItems);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      setShowSearchItems(true);
    } else {
      setShowSearchItems(false);
    }
  }, [searchInput]);

  // hide searchBox on location change
  useEffect(() => {
    setShowSearchItems(false);
  }, [location]);

  // hide absolute boxes when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearchItems(false);
      }
      if (cartBoxRef.current && !cartBoxRef.current.contains(e.target)) {
        setCartOpen(false);
      }
      if (profileBoxRef.current && !profileBoxRef.current.contains(e.target)) {
        setProfileActive(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(e.target)) {
        setMenuActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogOut = () => {
    logOutUser().then(() => {
      customAlert("Logged out");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    });
  };
  //   SMALL DEVICE NAV-CARD STYLE
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isBrandsOpen, setBrandsOpen] = useState(false);
  const specificationStyle = {
    maxHeight: isCategoryOpen ? "100vh" : "0px",
    overflow: "hidden",
    transition: "max-height 0.7s ease-in-out",
  };
  const displayStyle = {
    maxHeight: isBrandsOpen ? "100vh" : "0px",
    overflow: "hidden",
    transition: "max-height 0.7s ease-in-out",
  };

  const navLinks = isAdmin ? (
    <>
      <div className="flex lg:hidden gap-2 items-center">
        <Link to={"/"}>
          <img
            className="w-8 md:w-12 rounded-full"
            src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg"
            alt="company-logo"
            title="N-Tech"
          />
        </Link>
        <Link to={"/"}>
          <h2 className="lg:hidden font-semibold text-lg text-gray-100">
            N-Tech
          </h2>
        </Link>
      </div>
      <div className="w-40 lg:w-28">
        <div
          onClick={() => setCategoryOpen(!isCategoryOpen)}
          className="flex justify-between items-center bg-gray-200 p-2 rounded-md hover:cursor-pointer"
        >
          <h4 className="text-gray-900 font-semibold">Category</h4>
          <span className="text-gray-900 text-xl font-semibold">
            {" "}
            {!isCategoryOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </span>
        </div>
        <div style={specificationStyle}>
          <div className="p-4 flex flex-col gap-2">
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Laptop"}
            >
              Laptop
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Phone"}
            >
              Phone
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Camera"}
            >
              Camera
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Speaker"}
            >
              Speaker
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Watch"}
            >
              Watch
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Monitor"}
            >
              Monitor
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-40 lg:w-28">
        <div
          onClick={() => setBrandsOpen(!isBrandsOpen)}
          className="flex justify-between bg-gray-200 p-2 rounded-md hover:cursor-pointer"
        >
          <h4 className="text-gray-900 font-semibold">Brands</h4>
          <span className="text-gray-900 text-xl font-semibold">
            {" "}
            {!isBrandsOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </span>
        </div>
        <div style={displayStyle}>
          <div className="p-4 flex flex-col gap-2">
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Google"}
            >
              Google
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Apple"}
            >
              Apple
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Xiaomi"}
            >
              Xiaomi
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Intel"}
            >
              Intel
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Samsung"}
            >
              Samsung
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Sony"}
            >
              Sony
            </NavLink>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex lg:hidden gap-2 items-center">
        <Link to={"/"}>
          <img
            className="w-8 md:w-12 rounded-full"
            src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg"
            alt="company-logo"
            title="N-Tech"
          />
        </Link>
        <Link to={"/"}>
          <h2 className="lg:hidden font-semibold text-lg text-gray-100">
            N-Tech
          </h2>
        </Link>
      </div>
      <div className="w-40 lg:w-28">
        <div
          onClick={() => setCategoryOpen(!isCategoryOpen)}
          className="flex justify-between items-center bg-gray-200 p-2 rounded-md hover:cursor-pointer"
        >
          <h4 className="text-gray-900 font-semibold">Category</h4>
          <span className="text-gray-900 text-xl font-semibold">
            {" "}
            {!isCategoryOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </span>
        </div>
        <div style={specificationStyle}>
          <div className="p-4 flex flex-col gap-2">
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Laptop"}
            >
              Laptop
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Phone"}
            >
              Phone
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Camera"}
            >
              Camera
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Speaker"}
            >
              Speaker
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Watch"}
            >
              Watch
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/category/Monitor"}
            >
              Monitor
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-40 lg:w-28">
        <div
          onClick={() => setBrandsOpen(!isBrandsOpen)}
          className="flex justify-between bg-gray-200 p-2 rounded-md hover:cursor-pointer"
        >
          <h4 className="text-gray-900 font-semibold">Brands</h4>
          <span className="text-gray-900 text-xl font-semibold">
            {" "}
            {!isBrandsOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowUp />
            )}
          </span>
        </div>
        <div style={displayStyle}>
          <div className="p-4 flex flex-col gap-2">
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Google"}
            >
              Google
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Apple"}
            >
              Apple
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Xiaomi"}
            >
              Xiaomi
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Intel"}
            >
              Intel
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Samsung"}
            >
              Samsung
            </NavLink>
            <NavLink
              className={"hover:text-white duration-300"}
              to={"/products/brand/Sony"}
            >
              Sony
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`bg-[rgba(224,224,224,0.95)] h-[64px] lg:h-20 fixed w-full z-10 custom-login-register`}
    >
      <div className="navbar max-w-7xl mx-auto md:px-4 px-1 flex justify-between items-center h-full my-auto">
        {/* ABSOLUTE MENU  */}
        <div
          ref={navMenuRef}
          className={`absolute p-4 space-y-4 lg:hidden overflow-y-auto ${
            isMenuActive
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-10 pointer-events-none"
          } duration-300 top-[64px] left-0 w-[200px] h-[calc(100vh-64px)] bg-base-100 items-start`}
        >
          <div className="flex flex-col gap-4 w-fit">{navLinks}</div>
        </div>
        {/* LEFT  */}
        <div className="flex gap-2 items-center ">
          <div className="lg:hidden pt-1">
            <button
              onClick={() => setMenuActive(!isMenuActive)}
              className="text-3xl text-gray-900"
            >
              {isMenuActive ? <CgMenuMotion /> : <IoMenu />}
            </button>
          </div>
          <Link to={"/"}>
            <img
              className="w-8 md:w-12 rounded-full"
              src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg"
              alt="company-logo"
              title="N-Tech"
            />
          </Link>
          <Link to={"/"}>
            <h2 className="hidden lg:inline-block font-semibold text-xl text-gray-900">
              N-Tech
            </h2>
          </Link>
        </div>
        {/* MIDDLE  */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            {/* ABSOLUTE SEARCH-BOX */}
            <div
              ref={searchBoxRef}
              className={`${
                !showSearchItems && "hidden"
              } w-72 lg:w-80 h-60 lg:h-80 rounded-md bg-base-100 absolute top-[56px] lg:top-[60px] right-1/2 translate-x-1/2 z-20 overflow-y-auto product-search-box`}
            >
              {!foundProducts.length && (
                <div className="p-4">
                  <h2 className="text-red-900">No items found</h2>
                </div>
              )}
              <div className="text-black space-y-2">
                {foundProducts.map((product) => (
                  <Link
                    to={`/products/brand/${product.brand}/${product._id}`}
                    key={product._id}
                  >
                    <div className="flex justify-between gap-2 items-center p-2 border-b hover:bg-base-300 duration-300">
                      <img
                        className="w-16 h-16"
                        src={product.image}
                        alt="product-image"
                      />
                      <div className="text-right">
                        <h2 className="font-semibold text-gray-100">{product.name}</h2>
                        <p className="bg-blue-gray-100 w-fit ml-auto px-1 rounded-md">
                          $ {product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <label className="flex input justify-between items-center w-40 md:w-72">
              <input
                className="w-24 md:w-auto"
                onKeyUp={handleSearchInput}
                placeholder="search"
                type="text"
              />{" "}
              <Link className="text-2xl" to={"/searchedProducts"}>
                <CiSearch />
              </Link>{" "}
            </label>
          </div>
          <div className="font-bold hidden lg:flex gap-2">{navLinks}</div>
        </div>
        {/* RIGHT  */}
        <div className="">
          {loading ? (
            <h2>loading</h2>
          ) : (
            <div>
              {!user ? (
                <Link to={"/login"}>
                  <button className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 duration-300">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex items-center gap-1">
                    <h2
                      title="Admin"
                      className={`text-xl ${
                        isAdmin ? "text-orange-900" : "hidden"
                      }`}
                    >
                      <MdOutlineSecurity />
                    </h2>
                    <h2 className="md:text-lg text-gray-900 font-semibold hidden lg:block">
                      {user?.displayName ? user.displayName : ""}
                    </h2>
                    <h2
                      className={`md:text-lg text-gray-900 font-semibold lg:hidden`}
                    >
                      {user?.displayName?.length < 10
                        ? user.displayName
                        : user.displayName?.slice(0, 10) + ".."}
                    </h2>
                  </div>
                  {/* CART  */}
                  <div ref={cartBoxRef} className="relative">
                    {/* ABSOLUTE BADGE */}
                    <p className="absolute -top-2 -right-2 bg-black text-sm text-[#43d6ff] px-2 rounded-full">
                      {cartDisplayLoading ? "loading" : showCartItems.length}
                    </p>
                    {/* ABSOLUTE CART-BOX */}
                    <div className=" absolute top-16 right-0 w-52 md:w-80 rounded-md bg-base-100">
                      {isCartOpen && (
                        <div className="p-4 space-y-3">
                          <span className="font-bold text-gray-200 md:text-lg">
                            {showCartItems.length} Items
                          </span>
                          <div>
                            {showCartItems.map((item) => (
                              <h4 key={item._id}>{item.name}</h4>
                            ))}
                          </div>
                          <div className="w-full">
                            <Link to={"/cart"}>
                              <button className="bg-gray-200 text-gray-800 font-bold p-1 rounded-md hover:bg-base-100 hover:text-gray-200 duration-300 w-full">
                                View cart
                              </button>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <button onClick={() => setCartOpen(!isCartOpen)}>
                      <p className="text-black text-xl p-2 hover:text-white hover:bg-black/70 duration-300 rounded-full">
                        <MdOutlineShoppingCart />
                      </p>
                    </button>
                  </div>
                  {/* Profile  */}
                  <div ref={profileBoxRef} className="relative">
                    {/* ABSOLUTE PROFILE CARD  */}
                    <div className="absolute top-16 right-0">
                      {isProfileActive && (
                        <ul className="menu mt-3 p-4 bg-base-100 rounded-sm w-52 md:w-80 space-y-3">
                          <li>
                            <div className="w-20 rounded-full mx-auto">
                              <img
                                className=""
                                alt="User-Photo"
                                src={
                                  user?.photoURL ? user.photoURL : altUserPhoto
                                }
                              />
                            </div>
                          </li>
                          <li className="md:text-lg text-gray-200 text-center">
                            {user.displayName}
                          </li>
                          <li
                            className={`${
                              isAdmin ? "text-orange-400" : "hidden"
                            } text-center`}
                          >
                            <div className="flex items-center gap-2 mx-auto">
                              <p>
                                <MdOutlineSecurity />
                              </p>
                              <p>Admin</p>
                            </div>
                          </li>
                          <li className="md:text-lg text-center text-[#3BBFE3]">
                            {user.email}
                          </li>
                          <li
                            className="md:text-lg text-error"
                            onClick={handleLogOut}
                          >
                            <a className="btn btn-sm btn-error">Logout</a>
                          </li>
                        </ul>
                      )}
                    </div>
                    <button
                      onClick={() => setProfileActive(!isProfileActive)}
                      className="w-10  rounded-full"
                    >
                      <img
                        alt="User-Photo"
                        src={user?.photoURL ? user.photoURL : altUserPhoto}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
