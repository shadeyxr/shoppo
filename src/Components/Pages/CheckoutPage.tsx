import { Header } from "../Header";
import { useContext } from "react";
import { CartContext } from "../../CartContext";

export function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const shippingPrice = 2.99;

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart } = cartContext;

  function calculateSubTotal() {
    try {
      if (!cart) {
        throw new Error("cart doesn't exist");
      }

      let subTotal = 0;
      cart.forEach((cartItem) => {
        subTotal += cartItem.data.price * cartItem.quantity;
      });
      return subTotal;
    } catch (error) {
      if (error instanceof Error) {
        console.error("calculation error", error.message);
      } else {
        console.error("unknown error");
      }
      return 0;
    }
  }

  return (
    <>
      <Header />

      <div className="flex gap-10 py-10 mt-20">
        <div className="flex flex-3 ml-5 w-full">
          {/* Your Cart */}
          <div className="flex flex-col gap-5 mx-5 my-5 w-full">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.map((cartItem) => {
              return (
                <div
                  className="cart-item flex items-center w-full gap-4 p-4 bg-gray-100 rounded-lg shadow"
                  key={`cartItem-${cartItem.data.id}`}
                >
                  {/* Image */}
                  <div className="w-24 h-24">
                    <img
                      src={cartItem.data.image}
                      alt="Product"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info and Actions */}
                  <div className="flex justify-between items-center flex-1">
                    {/* Name & Price */}
                    <div className="flex flex-col justify-center">
                      <div className="font-bold text-lg">
                        {cartItem.data.title}
                      </div>
                      <div className="text-gray-700">
                        ${cartItem.data.price.toFixed(2)}
                      </div>
                    </div>

                    {/* Quantity & Delete */}
                    <div className="flex flex-col justify-center items-end gap-1">
                      <div>Qty: {cartItem.quantity}</div>
                      <button className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col flex-2 mr-5 w-full bg-white p-6 rounded-lg shadow-lg h-[300px]">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="flex flex-col gap-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shippingPrice}</span>
            </div>
            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${calculateSubTotal() + shippingPrice}</span>
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
