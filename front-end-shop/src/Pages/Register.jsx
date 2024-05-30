import { useContext } from "react";
import { Link } from "react-router-dom";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import '../SweetAlertStyle.css';



const Register = () => {

    const {user, createNewUser, updateUser, errorMessage, setErrorMessage} = useContext(BrandShopContext);


    const handleRegister = e => {
        e.preventDefault();

        const form = e.target;

        const photo = form.photo.value;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        const hasCapital = /[A-Z]/;
        const hasSpecial = /[~!@#_+)(*&^%$#-]/;
        if(password.length < 6){
            setErrorMessage('Password must be at least 6 character')
        } else if(!hasCapital.test(password)){
            setErrorMessage('Password should have at least one capital letter')
        } else if(!hasSpecial.test(password)){
            setErrorMessage('Password should have at least one special (@#$...) Character')
        } else{
            createNewUser(email, password)
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    title: "Account Created",
                    // text: "You clicked the button!",
                    timer: 1000,
                    customClass: {
                        container: 'swal-custom-container',
                        title: 'swal-custom-title',
                        text: 'swal-custom-text',
                    }

                  });
                updateUser(name, photo)
                .then(()=> {
                    Swal.fire({
                        // title: "Info Updated",
                        text: "Info Updated",
                        timer: 1000,
                        customClass: {
                            container: 'swal-custom-container',
                            title: 'swal-custom-title',
                            text: 'swal-custom-text',
                        }
    
                      });
                      form.reset();
                })
                .catch((error) => {
                    setErrorMessage(error)
                })
            })
            .catch((error)=> {
                setErrorMessage(error)
            })
        }

        
        // form.reset(); // clear the form
        
    }

    return (
        <div className="bg-blue-gray-900 p-4 sm:p-12 max-w-2xl mx-auto mt-12 rounded-md">

            <h2 className="text-xl text-center font-semibold mb-4">Register Here</h2>

            <form onSubmit={handleRegister} className="space-y-2">
                <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" required/>
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required/>
                <input type="text" name="photo" placeholder="Photo-URL" className="input input-bordered w-full" required/>
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required/>
                <input type="submit" disabled = {!!user} value="Create Account" className="btn btn-primary w-full" />
            </form>
            <div className="mt-4">
                <h2>Already have an account? <Link to={'/login'} className="text-white">Login</Link></h2>
            </div>
            <div>
                <h2 className="text-red-300 text-lg mt-6">{errorMessage}</h2>
            </div>
        </div>
        
    );
};

export default Register;