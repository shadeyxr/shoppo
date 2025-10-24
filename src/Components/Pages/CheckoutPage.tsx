import { Header } from "../Header";

export function CheckoutPage() {
  return (
    <>
      <Header />

      <div className="flex gap-10 py-10 mt-20">
        <div className="flex flex-3 ml-5 w-full">
          {/* Your Cart */}
          <div className="flex flex-col gap-5 mx-5 my-5 w-full">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <div className="cart-item flex items-center w-full gap-4 p-4 bg-gray-100 rounded-lg shadow">
              {/* Image */}
              <div className="w-24 h-24">
                <img
                  src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
                  alt="Product"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info and Actions */}
              <div className="flex justify-between items-center flex-1">
                {/* Name & Price */}
                <div className="flex flex-col justify-center">
                  <div className="font-bold text-lg">Product Name</div>
                  <div className="text-gray-700">$25.99</div>
                </div>

                {/* Quantity & Delete */}
                <div className="flex flex-col justify-center items-end gap-1">
                  <div>Qty: 1</div>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col flex-2 mr-5 w-full bg-white p-6 rounded-lg shadow-lg h-[300px]">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="flex flex-col gap-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$45.99</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$2.99</span>
            </div>
            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$48.98</span>
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
