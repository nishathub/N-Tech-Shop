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

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader:  () => fetch(`http://localhost:5000/products`)
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
                element: <PrivateRoutes><AddProduct></AddProduct></PrivateRoutes>,
            },
            {
                path: "/products/brand/:brand/update/:id",
                element: <PrivateRoutes><UpdateProduct></UpdateProduct></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: "/products/brand/:brandName",
                element: <PrivateRoutes><BrandProducts></BrandProducts></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/products/brand/${params.brandName}`)
            },
            {
                path: "/products/brand/:brandName/:productId",
                element: <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.productId}`)
            },
            {
                path: "/cart",
                element: <PrivateRoutes><Cart></Cart></PrivateRoutes>,
                loader:  () => fetch(`http://localhost:5000/cartItems`)
            },
        ]
    }
])

export default Routes;