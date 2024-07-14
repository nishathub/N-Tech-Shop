import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";
import { MdOutlineSecurity } from "react-icons/md";

import Swal from 'sweetalert2'
import '../../SweetAlertStyle.css';

const Navbar2 = () => {

    const { loading, user, isAdmin, logOutUser, showCartItems, cartDisplayLoading } = useContext(BrandShopContext);
    const [isFixed, setIsFixed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const altUserPhoto = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

    // Navbar dropDown toggle
    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };
    // Navbar fixed/relative according to scroll position
    const handleScroll = () => {
        if (window.scrollY > 20) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    title: "Logged Out",
                    timer: 1000,
                    showConfirmButton: false,
                    customClass: {
                        container: 'swal-custom-container',
                        title: 'swal-custom-title',
                        text: 'swal-custom-text',
                    }
                });


                setTimeout(() => {
                    navigate('/login')
                }, 800);
            })
    }

    const links =
        <>
            <li className="bg-gray-200 text-gray-900 duration-300 rounded-md"><Link to={'/'}>Home</Link></li>
            <li className="bg-gray-200 text-gray-900 duration-300 rounded-md"><Link to={'/addProduct'}>Add-Product</Link></li>
        </>
    return (
        <div className={`bg-[rgba(224,224,224,0.9)] md:py-2 ${isFixed ? 'fixed w-full z-10' : 'relative'} custom-login-register`}>
            <div className="navbar max-w-7xl mx-auto md:px-4 px-1">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div onClick={handleDropdownClick} tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        {isOpen &&
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-sm w-52 space-y-2">
                                {links}
                            </ul>
                        }
                    </div>
                    <div className="flex items-center">
                        <Link to={'/'}><img className="w-12 rounded-full" src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg" alt="company-logo" /></Link>
                        <Link to={'/'}><h2 className="hidden sm:inline-block px-4 font-semibold text-xl text-gray-900">N-Tech</h2></Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal font-bold space-x-2">
                        {links}
                    </ul>
                </div>
                {/* CART AND AVATAR  */}
                <div className="navbar-end">
                    {
                        loading ? <h2>loading</h2> :
                            <div>
                                {!user ?

                                    <Link to={'/login'}><button className="bg-gray-200 text-gray-800 font-bold p-2 rounded-md hover:bg-base-100 hover:text-gray-200 duration-300">Login</button></Link>
                                    :
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <h2 className={`text-xl ${isAdmin ? 'text-orange-900' : 'hidden'}`}><MdOutlineSecurity /></h2>
                                            <h2 className={`md:text-lg text-gray-900`}>{user.displayName.length < 10 ? user.displayName : user.displayName.slice(0, 10) + ".."}</h2>
                                        </div>
                                        <div onClick={handleDropdownClick} className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                                <div className="indicator">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                    <span className="badge badge-sm indicator-item text-[#3BBFE3]">{cartDisplayLoading ? 'loading' : showCartItems.length}</span>
                                                </div>
                                            </div>
                                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 md:w-80 bg-base-100 shadow">
                                                {isOpen &&
                                                    <div className="p-4 space-y-3">
                                                        <span className="font-bold text-gray-200 md:text-lg">{showCartItems.length} Items</span>
                                                        <div>
                                                            {showCartItems.map(item =>
                                                                <h4 key={item._id}>{item.name}</h4>
                                                            )}
                                                        </div>
                                                        <div className="w-full">
                                                            <Link to={'/cart'}><button className="bg-gray-200 text-gray-800 font-bold p-1 rounded-md hover:bg-base-100 hover:text-gray-200 duration-300 w-full">View cart</button></Link>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div onClick={handleDropdownClick} className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full">
                                                    <img alt="User-Photo" src={user?.photoURL ? user.photoURL : altUserPhoto} />
                                                </div>
                                            </div>
                                            {isOpen &&
                                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 bg-base-100 rounded-sm w-52 md:w-80 space-y-3">
                                                    <li><div className="w-20 rounded-full mx-auto">
                                                        <img className="" alt="User-Photo" src={user?.photoURL ? user.photoURL : altUserPhoto} />
                                                    </div></li>
                                                    <li className="md:text-lg text-gray-200 text-center">{user.displayName}</li>
                                                    <li className={`${isAdmin ? 'text-orange-400' : 'hidden'} text-center`}>
                                                        <div className="flex items-center gap-2 mx-auto">
                                                            <p><MdOutlineSecurity /></p>
                                                            <p>Admin</p>
                                                        </div>
                                                    </li>
                                                    <li className="md:text-lg text-center text-[#3BBFE3]">{user.email}</li>
                                                    <li className="md:text-lg text-error" onClick={handleLogOut}><a className="btn btn-sm btn-error">Logout</a></li>
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default Navbar2;