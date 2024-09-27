import { Link } from "react-router-dom";

const AdminPageCategories = ({ categories }) => {

  return (
    <div>
      <h2 className="text-lg sm:text-xl sm:text-right font-semibold pb-4">
        Total Categories : {categories.length}
      </h2>
      <div className="flex flex-wrap gap-4 items-center sm:justify-center">
        {categories.map((category, index) => (
          <Link to={`/products/category/${category.categoryName}`} key={index} className="border border-black rounded-md w-32 h-28 flex flex-col items-center justify-center">
            <img className="h-20 p-2" src={category.categoryPhotoLink} alt={category.categoryName} />
            <h2 className="font-bold">{category.categoryName}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminPageCategories;
