import { Header } from "../Header";
import { useContext, useMemo } from "react";
import { CartContext } from "../../CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart, removeCartItem, updateQuantity } = cartContext;

  const SHIPPING_PRICE = 2.99;

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.data.price * item.quantity, 0);
  }, [cart]);

  const total = subtotal + SHIPPING_PRICE;

  return (
    <>
      <Header />

      <div className="flex flex-col lg:flex-row gap-10 py-10 mt-20 px-4 lg:px-10 w-full">
        {/* Cart Items */}
        <div className="flex-1 w-full">
          <div className="flex flex-col gap-5 w-full">
            <h2 className="text-2xl font-bold mb-4">
              {cart.length > 0 ? "Your Cart" : "Cart is Empty"}
            </h2>

            {cart.map((cartItem) => (
              <div
                className="cart-item flex items-center w-full gap-4 p-4 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out rounded-lg"
                key={`cartItem-${cartItem.data.id}-${cartItem.size}`}
              >
                {/* Image */}
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
                    <div className="text-gray-700">
                      ${cartItem.data.price.toFixed(2)}
                    </div>
                    {cartItem.size !== "n/a" && (
                      <div className="text-gray-500 text-sm">
                        Size: {cartItem.size}
                      </div>
                    )}
                  </div>

                  {/* Quantity controls + delete */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                      <button
                        className="px-2 py-1 hover:bg-gray-100 transition text-gray-700"
                        onClick={() =>
                          updateQuantity(
                            cartItem.data.id,
                            cartItem.size,
                            cartItem.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 font-semibold min-w-[2rem] text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        className="px-2 py-1 hover:bg-gray-100 transition text-gray-700"
                        onClick={() =>
                          updateQuantity(
                            cartItem.data.id,
                            cartItem.size,
                            cartItem.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      className="text-red-500 hover:text-red-700 transition flex items-center gap-1 text-sm"
                      onClick={() =>
                        removeCartItem(cartItem.data.id, cartItem.size)
                      }
                    >
                      <Trash2 size={14} />
                      Remove
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

          <button
            disabled={cart.length === 0}
            className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
