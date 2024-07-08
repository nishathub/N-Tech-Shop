import { RiCustomerService2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { SiFsecure, SiAuth0  } from "react-icons/si";



const WebsiteFeatures = () => {
    return (
        <div className="relative max-w-7xl mx-auto">
            <div className="flex gap-8 flex-wrap justify-center left-0 bottom-0 max-w-7xl mx-auto px-1 md:px-4 py-4 bg-white">
                <div className="w-52 h-52 flex flex-col gap-4 items-center justify-center p-4 rounded-sm">
                    <div>
                        <p className="text-6xl text-black hover:bg-[#0bb7e6] hover:text-white duration-300 p-8 w-fit rounded-full bg-[#D9D9D9]"><RiCustomerService2Line /></p>
                    </div>
                    <div className="bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] bg-center rounded-md">
                        <p className="p-2 font-bold text-black">24/7 Support</p>
                    </div>
                </div>
                <div className="w-52 h-52 flex flex-col gap-4 items-center justify-center p-4 rounded-sm">
                    <div>
                        <p className="text-6xl text-black hover:bg-[#0bb7e6] hover:text-white duration-300 p-8 w-fit rounded-full bg-[#D9D9D9]"><TbTruckDelivery /></p>
                    </div>
                    <div className="bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] bg-center rounded-md">
                        <p className="p-2 font-bold text-black">Fast Delivery</p>
                    </div>
                </div>
                <div className="w-52 h-52 flex flex-col gap-4 items-center justify-center p-4 rounded-sm">
                    <div>
                        <p className="text-6xl text-black hover:bg-[#0bb7e6] hover:text-white duration-300 p-8 w-fit rounded-full bg-[#D9D9D9]"><SiFsecure /></p>
                    </div>
                    <div className="bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] bg-center rounded-md">
                        <p className="p-2 font-bold text-black">Secure Payment</p>
                    </div>
                </div>
                <div className="w-52 h-52 flex flex-col gap-4 items-center justify-center p-4 rounded-sm">
                    <div>
                        <p className="text-6xl text-black hover:bg-[#0bb7e6] hover:text-white duration-300 p-8 w-fit rounded-full bg-[#D9D9D9]"><SiAuth0 /></p>
                    </div>
                    <div className="bg-[url('https://i.ibb.co/0BRVqyP/5650320.jpg')] bg-center rounded-md">
                        <p className="p-2 font-bold text-black">Authentic Product</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteFeatures;