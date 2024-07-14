import { Link } from "react-router-dom";

const CategoryContainer = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-0 flex flex-wrap gap-6 items-center justify-center xl:justify-between">
            <Link to={'/products/category/Laptop'}>
                <div className="relative group">
                    <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 custom-login-register  p-4 bg-[url('https://i.ibb.co/G2Vr7sk/laptop-rem-bg.png')] bg-cover">
                    </div>
                    <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                        <h4 className="text-center font-bold text-white">Laptop</h4>
                    </div>
                </div>
            </Link>
            <Link to={'/products/category/Phone'}>
                <div className="relative group">
                    <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 custom-login-register  p-4 bg-[url('https://i.ibb.co/rbYxPY0/phone-rem-bg.png')] bg-cover bg-center">
                    </div>
                    <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                        <h4 className="text-center font-bold text-white">Phone</h4>
                    </div>
                </div>
            </Link>
            <Link to={'/products/category/Camera'}>
                <div className="relative group">
                    <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 custom-login-register  p-4 bg-[url('https://i.ibb.co/68vpr3r/camera-rem-bg.png')] bg-cover bg-center">
                    </div>
                    <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                        <h4 className="text-center font-bold text-white">Camera</h4>
                    </div>
                </div>
            </Link>
            <Link to={'/products/category/Speaker'}>
                <div className="relative group">
                    <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 custom-login-register  p-4 bg-[url('https://i.ibb.co/fCBktCy/speaker-rem-bg.png')] bg-cover">
                    </div>
                    <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                        <h4 className="text-center font-bold text-white">Speaker</h4>
                    </div>
                </div>
            </Link>
            <Link to={'/products/category/Watch'}>
                <div className="relative group">
                    <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 custom-login-register  p-4 bg-[url('https://i.ibb.co/cT0xtqF/watch-rem-bg.png')] bg-cover">
                    </div>
                    <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                        <h4 className="text-center font-bold text-white">Watch</h4>
                    </div>
                </div>
            </Link>
            <Link to={'/products/category/Monitor'}>
                <div className="relative group">
                    <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center rounded-full  duration-300 custom-login-register  p-4 bg-[url('https://i.ibb.co/YX3MjbF/monitor-rem-bg.png')] bg-cover bg-center">
                    </div>
                    <div className="absolute left-0 top-0 w-24 md:w-40 h-24 md:h-40 rounded-full bg-black/50 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:cursor-pointer transition-opacity duration-500">
                        <h4 className="text-center font-bold text-white">Monitor</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default CategoryContainer;