import React, { useContext, useState } from "react";
import { BrandShopContext } from "../AuthProvider/AuthProvider";
import CashReceiptModal from "../Components/CashReceiptModal/CashReceiptModal";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";




const CheckoutPage = () => {
    const { showCartItems, cartItemQuantities, cartsubTotal,
        tax, discount, cartItemsTotalPrice } = useContext(BrandShopContext);

    console.log(showCartItems, cartItemQuantities);

    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);
    const [selectedPaymentSubOption, setSelectedPaymentSubOption] = useState(null);
    const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
    const [selectedDeliverySubOption, setSelectedDeliverySubOption] = useState(null);
    const [billDetails, setBillDetails] = useState(null); // State to store bill details

    const handlePaymentSelect = (option) => {
        setSelectedPaymentOption(option);
        setSelectedPaymentSubOption(null); // Reset payment sub-option when a new payment option is selected
    };

    const handlePaymentSubSelect = (subOption) => {
        setSelectedPaymentSubOption(subOption);
    };

    const handleDeliverySelect = (option) => {
        setSelectedDeliveryOption(option);
        setSelectedDeliverySubOption(null); // Reset delivery sub-option when a new delivery option is selected
    };

    const handleDeliverySubSelect = (subOption) => {
        setSelectedDeliverySubOption(subOption);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const customerName = form.name.value;
        const customerPhone = form.phone.value;
        const customerEmail = form.email.value;
        const customerLocation = form.location.value;
        const customerNote = form.note.value;

        const getPaymentText = (option, subOption) => {
            switch (option) {
                case 1:
                    return 'Cash on Delivery';
                case 2:
                    switch (subOption) {
                        case 'A':
                            return 'Online Payment - SSL/Card';
                        case 'B':
                            return 'Online Payment - Bkash';
                        case 'C':
                            return 'Online Payment - Rocket';
                        default:
                            return 'Online Payment';
                    }
                default:
                    return 'Unknown Payment Method';
            }
        };

        const getDeliveryText = (option, subOption) => {
            switch (option) {
                case 3:
                    return 'Home Delivery';
                case 4:
                    switch (subOption) {
                        case 'D':
                            return 'Shop Pickup - Banani Outlet';
                        case 'E':
                            return 'Shop Pickup - Uttara Outlet';
                        case 'F':
                            return 'Shop Pickup - Dhanmondi Outlet';
                        default:
                            return 'Shop Pickup';
                    }
                default:
                    return 'Unknown Delivery Method';
            }
        };

        const paymentText = getPaymentText(selectedPaymentOption, selectedPaymentSubOption);
        const deliveryText = getDeliveryText(selectedDeliveryOption, selectedDeliverySubOption);

        const billDetails = {
            customerName,
            customerEmail,
            customerPhone,
            customerLocation,
            customerNote,
            paymentText,
            deliveryText
        };

        setBillDetails(billDetails);
    };

    const getBoxClasses = (option, isSelected) => {
        return `border p-2 lg:p-4 m-2 cursor-pointer text-center rounded-md ${isSelected ? 'text-gray-200 bg-gray-900' : 'border-gray-600 bg-gray-200'
            }`;
    };

    return (
        <div className="max-w-7xl mx-auto px-1 py-12 text-gray-900">
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Info  */}
                    <div className="w-80 md:w-96 lg:w-full mx-auto bg-[#D9D9D9] p-6 space-y-2 rounded-md custom-login-register">
                        <h4 className="text-gray-900 text-xl border-b border-black/30 pb-4 mb-4">
                            <span className="w-8 h-8 inline-flex items-center justify-center rounded-full text-white bg-black mx-2 ">
                                1
                            </span>
                            Customer Information
                        </h4>
                        <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" />
                        <input type="text" name="phone" placeholder="Phone Number" className="input input-bordered w-full" />
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
                        <input type="text" name="location" placeholder="Address" className="input input-bordered w-full" />
                        <textarea className="w-full input input-bordered p-4 h-32" name="note" placeholder="Notes" rows={5}></textarea>
                    </div>
                    {/* Payment Method  */}
                    <div className="w-80 md:w-96 lg:w-full mx-auto bg-[#D9D9D9] p-6 rounded-md custom-login-register">
                        <h4 className="text-gray-900 text-xl border-b border-black/30 pb-4 mb-4">
                            <span className="w-8 h-8 inline-flex items-center justify-center rounded-full text-white bg-black mx-2">
                                2
                            </span>
                            Payment Method
                        </h4>

                        <div className="flex flex-col items-center">
                            <div className="flex">
                                <div className={getBoxClasses(1, selectedPaymentOption === 1)} onClick={() => handlePaymentSelect(1)}>
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <h4 className="text-2xl lg:text-4xl"><GiTakeMyMoney /></h4>
                                        <h4>Cash on Delivery</h4>
                                    </div>

                                </div>
                                <div className={getBoxClasses(2, selectedPaymentOption === 2)} onClick={() => handlePaymentSelect(2)}>
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <h4 className="text-2xl lg:text-4xl"><FaMoneyCheckDollar /></h4>
                                        <h4>Online Payment</h4>
                                    </div>

                                </div>
                            </div>

                            {selectedPaymentOption === 2 && (
                                <div className="flex mt-5">
                                    <div className={getBoxClasses('A', selectedPaymentSubOption === 'A')} onClick={() => handlePaymentSubSelect('A')}>
                                        SSL/Card
                                    </div>
                                    <div className={getBoxClasses('B', selectedPaymentSubOption === 'B')} onClick={() => handlePaymentSubSelect('B')}>
                                        Bkash
                                    </div>
                                    <div className={getBoxClasses('C', selectedPaymentSubOption === 'C')} onClick={() => handlePaymentSubSelect('C')}>
                                        Rocket
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Delivery Method  */}
                    <div className="w-80 md:w-96 lg:w-full mx-auto bg-[#D9D9D9] p-6 rounded-md custom-login-register">
                        <h4 className="text-gray-900 text-xl border-b border-black/30 pb-4 mb-4">
                            <span className="w-8 h-8 inline-flex items-center justify-center rounded-full text-white bg-black mx-2">
                                3
                            </span>
                            Delivery Method
                        </h4>

                        <div className="flex flex-col items-center">
                            <div className="flex">
                                <div className={getBoxClasses(3, selectedDeliveryOption === 3)} onClick={() => handleDeliverySelect(3)}>
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <h4 className="text-2xl lg:text-4xl"><TbTruckDelivery /></h4>
                                        <h4>Home Delivery</h4>
                                    </div>
                                </div>
                                <div className={getBoxClasses(4, selectedDeliveryOption === 4)} onClick={() => handleDeliverySelect(4)}>
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <h4 className="text-2xl lg:text-4xl"><FaShoppingBag /></h4>
                                        <h4>Shop Pickup</h4>
                                    </div>
                                </div>
                            </div>

                            {selectedDeliveryOption === 4 && (
                                <div className="flex mt-5">
                                    <div className={getBoxClasses('D', selectedDeliverySubOption === 'D')} onClick={() => handleDeliverySubSelect('D')}>
                                        Banani Outlet
                                    </div>
                                    <div className={getBoxClasses('E', selectedDeliverySubOption === 'E')} onClick={() => handleDeliverySubSelect('E')}>
                                        Uttara Outlet
                                    </div>
                                    <div className={getBoxClasses('F', selectedDeliverySubOption === 'F')} onClick={() => handleDeliverySubSelect('F')}>
                                        Dhanmondi Outlet
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-80 md:w-96 lg:w-full mx-auto">
                    <button type="submit" className="w-full p-4 rounded-md font-semibold bg-gray-900 text-gray-200 hover:text-gray-900 hover:bg-gray-200 duration-300 ">
                        Confirm Order
                    </button>
                </div>
            </form>


            {/* Cash Receipt Modal */}
            {billDetails && (
                <CashReceiptModal
                    billDetails={billDetails}
                    setBillDetails={setBillDetails}
                ></CashReceiptModal>
            )}

        </div>
    );
};

export default CheckoutPage;
