import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";


const Root = () => {
    return (
        <div className="bg-base-300 h-screen">
            <div className="max-w-6xl mx-auto px-4">
            <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;