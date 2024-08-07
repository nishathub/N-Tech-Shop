import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar2 from "../Layout/Navbar/Navbar2";
import '../../googleFontStyle.css'


const Root = () => {

    
    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }
    return (
        <div className="bg-[#BABCBF] montserrat-regular">
            <div className="">
                <ScrollToTop></ScrollToTop>

                <Navbar2></Navbar2>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;