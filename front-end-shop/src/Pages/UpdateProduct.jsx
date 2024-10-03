import { useLoaderData, useNavigate } from "react-router-dom";
import { Radio } from "@material-tailwind/react";
import { useContext, useState } from "react";
import "./customStyle.css";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CustomLoading from "../Components/Shared/CustomLoading/CustomLoading";

const UpdateProduct = () => {
  const { customAlert } = useContext(BrandShopContext);
  const [isUpdateLoading, setUpdateLoading] = useState(false);
  const oldProduct = useLoaderData();
  const {
    name,
    brand,
    color,
    price,
    image,
    type,
    country,
    year,
    warranty,
    box,
    _id,
  } = oldProduct;
  const navigate = useNavigate();
  const [rating, setUpdatedRating] = useState("3");

  // taking rating by this function
  const handleRatingInput = (e) => {
    setUpdatedRating(e.target.value);
  };

  // Update function
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    const form = e.target;

    const name = form.name.value;
    const brand = form.selectBrand.value;
    const color = form.productColor.value;
    const price = form.price.value;
    const image = form.image.value;
    const country = form.country.value;
    const year = form.year.value;
    const warranty = form.warranty.value;
    const box = form.box.value;
    const type = form.selectType.value;

    const updatedProduct = {
      name,
      brand,
      color,
      price,
      image,
      rating,
      type,
      country,
      year,
      warranty,
      box,
    };
    console.log(updatedProduct);

    try {
      const response = await fetch(
        `https://back-end-shop-e3hg60p1p-nishats-projects-890e0902.vercel.app/products/${_id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.modifiedCount > 0) {
        customAlert("Product Updated");
        setTimeout(() => {
          navigate(`/products/brand/${brand}`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      customAlert("Error");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="bg-[#BABCBF] md:py-12 p-4 md:p-0 text-gray-900">
      <div className="max-w-5xl mx-auto bg-[#D9D9D9] p-4 sm:p-12 custom-login-register relative">
        <h2 className="text-xl md:text-3xl text-center font-semibold mb-4">
          Update Your Product Here
        </h2>
        {isUpdateLoading && (
          <div className="absolute bg-white/40 inset-0 flex items-center justify-center">
            {" "}
            <CustomLoading size={32}></CustomLoading>
          </div>
        )}
        <form onSubmit={handleUpdateProduct} className="space-y-2">
          <div className="md:flex gap-4">
            <input
              type="text"
              name="name"
              defaultValue={name}
              placeholder="Name"
              className="input input-bordered w-full mb-2 md:mb-0"
            />
            <select
              name="selectBrand"
              defaultValue={brand}
              className="select select-bordered w-7/12 "
            >
              <option disabled>Select Brand</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="Google">Google</option>
              <option value="Intel">Intel</option>
              <option value="Xiaomi">Xiaomi</option>
            </select>
          </div>
          <div className="md:flex gap-4">
            <input
              type="number"
              name="price"
              defaultValue={price}
              placeholder="$ Price"
              className="input input-bordered w-full mb-2 md:mb-0"
            />
            <input
              type="text"
              name="productColor"
              defaultValue={color}
              placeholder="Color"
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:flex gap-4">
            <input
              type="text"
              name="country"
              defaultValue={country}
              placeholder="Country"
              className="input input-bordered w-full mb-2 md:mb-0"
            />
            <input
              type="number"
              name="year"
              defaultValue={year}
              placeholder="Release Year"
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:flex gap-4">
            <input
              type="number"
              name="warranty"
              defaultValue={warranty}
              placeholder="Warranty-period"
              className="input input-bordered w-full mb-2 md:mb-0"
            />
            <input
              type="text"
              name="box"
              defaultValue={box}
              placeholder="Provided in the box"
              className="input input-bordered w-full"
            />
          </div>
          <div className="">
            <input
              type="text"
              name="image"
              defaultValue={image}
              placeholder="Image-URL"
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:flex gap-4">
            <select
              name="selectType"
              defaultValue={type}
              className="select select-bordered w-full "
            >
              <option disabled>Select Product Type</option>
              <option value="Phone">Phone</option>
              <option value="Laptop">Laptop</option>
              <option value="Watch">Watch</option>
              <option value="Camera">Camera</option>
              <option value="Speaker">Speaker</option>
              <option value="Monitor">Monitor</option>
            </select>
            <div className="flex flex-col md:flex-row items-center md:gap-4 w-full mt-4 md:mt-0">
              <h2>Rate Your Product</h2>
              <div className="flex w-max md:gap-1 rating">
                <Radio
                  name="color"
                  value={1}
                  color="pink"
                  onChange={handleRatingInput}
                />
                <Radio
                  name="color"
                  value={2}
                  color="deep-orange"
                  onChange={handleRatingInput}
                />
                <Radio
                  name="color"
                  value={3}
                  color="lime"
                  defaultChecked
                  onChange={handleRatingInput}
                />
                <Radio
                  name="color"
                  value={4}
                  color="light-green"
                  onChange={handleRatingInput}
                />
                <Radio
                  name="color"
                  value={5}
                  color="green"
                  onChange={handleRatingInput}
                />
              </div>
            </div>
          </div>

          <div className="md:flex gap-4">
            <input
              type="submit"
              value="Update-Product"
              className="hover:bg-gray-200 hover:text-gray-800 font-bold p-2 rounded-md bg-base-100 text-gray-200 cursor-pointer duration-300 w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
