import { createBrowserRouter } from "react-router-dom";

import ErrorElement from "../Layout/ErrorElement/ErrorElement";
import Home from "../Layout/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AddProduct from "../Pages/AddProduct";
import UpdateProduct from "../Pages/UpdateProduct";
import Root from "../Root/Root";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
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
                path: "/updateProduct",
                element: <PrivateRoutes><UpdateProduct></UpdateProduct></PrivateRoutes>,
            },
        ]
    }
])

export default Routes;