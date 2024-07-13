import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";
import Swal from 'sweetalert2'
import '../../SweetAlertStyle.css';

const Navbar = () => {

    const { loading, user, logOutUser, showCartItems, cartDisplayLoading } = useContext(BrandShopContext);
    const navigate = useNavigate();
    const altUserPhoto = 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                Swal.fire({
                    title: "Logged Out",
                    timer: 1000,
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
            <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/addProduct'}>Add-Product</Link></li>
        </>
    return (
        <div className="bg-base-300 md:py-2">
            <div className="navbar max-w-7xl mx-auto md:px-4 px-1">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu text-gray-200 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <img className="w-12 rounded-full" src="https://i.ibb.co/DrRq2bx/N-TECHNO.jpg" alt="company-logo" />
                        <h2 className="hidden sm:inline-block px-4 font-semibold text-xl text-[#3BBFE3]">N-Tech</h2>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu text-gray-200 menu-horizontal px-1">
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
                                        <h2 className="md:text-lg text-gray-200">{user.displayName.length < 10 ? user.displayName : user.displayName.slice(0, 10) + ".."}</h2>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                                <div className="indicator">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                    <span className="badge badge-sm indicator-item text-[#3BBFE3]">{cartDisplayLoading? 'loading' : showCartItems.length}</span>
                                                </div>
                                            </div>
                                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content md:w-52 bg-base-100 shadow">
                                                <div className="card-body">
                                                    <span className="font-bold md:text-lg">{showCartItems.length} Items</span>
                                                    <div className="card-actions">
                                                        <Link to={'/cart'}><button className="btn btn-primary btn-block">View cart</button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full">
                                                    <img alt="User-Photo" src={user?.photoURL ? user.photoURL : altUserPhoto} />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box md:w-52 space-y-1">
                                                <li className="md:text-lg text-center text-[#3BBFE3]">{user.email}</li>
                                                <li className="md:text-lg text-error" onClick={handleLogOut}><a className="btn btn-error">Logout</a></li>
                                            </ul>
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

export default Navbar;