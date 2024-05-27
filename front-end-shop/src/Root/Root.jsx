import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";


const Root = () => {
    return (
        <div className="bg-base-300">
            <div className="max-w-6xl mx-auto md:px-4">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;