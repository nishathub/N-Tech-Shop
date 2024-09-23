import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar/Navbar";
import Footer from "../Layout/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar2 from "../Layout/Navbar/Navbar2";
import "../../googleFontStyle.css";
import BToast from "../Components/Shared/BToast/BToast";

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
      <BToast></BToast>
      <div className="">
        <ScrollToTop></ScrollToTop>

        <Navbar2></Navbar2>
        <div className="pt-20">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;
