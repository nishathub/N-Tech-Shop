import { FaEnvelope } from "react-icons/fa6";
import '../../Pages/customStyle.css'

const NewsLetter = () => {
    return (
        <div className="flex gap-4 flex-col lg:flex-row justify-between items-center py-12 max-w-7xl mx-auto md:px-8 px-1 bg-[#D7D8D9] custom-login-register rounded-md">
            <div className="flex items-center gap-4 ">
                <div>
                    <p className="text-6xl text-gray-900 hidden md:flex"><FaEnvelope /></p>
                </div>
                <div>
                    <p className="text-2xl mb-2 font-bold capitalize text-gray-900">sign up for newsletters</p>
                    <p className="text text-gray-800">Get E-mail updates about our latest shop and <span className="font-bold">special offers</span></p>
                </div>

            </div>
            <div className="">
                <div className="join">
                    <input className="input input-bordered join-item" placeholder="Email" />
                    <button className="btn hover:bg-gray-200 hover:text-gray-800 duration-300 join-item rounded-r-md ">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;