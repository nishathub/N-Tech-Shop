
import { useParams } from "react-router-dom";


const BrandProducts = () => {
    const {brandName} = useParams();

    return (
        <div>
            <h2>{brandName} Products Available</h2>
        </div>
    );
};

export default BrandProducts;