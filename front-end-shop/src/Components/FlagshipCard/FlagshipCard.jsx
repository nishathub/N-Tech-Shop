import { useNavigate } from "react-router-dom";

const FlagshipCard = () => {

    const navigate = useNavigate();

    const handleBrandClick = () => {
         navigate(`/products/brand/Google`)
    }

    return (
        <div onClick={handleBrandClick} className='max-w-6xl mx-auto px-1 md:px-0 overflow-hidden hover:cursor-pointer'>
            <div
                className="max-w-6xl mx-auto h-96 bg-[url('https://i.ibb.co/7WdhrZr/google-pixel-6-6-pro-collage-official-press-image.jpg')] bg-cover hover:scale-105 duration-700"
            >
                <div className="p-8 md:p-20 bg-black/50 h-full w-full text-gray-200">
                    <p className="text-4xl first-letter:text-[#0bb7e6]">Google AI in your hand.</p>
                    <p className="text-xl">Pixel phones make it easy to edit photos and videos and get more done.</p>
                    <p className="text-xl">1 year warranty included</p>
                    <button onClick={handleBrandClick} className="bg-gray-200 text-gray-800 font-bold p-2 rounded-md hover:btn w-40 mt-8">EXPLORE</button>
                </div>
            </div>
        </div>
    );
};

export default FlagshipCard;