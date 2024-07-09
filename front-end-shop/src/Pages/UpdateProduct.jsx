import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../SweetAlertStyle.css';


const UpdateProduct = () => {
    const oldProduct = useLoaderData();
    const { name, brand, color, price, image, type, country, year, warranty, box, _id } = oldProduct;
    const navigate = useNavigate();


    const handleUpdateProduct = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const brand = form.selectBrand.value;
        const color = form.color.value;
        const price = form.price.value;
        const image = form.image.value;
        const rating = form.rating.value;
        const country = form.country.value;
        const year = form.year.value;
        const warranty = form.warranty.value;
        const box = form.box.value;
        const type = form.selectType.value;

        const updatedProduct = { name, brand, color, price, image, rating, type, country, year, warranty, box };
        // console.log(newProduct);
        fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products/${_id}`, {
            method: 'PUT', 
            headers: {
                'content-type' : 'application/json'
            }, 
            body: JSON.stringify(updatedProduct)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                Swal.fire({
                    title: "Your product updated",
                    timer: 2000,
                    customClass: {
                        container: 'swal-custom-container',
                        title: 'swal-custom-title',
                        content: 'swal-custom-content',
                    }
                });
                setTimeout(() => {
                    navigate(`/products/brand/${brand}`)
                }, 2000);
            }
        })
        .catch(error => console.error(error))
    }

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
                container: 'swal-custom-container',
                title: 'swal-custom-title',
                text: 'swal-custom-text',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/products/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            console.log(data);
                            Swal.fire({
                                title: "Deleted",
                                text: "You won't be able to revert this!",
                                timer: 2000,
                                customClass: {
                                    container: 'swal-custom-container',
                                    title: 'swal-custom-title',
                                    content: 'swal-custom-content',
                                }
                            });

                            setTimeout(() => {
                                navigate(`/products/brand/${brand}`)
                            }, 2000);
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Something went wrong",
                                timer: 2000,
                                customClass: {
                                    container: 'swal-custom-container',
                                    title: 'swal-custom-title',
                                    content: 'swal-custom-content',
                                }
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong",
                            timer: 2000,
                            customClass: {
                                container: 'swal-custom-container',
                                title: 'swal-custom-title',
                                content: 'swal-custom-content',
                            }
                        });
                        console.error('Error deleting cart item:', error);
                    });
            }
        });


    };
    return (
        <div className="mt-12 bg-blue-gray-900 p-8 rounded-md">
            <h2 className="text-xl text-center font-semibold mb-4">Update Your Product Here</h2>
            <form onSubmit={handleUpdateProduct} className="space-y-2">
                <div className="md:flex gap-4">
                    <input type="text" name="name" defaultValue={name} placeholder="Name" className="input input-bordered w-full" />
                    <select name="selectBrand" defaultValue={brand} className="select select-bordered w-7/12 ">
                        <option disabled >Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                        <option value="Google">Google</option>
                        <option value="Intel">Intel</option>
                        <option value="Xiaomi">Xiaomi</option>
                    </select>
                </div>
                <div className="md:flex gap-4">
                    <input type="number" name="price" defaultValue={price} placeholder="$ Price" className="input input-bordered w-full" />
                    <input type="text" name="color" defaultValue={color} placeholder="Color" className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-4">
                    <input type="text" name="country" defaultValue={country} placeholder="Country" className="input input-bordered w-full" />
                    <input type="number" name="year" defaultValue={year} placeholder="Release Year" className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-4">
                    <input type="number" name="warranty" defaultValue={warranty} placeholder="Warranty-period" className="input input-bordered w-full" />
                    <input type="text" name="box" defaultValue={box} placeholder="Provided in the box" className="input input-bordered w-full" />
                </div>
                <div className="">
                    <input type="text" name="image" defaultValue={image} placeholder="Image-URL" className="input input-bordered w-full" />
                </div>
                <div className="md:flex gap-4">
                    <select name="selectType" defaultValue={type} className="select select-bordered w-full ">
                        <option disabled >Select Product Type</option>
                        <option value="Phone">Phone</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Watch">Watch</option>
                        <option value="Camera">Camera</option>
                        <option value="Speaker">Speaker</option>
                        <option value="Monitor">Monitor</option>
                    </select>
                    <div className="flex items-center gap-4 w-full mt-4 md:mt-0">
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
                    <input type="submit" value="Update-Product" className="mt-4 md:mt-0 btn btn-primary w-full" />
                </div>
            </form>
            <button onClick={() => handleDeleteProduct(_id)} className='w-full p-1 bg-red-900 text-white hover:bg-red-500 duration-300'>Delete</button>
        </div>
    );
};

export default UpdateProduct;