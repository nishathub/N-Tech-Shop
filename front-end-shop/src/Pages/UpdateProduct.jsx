

const UpdateProduct = () => {
    return (
        <div className="mt-12">
            <form className="space-y-2">
                <div className="md:flex gap-4">
                    <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" />
                    <input type="text" name="brand" placeholder="Brand Name" className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-4">
                    <input type="text" name="price" placeholder="$ Price" className="input input-bordered w-full" />
                    <input type="text" name="details" placeholder="Details" className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-4">
                    <input type="text" name="image" placeholder="Image-URL" className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-4">
                    <select name="select" defaultValue="Select Product Type" className="select select-bordered w-full ">
                        <option disabled >Select Product Type</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Watch">Watch</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Monitor">Monitor</option>
                    </select>
                    <div className="flex items-center gap-4 w-full">
                        <h2>Rate Your Product</h2>
                        <div className="rating">
                            <input type="radio" name="rating" value="1" className="mask mask-star" />
                            <input type="radio" name="rating" value="2" className="mask mask-star" />
                            <input type="radio" name="rating" value="3" className="mask mask-star" />
                            <input type="radio" name="rating" value="4" className="mask mask-star" />
                            <input type="radio" name="rating" value="5" className="mask mask-star" />
                        </div>
                    </div>
                </div>

                <div className="md:flex gap-4">
                    <input type="submit" value="Add-Product" className="btn btn-ghost input input-bordered w-full" />
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;