import { RiCustomerService2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { SiFsecure, SiAuth0 } from "react-icons/si";

const WebsiteFeatures = () => {
  return (
    <div className="relative max-w-7xl px-4 xl:px-0 mx-auto">
      <div className="flex justify-between items-center mb-8 group">
        <h2 className="text-xl md:text-2xl lg:text-3xl py-2 text-gray-900 font-bold ml-4">
          Why Choose Us
        </h2>
        <div className="border border-black hidden md:block md:w-1/3 lg:w-1/2 xl:w-2/3"></div>
      </div>
      <div className="flex gap-2 lg:gap-8 flex-wrap justify-center left-0 bottom-0 max-w-7xl mx-auto px-1 md:px-4 py-4 bg-[#D7D8D9]">
        <div className=" flex flex-col gap-4 items-center justify-center p-4 rounded-sm w-52 text-gray-900 hover:scale-95 duration-300">
          <div>
            <p className="text-3xl lg:text-6xl p-8 w-fit rounded-full bg-[#F2F2F2]">
              <RiCustomerService2Line />
            </p>
          </div>
          <div className="bg-[#F2F2F2] bg-center rounded-md">
            <p className="p-2 text-sm md:text-base md:text-md font-bold">24/7 Support</p>
          </div>
        </div>
        <div className=" flex flex-col gap-4 items-center justify-center p-4 rounded-sm w-52 text-gray-900 hover:scale-95 duration-300 ">
          <div>
            <p className="text-3xl lg:text-6xl p-8 w-fit rounded-full bg-[#F2F2F2]">
              <TbTruckDelivery />
            </p>
          </div>
          <div className="bg-[#F2F2F2] bg-center rounded-md">
            <p className="p-2 text-sm md:text-base md:text-md font-bold">Fast Delivery</p>
          </div>
        </div>
        <div className=" flex flex-col gap-4 items-center justify-center p-4 rounded-sm w-52 text-gray-900 hover:scale-95 duration-300 ">
          <div>
            <p className="text-3xl lg:text-6xl p-8 w-fit rounded-full bg-[#F2F2F2]">
              <SiFsecure />
            </p>
          </div>
          <div className="bg-[#F2F2F2] bg-center rounded-md">
            <p className="p-2 text-sm md:text-base md:text-md font-bold">Secure Payment</p>
          </div>
        </div>
        <div className=" flex flex-col gap-4 items-center justify-center p-4 rounded-sm w-52 text-gray-900 hover:scale-95 duration-300 ">
          <div>
            <p className="text-3xl lg:text-6xl p-8 w-fit rounded-full bg-[#F2F2F2]">
              <SiAuth0 />
            </p>
          </div>
          <div className="bg-[#F2F2F2] bg-center rounded-md">
            <p className="p-2 text-sm md:text-base font-bold">Authentic Product</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteFeatures;
