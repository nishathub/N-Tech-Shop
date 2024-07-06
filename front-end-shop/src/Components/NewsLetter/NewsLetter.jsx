import { FaEnvelope } from "react-icons/fa6";

const NewsLetter = () => {
    return (
        <div className="flex  mt-8 md:mt-0 gap-4 flex-col md:flex-row justify-between md:items-center py-12 max-w-6xl mx-auto md:px-4 px-1">
            <div className="flex items-center gap-4 ">
                <div>
                    <p className="text-6xl hidden md:flex"><FaEnvelope /></p>
                </div>
                <div>
                    <p className="text-2xl mb-2 font-bold capitalize text-gray-200">sign up for newsletters</p>
                    <p className="text text-gray-400">Get E-mail updates about our latest shop and <span className="text-[#dcf5fc]">special offers</span></p>
                </div>

            </div>
            <div className="">
                <div className="join">
                    <input className="input input-bordered join-item" placeholder="Email" />
                    <button className="btn join-item rounded-r-md ">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;