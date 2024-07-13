import { useContext } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../SweetAlertStyle.css';

const AdminRoutes = ({ children }) => {

    
    const { loading, user, isAdmin } = useContext(BrandShopContext);

    if (loading) {
        return <h2>Loading</h2>
    } 
    
    else if (!user) {
        Swal.fire({
            title: "Access Denied",
            timer: 1000,
            showConfirmButton: false,
            customClass: {
                container: 'swal-custom-container',
                title: 'swal-custom-title',
                text: 'swal-custom-text',
            }
        });
        return <Navigate to={'/'}></Navigate>
        
    } 
    
    else if (!isAdmin) {
        Swal.fire({
            title: "Access Denied",
            timer: 1000,
            showConfirmButton: false,
            customClass: {
                container: 'swal-custom-container',
                title: 'swal-custom-title',
                text: 'swal-custom-text',
            }
        });
        return <Navigate to={'/'}></Navigate>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default AdminRoutes;