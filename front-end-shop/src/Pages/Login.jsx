import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import '../SweetAlertStyle.css'


const Login = () => {
    const {signInUser,errorMessage, setErrorMessage, googleSignIn, user} = useContext(BrandShopContext);
    const navigate = useNavigate();
    const location = useLocation();
    const attemptURL = location.state;
    console.log(attemptURL);

    const handleGoogleLogIn = () => {
        googleSignIn()
        .then((result) => {
            console.log(result.user);
            Swal.fire({
                title: "Logged in by google",
                icon: "success",
                timer: 2000,
                customClass: {
                    container: 'swal-custom-container',
                    title: 'swal-custom-title',
                    icon: 'swal-custom-icon',
                    content: 'swal-custom-content',
                }
            });
              setTimeout(() => {
                navigate(!attemptURL === null ? attemptURL : '/')
              }, 1000);
        })
        .catch((error) => {
            setErrorMessage(error.message.slice(9));
        })
    }

    const handleLogin = e => {
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
        .then(() => {
            Swal.fire({
                title: "Logged in by mail",
                icon: "success",
                timer: 2000,
                customClass: {
                    container: 'swal-custom-container',
                    title: 'swal-custom-title',
                    icon: 'swal-custom-icon',
                    content: 'swal-custom-content',
                }
            });
              setTimeout(() => {
                navigate(!attemptURL === null ? attemptURL : '/')
              }, 1000);
        })
        .catch((error) => {
            setErrorMessage(error.message.slice(9));
        })

        // form.reset();
        
    }

    return (
        <div className="bg-blue-gray-900 p-4 sm:p-12 max-w-2xl mx-auto mt-12 rounded-md">

            <h2 className="text-xl text-center font-semibold mb-4">Login Here</h2>

            <form onSubmit={handleLogin} className="space-y-2">
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" />
                <input type="submit" disabled = {!!user} value="Login" className="btn btn-primary w-full" />
            </form>
            <div className="mt-4">
                <h2>Don't have an account? <Link to={'/register'} className="text-white">Register</Link></h2>
            </div>
            <div className="mt-4 flex items-center gap-4">
                <p className="border-t w-full"></p>
                <p className="">Or</p>
                <p className="border-t w-full"></p>
            </div>
                <button onClick={handleGoogleLogIn} className="btn btn-success w-full mt-4">Sign-In with google</button>
            <div>
                <h2 className="text-red-300 text-lg mt-6">{errorMessage}</h2>
            </div>
        </div>
    );
};

export default Login;