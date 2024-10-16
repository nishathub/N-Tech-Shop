import { createBrowserRouter } from "react-router-dom";

import ErrorElement from "../Layout/ErrorElement/ErrorElement";
import Home from "../Layout/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Pages/AddProduct";
import UpdateProduct from "../Pages/UpdateProduct";
import Root from "../Root/Root";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import BrandProducts from "../Pages/BrandProducts";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import CategoryProducts from "../Pages/CategoryProducts";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import SearchedProducts from "../Pages/SearchedProducts";
import Checkout from "../Pages/Checkout";
import AdminDashboard from "../Pages/AdminDashboard";
import HomeLazy from "../Layout/Home/HomeLazy";
import NewCartPage from "../Pages/NewCartPage";
const nTechBackEnd = import.meta.env.VITE_NTECH_BACKEND;
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        // element: <HomeLazy></HomeLazy>,
        loader: () =>
          fetch(
            `${nTechBackEnd}/products`
          ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/searchedProducts",
        element: <SearchedProducts></SearchedProducts>,
      },
      {
        path: "/addProduct",
        element: (
          <AdminRoutes>
            <AddProduct></AddProduct>
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoutes>
            <AdminDashboard></AdminDashboard>
          </AdminRoutes>
        ),
      },
      {
        path: "/products/brand/:brand/update/:id",
        element: (
          <AdminRoutes>
            <UpdateProduct></UpdateProduct>
          </AdminRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `${nTechBackEnd}/products/${params.id}`
          ),
      },
      {
        path: "/products/brand/:brandName",
        element: <BrandProducts></BrandProducts>,
      },
      {
        path: "/products/category/:categoryName",
        element: <CategoryProducts></CategoryProducts>,
      },
      {
        path: "/products/brand/:brandName/:productId",
        element: <ProductDetails></ProductDetails>,
        loader: ({ params }) =>
          fetch(
            `${nTechBackEnd}/products/${params.productId}`
          ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoutes>
            <NewCartPage></NewCartPage>
          </PrivateRoutes>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoutes>
            <Checkout></Checkout>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default Routes;
