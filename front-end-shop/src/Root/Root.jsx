import { Outlet } from "react-router-dom";
import Footer from "../Layout/Footer/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../googleFontStyle.css";
import BToast from "../Components/Shared/BToast/BToast";
import CustomNavbar from "../Layout/Navbar/CustomNavbar";

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
      <div className="flex flex-col min-h-screen">
        <ScrollToTop></ScrollToTop>
        <CustomNavbar></CustomNavbar>
        <div className="pt-20 flex-grow min-h-96">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Root;
