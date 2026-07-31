
import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useCart,
} from "../../../context/CartContext";

import {
  createOrder,
} from "../services/orderApi";


const CheckoutPage = () => {

  const navigate =
    useNavigate();

  const {
    cart,
    isLoading,
  } = useCart();


  const items =
    cart?.items || [];


  const [
    formValues,
    setFormValues,
  ] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod:
      "cash_on_delivery",
  });


  const [
    error,
    setError,
  ] = useState("");


  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  const subtotal =
    items.reduce(
      (total, item) => {
        return (
          total +
          (item.product?.price ||
            0) *
            item.quantity
        );
      },
      0
    );


  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;

    setFormValues(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setError("");
  };


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      if (
        !formValues.fullName.trim() ||
        !formValues.phone.trim() ||
        !formValues.address.trim() ||
        !formValues.city.trim()
      ) {
        setError(
          "Please complete all shipping information."
        );

        return;
      }


      if (
        items.length === 0
      ) {
        setError(
          "Your cart is empty."
        );

        return;
      }


      try {

        setSubmitting(true);

        setError("");


        const response =
          await createOrder(
            formValues
          );


        const order =
          response.data;


        navigate(
          `/checkout/success/${order._id}`,
          {
            state: {
              order,
            },
          }
        );

      } catch (error) {

        console.error(
          "Create Order Error:",
          error
        );

        setError(
          error?.response?.data
            ?.message ||
            "Unable to create your order."
        );

      } finally {

        setSubmitting(false);

      }
    };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }


  if (
    items.length === 0
  ) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-3xl font-semibold">
            Your cart is empty
          </h1>

          <Link
            to="/shop"
            className="mt-6 inline-block rounded-lg bg-black px-8 py-3 text-white"
          >
            Go Shopping
          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-4xl font-semibold">
          Checkout
        </h1>


        <form
          onSubmit={
            handleSubmit
          }
          className="grid gap-8 lg:grid-cols-3"
        >

          {/* SHIPPING */}

          <div className="rounded-xl border bg-white p-6 lg:col-span-2">

            <h2 className="text-xl font-semibold">
              Shipping Information
            </h2>


            {error && (
              <div className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}


            <div className="mt-6 grid gap-5">

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  name="fullName"
                  value={
                    formValues.fullName
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                  placeholder="Enter your full name"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  Phone
                </label>

                <input
                  name="phone"
                  value={
                    formValues.phone
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                  placeholder="Enter your phone number"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  Address
                </label>

                <textarea
                  name="address"
                  value={
                    formValues.address
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                  placeholder="Enter your address"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium">
                  City
                </label>

                <input
                  name="city"
                  value={
                    formValues.city
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                  placeholder="Enter your city"
                />

              </div>


              <div>

                <label className="mb-3 block text-sm font-medium">
                  Payment Method
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={
                      formValues.paymentMethod ===
                      "cash_on_delivery"
                    }
                    onChange={
                      handleChange
                    }
                  />

                  <span>
                    Cash on Delivery
                  </span>

                </label>

              </div>

            </div>

          </div>


          {/* SUMMARY */}

          <aside className="h-fit rounded-xl border bg-white p-6">

            <h2 className="text-xl font-semibold">
              Your Order
            </h2>


            <div className="mt-6 space-y-4">

              {items.map(
                (item) => (

                  <div
                    key={
                      item.product?._id
                    }
                    className="flex justify-between gap-4 text-sm"
                  >

                    <span>
                      {
                        item.product
                          ?.name
                      }{" "}
                      ×{" "}
                      {
                        item.quantity
                      }
                    </span>

                    <span>
                      {
                        (item.product
                          ?.price ||
                          0) *
                          item.quantity
                      }{" "}
                      EGP
                    </span>

                  </div>

                )
              )}

            </div>


            <div className="mt-6 border-t pt-5">

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
              type="submit"
              disabled={
                submitting
              }
              className="mt-6 w-full rounded-lg bg-black py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Placing Order..."
                : "Place Order"}
            </button>

          </aside>

        </form>

      </div>

    </main>
  );
};

export default CheckoutPage;
