import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../SweetAlertStyle.css';
import { Radio } from "@material-tailwind/react";
import { useState } from "react";
import './customStyle.css';


const UpdateProduct = () => {
    const oldProduct = useLoaderData();
    const { name, brand, color, price, image, type, country, year, warranty, box, _id } = oldProduct;
    const navigate = useNavigate();
    const [rating, setUpdatedRating] = useState('3');

    // taking rating by this function
    const handleRatingInput = e => {
        setUpdatedRating(e.target.value)
    }

    // Update function
    const handleUpdateProduct = (e) => {
        e.preventDefault();

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

        const updatedProduct = { name, brand, color, price, image, rating, type, country, year, warranty, box };
        console.log(updatedProduct);
        fetch(`https://back-end-shop-hxnt69rib-nishats-projects-890e0902.vercel.app/products/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
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
    // Delete Function
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
                        console.error('Error deleting product:', error);
                    });
            }
        });


    };
    
    return (
        <div className="bg-gray-100 py-12 text-gray-800">
            <div className="max-w-5xl mx-auto px-2">
                <h2 className="text-4xl text-center font-semibold mb-4">Update Your Product Here</h2>
                <form onSubmit={handleUpdateProduct} className="space-y-2">
                    <div className="md:flex gap-4">
                        <input type="text" name="name" defaultValue={name} placeholder="Name" className="input input-bordered w-full mb-2 md:mb-0" />
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
                        <input type="number" name="price" defaultValue={price} placeholder="$ Price" className="input input-bordered w-full mb-2 md:mb-0" />
                        <input type="text" name="productColor" defaultValue={color} placeholder="Color" className="input input-bordered w-full" />
                    </div>
                    <div className="md:flex gap-4">
                        <input type="text" name="country" defaultValue={country} placeholder="Country" className="input input-bordered w-full mb-2 md:mb-0" />
                        <input type="number" name="year" defaultValue={year} placeholder="Release Year" className="input input-bordered w-full" />
                    </div>
                    <div className="md:flex gap-4">
                        <input type="number" name="warranty" defaultValue={warranty} placeholder="Warranty-period" className="input input-bordered w-full mb-2 md:mb-0" />
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
                            <div className="flex w-max gap-1 rating">
                                <Radio name="color" value={1} color="pink" onChange={handleRatingInput} />
                                <Radio name="color" value={2} color="deep-orange" onChange={handleRatingInput} />
                                <Radio name="color" value={3} color="lime" defaultChecked onChange={handleRatingInput} />
                                <Radio name="color" value={4} color="light-green" onChange={handleRatingInput} />
                                <Radio name="color" value={5} color="green" onChange={handleRatingInput} />
                            </div>
                        </div>
                    </div>

                    <div className="md:flex gap-4">
                        <input type="submit" value="Update-Product" className="mt-4 md:mt-0 w-full p-2 rounded-sm submit-button" />
                    </div>
                </form>
                <button onClick={() => handleDeleteProduct(_id)} className='w-full mt-2 rounded-sm p-2 bg-red-900 text-white hover:bg-red-500 duration-300'>Delete</button>
            </div>
        </div>
    );
};

export default UpdateProduct;