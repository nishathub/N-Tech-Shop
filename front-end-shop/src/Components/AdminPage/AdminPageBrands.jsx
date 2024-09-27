import { Link } from "react-router-dom";

const AdminPageBrands = ({productBrands}) => {
  return (
    <div>
      <h2 className=" text-xl text-right font-semibold pb-4">
        Total productBrands : {productBrands.length}
      </h2>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {productBrands.map((brand, index) => (
          <Link
            to={`/products/brand/${brand.name}`}
            key={index}
            className="border border-black rounded-md w-32 h-28 flex flex-col items-center justify-center"
          >
            <img
              className="h-20 p-2"
              src={brand.brand_photo_link}
              alt={brand.name}
            />
            <h2 className="font-bold">{brand.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPageBrands;
