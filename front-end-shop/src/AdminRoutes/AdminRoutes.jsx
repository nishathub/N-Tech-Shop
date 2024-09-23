import { useContext } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const { loading, user, isAdmin, customAlert } = useContext(BrandShopContext);

  if (loading) {
    return <h2>Loading</h2>;
  } else if (!user) {
    customAlert("Access Denied");
    return <Navigate to={"/"}></Navigate>;
  } else if (!isAdmin) {
    customAlert("Access Denied");
    return <Navigate to={"/"}></Navigate>;
  }

  return <div>{children}</div>;
};

export default AdminRoutes;
