import { useContext } from "react";

import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

const CartDrawer = () => {
  const {
    cartItems,

    cartTotal,

    isCartOpen,

    closeCart,

    updateQuantity,

    removeFromCart,
  } = useContext(CartContext);

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}

      <button
        type="button"
        onClick={closeCart}
        className="absolute inset-0 bg-black/40"
        aria-label="Close cart"
      />

      {/* Drawer */}

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-semibold">Your Cart</h2>

          <button
            type="button"
            onClick={closeCart}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Items */}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-gray-500">Your cart is empty.</p>

              <Link
                to="/shop"
                onClick={closeCart}
                className="mt-5 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  {/* Image */}

                  <div className="h-20 w-20 flex-shrink-0 rounded-lg bg-gray-100" />

                  {/* Info */}

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <h3 className="text-sm font-semibold">{item.name}</h3>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <p className="mt-2 text-sm text-gray-500">${item.price}</p>

                    {/* Quantity */}

                    <div className="mt-3 flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="h-8 w-8 border border-gray-300"
                      >
                        −
                      </button>

                      <span className="flex h-8 w-10 items-center justify-center border-y border-gray-300 text-sm">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="h-8 w-8 border border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-medium">Subtotal</span>

              <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
            </div>

            <Link
              to="/cart"
              onClick={closeCart}
              className="block w-full rounded-lg bg-black px-6 py-4 text-center text-sm font-semibold text-white hover:bg-gray-800"
            >
              View Cart
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
