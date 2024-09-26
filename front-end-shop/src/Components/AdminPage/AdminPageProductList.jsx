import { useContext } from "react";
import GalleryProductCard from "../Gallery/GalleryProductCard";
import CustomLoading from "../Shared/CustomLoading/CustomLoading";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";

const AdminPageProductList = ({ allProducts }) => {
    const {isDeleteLoading} = useContext(BrandShopContext);

  return (
    <div>
      <div className="relative">
        <h2 className=" text-xl text-right font-semibold pb-4">
          Total Products : {allProducts.length}
        </h2>
        {isDeleteLoading && (
          <div className="fixed bg-white/50 inset-0 flex items-center justify-center">
            {" "}
            <CustomLoading size={32}></CustomLoading>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {allProducts.map((product) => (
          <GalleryProductCard
            key={product._id}
            product={product}
            maxWidth={320}
            minWidth={260}
            imageHeight={160}
          ></GalleryProductCard>
        ))}
      </div>
    </div>
  );
};

export default AdminPageProductList;
