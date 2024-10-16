import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import "./customStyle.css";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";

const Register = () => {
  const {
    user,
    createNewUser,
    updateUser,
    errorMessage,
    setErrorMessage,
    customAlert,
  } = useContext(BrandShopContext);
  const [isCreateAccountLoading, setCreateAccountLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const form = e.target;

    const photo = form.photo.value;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const hasCapital = /[A-Z]/;
    const hasSpecial = /[~!@#_+)(*&^%$#-]/;
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 character");
    } else if (!hasCapital.test(password)) {
      setErrorMessage("Password should have at least one capital letter");
    } else if (!hasSpecial.test(password)) {
      setErrorMessage(
        "Password should have at least one special (@#$...) Character"
      );
    } else {
      setCreateAccountLoading(true);
      try {
        const result = await createNewUser(email, password);
        console.log(result.user);
        customAlert("Account Created");
        // Redirect to Home Page
        setTimeout(() => {
          navigate("/");
          customAlert("Redirected to Homepage");
        }, 4000);
        //Update user info
        setTimeout(async () => {
          await updateUser(name, photo);
          customAlert("Info Updated");
        }, 2000);
        // form.reset();
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("This email is already associated with an account.");
          customAlert("Email already in use");
        } else {
          setErrorMessage(error.message);
          customAlert("Error occurred");
        }
      } finally {
        setCreateAccountLoading(false);
      }
    }

    // form.reset(); // clear the form
  };

  return (
    <div className="bg-[#EBEFF2]">
      <div className="max-w-5xl mx-auto md:py-20 p-4 md:p-0 text-gray-900">
        <div className="bg-[#D9D9D9] p-4 sm:p-12 max-w-2xl mx-auto rounded-sm custom-login-register relative">
          {isCreateAccountLoading && (
            <div className="absolute bg-white/40 inset-0 flex items-center justify-center ">
              {" "}
              <CustomLoading size={24}></CustomLoading>
            </div>
          )}
          <h2 className="text-xl md:text-3xl text-center font-semibold mb-4">
            Register Here
          </h2>

          <form onSubmit={handleRegister} className="space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo-URL"
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
            <input
              type="submit"
              disabled={!!user}
              value="Create Account"
              className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-full"
            />
          </form>
          <div className="mt-4">
            <h2>
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-black bg-gray-100 p-1 rounded-md hover:bg-white duration-300"
              >
                Login
              </Link>
            </h2>
          </div>
          <div>
            <h2 className="text-red-300 text-lg mt-6">{errorMessage}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
