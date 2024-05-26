import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/FirebaseSDK";

export const BrandShopContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    // Cart code start here
    const [loadCart, setLoadCart] = useState(true);
    const [cartItems, setCartItems] = useState();
    const [showCartItems, setShowCartItems] = useState([]);
    const [cartItemsTotalPrice, setCartItemTotalPrice] = useState(0);
    const [addCartClick, setAddCartClick] = useState(false); // as the whole code is transferred here from cart page, after adding cart items, the cart page is updated only after refreshing the page. So, I am using a state that, it will become true as soon as we click on add cart button. That state is a dependency to fetch data from cart database each time on useEffect below. this way, the code is working! Alhamdulillah, this idea was mine.

    // we could easily use these code on cart page, but we want to use these info on other components, so, we put them here to utilize context data.

    useEffect(() => {
        fetch('https://back-end-shop-ea7a7996e-nishats-projects-890e0902.vercel.app/cartItems')
            .then(res => res.json())
            .then(data => {
                setCartItems(data)
                setLoadCart(false);
                setAddCartClick(false); // here is the dependency hero
            })
    }, [addCartClick]);

    useEffect(() => {
        const cartPriceList = showCartItems.map(item => item.price);
        let totalCartAmount = 0;
        cartPriceList.forEach(element => {
            const total = parseInt(element);
            totalCartAmount += total;
        });
        setCartItemTotalPrice(totalCartAmount);
    }, [showCartItems])

    useEffect(() => {
        fetch('https://back-end-shop-ea7a7996e-nishats-projects-890e0902.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                if (!loadCart) {
                    const cartItemsIds = cartItems.map(item => item.productId); // collection of cart item ids
                    const displayItems = data.filter(product => cartItemsIds.includes(product._id)); // match id and get items
                    setShowCartItems(displayItems);
                }

            })
            .catch(error => console.error('Error fetching products:', error));
    }, [cartItems, loadCart]);

    // Cart code ends here

    const createNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)
    }
    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    const logOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, [])

    const authData = { user, loading, showCartItems, cartItemsTotalPrice, setShowCartItems, setAddCartClick, setLoading, createNewUser, signInUser, updateUser, errorMessage, setErrorMessage, logOutUser, googleSignIn };
    return (
        <BrandShopContext.Provider value={authData}>
            {children}
        </BrandShopContext.Provider>
    );
};

export default AuthProvider;