import { Header } from "../Header";
import { useContext, useMemo } from "react";
import { CartContext } from "../../CartContext";

export default function CheckoutPage() {
  const { cart, removeCartItem } = useContext(CartContext);

  const SHIPPING_PRICE = 2.99;

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.data.price * item.quantity, 0);
  }, [cart]);

  const total = subtotal + SHIPPING_PRICE;

  return (
    <>
      <Header />

      {/* Parent container - stacks on mobile, row on large screens */}
      <div className="flex flex-col lg:flex-row gap-10 py-10 mt-20 px-4 lg:px-10 w-full">

        {/* Cart */}
        <div className="flex-1 w-full">
          <div className="flex flex-col gap-5 w-full">
            <h2 className="text-2xl font-bold mb-4">
              {cart.length > 0 ? "Your Cart" : "Cart is Empty"}
            </h2>

            {cart.map((cartItem) => (
              <div
                className="cart-item flex items-center w-full gap-4 p-4 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg shadow "
                key={`cartItem-${cartItem.data.id}-${cartItem.size}`}
              >
                {/* Image scales properly */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                  <img
                    src={cartItem.data.image}
                    alt={cartItem.data.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex justify-between items-center flex-1 gap-4">
                  <div className="flex flex-col">
                    <div className="font-bold text-lg">{cartItem.data.title}</div>
                    <div className="text-gray-700">${cartItem.data.price.toFixed(2)}</div>
                    {cartItem.size !== "n/a" && (
                      <div className="text-gray-700">Size: {cartItem.size}</div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1 text-sm sm:text-base">
                    <div>Qty: {cartItem.quantity}</div>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() =>
                        removeCartItem(cartItem.data.id, cartItem.size)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg h-auto">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="flex flex-col gap-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${SHIPPING_PRICE.toFixed(2)}</span>
            </div>

            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}