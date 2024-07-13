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

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products`)
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
                path: "/addProduct",
                element: <AdminRoutes><AddProduct></AddProduct></AdminRoutes>,
            },
            {
                path: "/products/brand/:brand/update/:id",
                element: <AdminRoutes><UpdateProduct></UpdateProduct></AdminRoutes>,
                loader: ({ params }) => fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products/${params.id}`)
            },
            {
                path: "/products/brand/:brandName",
                element: <BrandProducts></BrandProducts>,
                loader: ({ params }) => fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products/brand/${params.brandName}`)
            },
            {
                path: "/products/category/:categoryName",
                element: <CategoryProducts></CategoryProducts>,
                loader: ({ params }) => fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products/category/${params.categoryName}`)
            },
            {
                path: "/products/brand/:brandName/:productId",
                element: <ProductDetails></ProductDetails>,
                loader: ({ params }) => fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products/${params.productId}`)
            },
            {
                path: "/cart",
                element: <PrivateRoutes><Cart></Cart></PrivateRoutes>,
            },
        ]
    }
])

export default Routes;