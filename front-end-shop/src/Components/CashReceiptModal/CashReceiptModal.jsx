import { useContext } from "react";
import { BrandShopContext } from "../../AuthProvider/AuthProvider";

const CashReceiptModal = ({
  billDetails,
  setBillDetails,
  handleDeleteAllCartItems,
}) => {
  const { cartItems, cartSubTotal, tax, discount, cartItemsTotalPrice } =
    useContext(BrandShopContext);
  const handleCloseClick = () => {
    setBillDetails(null);
    handleDeleteAllCartItems();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-gray-800 z-50">
      <div className="bg-[#D9D9D9] p-4 md:p-8 rounded-md w-full max-w-md md:max-w-3xl mx-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-8 text-center border-b border-black">
          Order Received
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Customer Information */}
          <div className="">
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 border-b border-black pb-2 md:pb-4">
              Billing Information
            </h3>
            <div className="mb-1 md:mb-2 break-words">
              <strong>Name:</strong> {billDetails.customerName}
            </div>
            <div className="mb-1 md:mb-2 break-words">
              <strong>Phone:</strong> {billDetails.customerPhone}
            </div>
            <div className="mb-1 md:mb-2 break-words">
              <strong>Email:</strong> {billDetails.customerEmail}
            </div>
            <div className="mb-1 md:mb-2 break-words">
              <strong>Location:</strong> {billDetails.customerLocation}
            </div>
            <div className="mb-1 md:mb-2 break-words">
              <strong>Notes:</strong> {billDetails.customerNote}
            </div>
            <div className="mb-1 md:mb-2">
              <strong>Payment Method:</strong> {billDetails.paymentText}
            </div>
            <div className="mb-1 md:mb-2">
              <strong>Delivery Method:</strong> {billDetails.deliveryText}
            </div>
          </div>

          {/* Product Information */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
              Order Details
            </h3>
            <div className="border-t border-black pt-2 md:pt-4">
              {cartItems.map((item, index) => {
                const quantity = item.quantity;
                return (
                  <div
                    key={index}
                    className="flex justify-between mb-1 md:mb-2"
                  >
                    <span>
                      {item.name} x {quantity}
                    </span>
                    <span>${(item.price * quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-black mt-2 md:mt-4 pt-2 md:pt-4">
              <div className="flex justify-between mb-1 md:mb-2">
                <strong>Subtotal:</strong>
                <span>${cartSubTotal}</span>
              </div>
              <div className="flex justify-between mb-1 md:mb-2">
                <strong>Discount:</strong>
                <span>-${discount}</span>
              </div>
              <div className="flex justify-between mb-1 md:mb-2">
                <strong>Tax:</strong>
                <span>${tax}</span>
              </div>
              <div className="flex justify-between mb-1 md:mb-2">
                <strong>Delivery:</strong>
                <span>$70.00</span>
              </div>
              <div className="flex justify-between mb-1 md:mb-2 border-t border-black pt-2 md:pt-4">
                <strong className="">Grand Total:</strong>
                <span className="font-semibold">${cartItemsTotalPrice}</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="col-span-1 md:col-span-2 text-center">
            <button
              onClick={handleCloseClick}
              className="p-4 rounded-md font-semibold bg-gray-900 text-gray-200 hover:text-gray-900 hover:bg-gray-200 duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashReceiptModal;
