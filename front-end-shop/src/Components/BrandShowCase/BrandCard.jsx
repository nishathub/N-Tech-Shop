import { useNavigate } from "react-router-dom";



const BrandCard = ({brand}) => {

    const navigate = useNavigate();

    const handleBrandClick = (brandName) => {
         navigate(`/brand/${brandName}`)
    }
    return (
        <div className="rounded-md border border-gray-700 hover:shadow-gray-700 shadow-md duration-300 max-w-sm">
            <img src={brand.brand_photo_link} alt="" />
            <button onClick={() => handleBrandClick(brand.name)} className="btn w-full">{brand.name}</button>
        </div>
    );
};

export default BrandCard;