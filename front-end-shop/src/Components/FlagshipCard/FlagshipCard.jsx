import { useNavigate } from "react-router-dom";

const FlagshipCard = () => {

    const navigate = useNavigate();

    const handleBrandClick = () => {
        navigate(`/products/brand/Google`)
    }

    return (
        <div onClick={handleBrandClick} className='max-w-7xl mx-auto px-4 xl:px-0 overflow-hidden hover:cursor-pointer'>
            <div
                className="max-w-7xl mx-auto h-60 md:h-96 bg-[url('https://i.ibb.co/T2Z0z9W/google-pixel-6-portfolio-shot.jpg')] bg-cover hover:scale-105 duration-700"
            >
                <div className="p-8 md:p-20 bg-black/50 h-full w-full text-gray-200 flex flex-col gap-4">
                    <p className="text-2xl md:text-4xl first-letter:text-[#0bb7e6]">Google AI in your hand.</p>
                    <div>
                        <p className="md:text-xl">Pixel phones make it easy to edit photos and videos and get more done.</p>
                        <p className="md:text-xl">1 year warranty included</p>
                    </div>
                    <button onClick={handleBrandClick} className="bg-gray-200 text-gray-800 font-bold md:p-2 rounded-md hover:bg-base-100 hover:text-gray-200 duration-300 w-40 mt-4">Explore</button>
                </div>
            </div>
        </div>
    );
};

export default FlagshipCard;