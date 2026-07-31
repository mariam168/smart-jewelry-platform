
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useCart,
} from "../../../context/CartContext";

const CartPage = () => {
  const navigate =
    useNavigate();

  const {
    cart,
    isLoading,
    updateCartItem,
    removeCartItem,
    clearCart,
  } = useCart();


  const items =
    cart?.items || [];


  const subtotal =
    items.reduce(
      (total, item) => {
        const price =
          item.product?.price || 0;

        return (
          total +
          price *
            item.quantity
        );
      },
      0
    );


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading cart...
        </p>
      </div>
    );
  }


  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">

          <h1 className="text-4xl font-semibold text-gray-900">
            Your Cart
          </h1>

          <p className="mt-4 text-gray-500">
            Your shopping cart is empty.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-lg bg-black px-8 py-3 text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>

        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <h1 className="text-4xl font-semibold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your selected jewelry
            before checkout.
          </p>

        </div>


        <div className="grid gap-8 lg:grid-cols-3">

          {/* ITEMS */}

          <div className="space-y-4 lg:col-span-2">

            {items.map(
              (item) => {

                const product =
                  item.product;

                const image =
                  product?.images?.[0];

                return (
                  <div
                    key={
                      product?._id
                    }
                    className="flex gap-5 rounded-xl border bg-white p-5"
                  >

                    {/* IMAGE */}

                    <Link
                      to={`/shop/products/${product?._id}`}
                      className="h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100"
                    >
                      {image && (
                        <img
                          src={image}
                          alt={
                            product?.name
                          }
                          className="h-full w-full object-cover"
                        />
                      )}
                    </Link>


                    {/* INFO */}

                    <div className="flex flex-1 flex-col">

                      <div className="flex justify-between gap-4">

                        <div>

                          <Link
                            to={`/shop/products/${product?._id}`}
                            className="text-lg font-semibold text-gray-900 hover:underline"
                          >
                            {
                              product?.name
                            }
                          </Link>

                          <p className="mt-2 text-gray-600">
                            {
                              product?.price
                            }{" "}
                            EGP
                          </p>

                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            removeCartItem(
                              product?._id
                            )
                          }
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>


                      {/* QUANTITY */}

                      <div className="mt-auto flex items-center gap-3">

                        <button
                          type="button"
                          disabled={
                            item.quantity <=
                            1
                          }
                          onClick={() =>
                            updateCartItem(
                              product?._id,
                              item.quantity -
                                1
                            )
                          }
                          className="h-9 w-9 rounded border disabled:opacity-40"
                        >
                          -
                        </button>

                        <span className="min-w-8 text-center">
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateCartItem(
                              product?._id,
                              item.quantity +
                                1
                            )
                          }
                          className="h-9 w-9 rounded border"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}


            <button
              type="button"
              onClick={clearCart}
              className="text-sm text-red-600 hover:underline"
            >
              Clear Cart
            </button>

          </div>


          {/* SUMMARY */}

          <aside className="h-fit rounded-xl border bg-white p-6">

            <h2 className="text-xl font-semibold">
              Order Summary
            </h2>


            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal
                </span>

                <span>
                  {subtotal} EGP
                </span>
              </div>


              <div className="flex justify-between text-gray-600">
                <span>
                  Shipping
                </span>

                <span>
                  Free
                </span>
              </div>


              <div className="border-t pt-4">

                <div className="flex justify-between text-lg font-semibold">

                  <span>
                    Total
                  </span>

                  <span>
                    {subtotal} EGP
                  </span>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/checkout"
                  )
                }
                className="w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-800"
              >
                Proceed to Checkout
              </button>


              <Link
                to="/shop"
                className="block text-center text-sm text-gray-600 hover:underline"
              >
                Continue Shopping
              </Link>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
};

export default CartPage;

