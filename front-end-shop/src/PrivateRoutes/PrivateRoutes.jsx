import { useContext } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation, } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { loading, user, customAlert } = useContext(BrandShopContext);
  const location = useLocation();
  const attemptURL = location.pathname;

  if (loading) {
    return <h2>Loading</h2>;
  } else if (!user) {
    customAlert("Log in to visit this page");
    return <Navigate state={attemptURL} to={"/login"}></Navigate>;
  }

  return <div>{children}</div>;
};

export default PrivateRoutes;
