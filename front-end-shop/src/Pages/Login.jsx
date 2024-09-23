import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import "./customStyle.css";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";

const Login = () => {
  const {
    signInUser,
    errorMessage,
    setErrorMessage,
    googleSignIn,
    user,
    customAlert,
  } = useContext(BrandShopContext);
  const [isLoginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const attemptURL = location.state;

  const handleGoogleLogIn = () => {
    setErrorMessage("")
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        customAlert("Logged in by google");
        setTimeout(() => {
          navigate(attemptURL ? attemptURL : "/");
        }, 1000);
      })
      .catch((error) => {
        setErrorMessage(error.message.slice(9));
      });
  };

  const handleLogin = async (e) => {
    setLoginLoading(true);
    setErrorMessage("");
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await signInUser(email, password);
      customAlert("Logged in by email");
      setTimeout(() => {
        navigate(attemptURL ? attemptURL : "/");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message.slice(9));
    } finally {
      setLoginLoading(false);
    }

    // form.reset();
  };

  return (
    <div className="bg-[#BABCBF]">
      <div className="max-w-5xl mx-auto md:py-20 p-4 md:p-0 text-gray-900">
        <div className="bg-[#D9D9D9] p-4 sm:p-12 max-w-2xl mx-auto rounded-sm custom-login-register relative">
            {isLoginLoading && (
              <div className="absolute bg-white/40 inset-0 flex items-center justify-center ">
                {" "}
                <CustomLoading size={24}></CustomLoading>
              </div>
            )}
          <h2 className="text-xl md:text-3xl text-center font-semibold mb-4">
            Login Here
          </h2>

          <form onSubmit={handleLogin} className="space-y-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
            />
            <input
              type="submit"
              disabled={!!user}
              value="Login"
              className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-full"
            />
          </form>
          <div className="mt-4">
            <h2>
              Don&apos;t have an account?{" "}
              <Link
                to={"/register"}
                className="text-black bg-gray-100 p-1 rounded-md hover:bg-white duration-300"
              >
                Register
              </Link>
            </h2>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <p className="border-t w-full border-black"></p>
            <p className="">Or</p>
            <p className="border-t w-full border-black"></p>
          </div>
          <button
            onClick={handleGoogleLogIn}
            className="btn btn-success w-full mt-4 text-white"
          >
            <span className="text-xl">
              <FaGoogle />
            </span>
            Sign-in with Google
          </button>
          <div>
            <h2 className="text-red-800 text-lg mt-6">{errorMessage}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
