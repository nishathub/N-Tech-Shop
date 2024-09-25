import { useContext } from "react";
import { BrandShopContext } from "../../../AuthProvider/AuthProvider";


const BToast = () => {
    const {isToastActive, toastText} = useContext(BrandShopContext);
    return (
        <div className={`${isToastActive ? 'scale-100' : 'scale-0'} duration-300 fixed z-50 inset-0 flex items-center justify-center`}>
            <div className="bg-black text-white w-72 m-4 p-4 text-center rounded-lg break-words">
                <p className="font bold">{toastText}</p>
            </div>
        </div>
    );
};

export default BToast;