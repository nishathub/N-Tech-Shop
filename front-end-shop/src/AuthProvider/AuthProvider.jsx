import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/FirebaseSDK";

export const BrandShopContext = createContext();

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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
            displayName : name, photoURL : photo
        });
    }
    const logOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        } )
        return () => unSubscribe();
    }, [])

    const authData = {user, loading, setLoading, createNewUser, signInUser, updateUser, errorMessage, setErrorMessage, logOutUser, googleSignIn};
    return (
        <BrandShopContext.Provider value={authData}>
            {children}
        </BrandShopContext.Provider>
    );
};

export default AuthProvider;