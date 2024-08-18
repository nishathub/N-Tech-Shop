import { useContext } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../SweetAlertStyle.css";

const PrivateRoutes = ({ children }) => {
  const { loading, user } = useContext(BrandShopContext);
  const location = useLocation();
  const attemptURL = location.pathname;

  if (loading) {
    return <h2>Loading</h2>;
  } else if (!user) {
    Swal.fire({
      title: "Log In to Visit this page",
      customClass: {
        container: "swal-custom-container",
        title: "swal-custom-title",
        text: "swal-custom-text",
      },
    });

    return <Navigate state={attemptURL} to={"/login"}></Navigate>;
  }

  return <div>{children}</div>;
};

export default PrivateRoutes;
