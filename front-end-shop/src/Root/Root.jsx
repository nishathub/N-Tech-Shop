import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const Root = () => {

    
    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }
    return (
        <div className="bg-[#BABCBF]">
            <div className="">
                <ScrollToTop></ScrollToTop>

                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;