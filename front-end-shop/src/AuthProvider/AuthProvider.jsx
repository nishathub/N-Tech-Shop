import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/FirebaseSDK";

export const BrandShopContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // All Products
  const [allProducts, setAllProducts] = useState([]);
  // Searched Products
  const [foundProducts, setFoundProduct] = useState([]);
  // json file
  const [productBrands, setProductBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  // Checkout page button
  const [isOrderPlaced, setOrderPlaced] = useState(false);

  // Cart code start here
  const [loadCart, setLoadCart] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showCartItems, setShowCartItems] = useState([]);
  const [cartDisplayLoading, setCartDisplayLoading] = useState(true);
  const [cartItemsTotalPrice, setCartItemTotalPrice] = useState(0);
  const [cartItemQuantities, setCartItemQuantities] = useState({});
  const [cartsubTotal, setcartSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [addCartClick, setAddCartClick] = useState(false); // as the whole code is transferred here from cart page, after adding cart items, the cart page is updated only after refreshing the page. So, I am using a state that, it will become true as soon as we click on add cart button. That state is a dependency to fetch data from cart database each time on useEffect below. this way, the code is working!

  // we could easily use these code on cart page, but we want to use these info on other components, so, we put them here to utilize context data.

  useEffect(() => {
    if (!loading) {
      fetch(
        `https://back-end-shop-i79v47290-nishats-projects-890e0902.vercel.app/cartItems/${user?.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCartItems(data);
          setLoadCart(false);
          setAddCartClick(false); // here is the dependency hero
        });
    }
  }, [addCartClick, loading, user]);

  useEffect(() => {
    if (!loadCart) {
      fetch(
        "https://back-end-shop-i79v47290-nishats-projects-890e0902.vercel.app/products",
      )
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data);
          const cartItemsIds = cartItems.map((item) => item.productId); // collection of cart item ids
          const displayItems = data.filter((product) =>
            cartItemsIds.includes(product._id),
          ); // match id and get items
          setShowCartItems(displayItems);
          setCartDisplayLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setCartDisplayLoading(false);
        });
    }
  }, [cartItems, loadCart]);

  // Calculate Total price
  useEffect(() => {
    if (!cartDisplayLoading) {
      const cartPriceList = showCartItems.map((item) => item.price);
      let totalCartAmount = 0;
      cartPriceList.forEach((element) => {
        const total = parseInt(element);
        totalCartAmount += total;
      });
      setCartItemTotalPrice(totalCartAmount);
    }
  }, [showCartItems]);

  // Cart code ends here

  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email === "nishat@mail.com") {
        setIsAdmin(true);
      } else if (currentUser?.email !== "nishat@mail.com") {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    fetch("/brandList.json")
      .then((res) => res.json())
      .then((data) => setProductBrands(data))
      .catch((error) => console.error(error.message));
  }, []);

  useEffect(() => {
    fetch("/categoryList.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  const authData = {
    user,
    loading,
    loadCart,
    showCartItems,
    cartItemsTotalPrice,
    setCartItemTotalPrice,
    cartDisplayLoading,
    setCartDisplayLoading,
    setShowCartItems,
    setAddCartClick,
    cartItemQuantities,
    isOrderPlaced,
    setOrderPlaced,
    setCartItemQuantities,
    cartsubTotal,
    setcartSubTotal,
    tax,
    setTax,
    discount,
    setDiscount,
    setLoading,
    createNewUser,
    signInUser,
    updateUser,
    errorMessage,
    setErrorMessage,
    logOutUser,
    googleSignIn,
    productBrands,
    categories,
    isAdmin,
    allProducts,
    foundProducts,
    setFoundProduct,
  };
  console.log(isOrderPlaced);
  return (
    <BrandShopContext.Provider value={authData}>
      {children}
    </BrandShopContext.Provider>
  );
};

export default AuthProvider;
