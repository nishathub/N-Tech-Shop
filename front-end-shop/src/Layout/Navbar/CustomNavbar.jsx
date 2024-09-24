import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const [showSearchItems, setShowSearchItems] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchBoxRef = useRef();
  const cartBoxRef = useRef();
  const profileBoxRef = useRef();
  const altUserPhoto =
    "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg";
  // Navbar dropDown toggle
  const handleDropdownClick = () => {
    setCartOpen(!isCartOpen);
  };

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

  // hide searchBox when click outside
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

  const navLinks = isAdmin ? (
    <>
      <label className="input flex justify-between items-center md:w-96 font-semibold">
        <input
          onKeyUp={handleSearchInput}
          placeholder="search for products"
          type="text"
        />{" "}
        <Link className="text-2xl" to={"/searchedProducts"}>
          <CiSearch />
        </Link>{" "}
      </label>
      <li className="text-gray-200 flex justify-center items-center bg-gray-900 hover:bg-gray-800 duration-300 rounded-md px-4 text-sm">
        <Link to={"/addProduct"}>Add-Product</Link>
      </li>
    </>
  ) : (
    <>
      <label className="input flex justify-between items-center md:w-96 font-semibold">
        <input
          onKeyUp={handleSearchInput}
          placeholder="search for products"
          type="text"
        />{" "}
        <Link className="text-2xl" to={"/searchedProducts"}>
          <CiSearch />
        </Link>{" "}
      </label>
    </>
  );

  return (
    <div
      className={`bg-[rgba(224,224,224,0.95)] md:py-2 fixed w-full z-10 custom-login-register`}
    >
      <div className="navbar max-w-7xl mx-auto md:px-4 px-1 flex justify-between items-center">
        {/* LEFT  */}
        <div className="flex items-center">
          <Link to={"/"}>
            <img
              className="w-12 rounded-full"
              src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg"
              alt="company-logo"
            />
          </Link>
          <Link to={"/"}>
            <h2 className="hidden sm:inline-block px-4 font-semibold text-xl text-gray-900">
              N-Tech
            </h2>
          </Link>
        </div>
        {/* MIDDLE  */}
        <div className="hidden lg:flex">
          <div className="font-bold flex gap-2">{navLinks}</div>
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
                  <div className="flex items-center gap-1">
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
      {/* ABSOLUTE SEARCH-BOX */}
      <div
        ref={searchBoxRef}
        className={`${
          !showSearchItems && "hidden"
        } md:w-96 w-80 h-80 rounded-md bg-blue-gray-300 absolute z-20 mt-16 lg:mt-2 lg:-ml-4 left-1/2 -translate-x-1/2 lg:-translate-x-2/3 overflow-y-scroll`}
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
              <div className="flex justify-between items-center p-2 border-b hover:bg-blue-gray-200 duration-300">
                <img
                  className="w-16 h-16"
                  src={product.image}
                  alt="product-image"
                />
                <h2>{product.name}</h2>
                <p>$ {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
