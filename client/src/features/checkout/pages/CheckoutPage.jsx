
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
  const navigate = useNavigate();

  const {
    cart,
    isLoading: cartLoading,
  } = useCart();

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    formValues,
    setFormValues,
  ] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    country: "Egypt",
    paymentMethod:
      "cash_on_delivery",
  });


  const items =
    cart?.items || [];


  // ==========================================
  // CALCULATE SUBTOTAL
  // ==========================================

  const subtotal =
    items.reduce(
      (total, item) => {
        return (
          total +
          (item.product?.price || 0) *
            item.quantity
        );
      },
      0
    );


  // ==========================================
  // SHIPPING COST
  // ==========================================

  const shippingCost =
    subtotal >= 1000
      ? 0
      : 50;


  // ==========================================
  // TOTAL
  // ==========================================

  const total =
    subtotal +
    shippingCost;


  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

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


  // ==========================================
  // VALIDATE FORM
  // ==========================================

  const validateForm = () => {
    if (
      !formValues.firstName.trim()
    ) {
      return "First name is required";
    }

    if (
      !formValues.lastName.trim()
    ) {
      return "Last name is required";
    }

    if (
      !formValues.phone.trim()
    ) {
      return "Phone number is required";
    }

    if (
      !formValues.address.trim()
    ) {
      return "Address is required";
    }

    if (
      !formValues.city.trim()
    ) {
      return "City is required";
    }

    return "";
  };


  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const response =
        await createOrder({
          shippingAddress: {
            firstName:
              formValues.firstName.trim(),

            lastName:
              formValues.lastName.trim(),

            phone:
              formValues.phone.trim(),

            address:
              formValues.address.trim(),

            city:
              formValues.city.trim(),

            country:
              formValues.country.trim(),
          },

          paymentMethod:
            formValues.paymentMethod,
        });


      // Backend response:
      // {
      //   success: true,
      //   message: "...",
      //   data: order
      // }

      const order =
        response.data;


     navigate(`/order-success/${response.data._id}`, {
  state: {
    order: response.data,
  },
});

    } catch (error) {
      console.error(
        "Create Order Error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Unable to create order. Please try again."
      );

    } finally {
      setSubmitting(false);
    }
  };


  // ==========================================
  // CART LOADING
  // ==========================================

  if (cartLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }


  // ==========================================
  // EMPTY CART
  // ==========================================

  if (
    items.length === 0
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">

          <h1 className="text-3xl font-semibold">
            Your cart is empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some products before checkout.
          </p>

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


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-4xl font-semibold">
          Checkout
        </h1>


        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-3"
        >

          {/* ==================================
              SHIPPING INFORMATION
          ================================== */}

          <div className="rounded-xl border bg-white p-6 lg:col-span-2">

            <h2 className="text-xl font-semibold">
              Shipping Information
            </h2>


            {error && (
              <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}


            <div className="mt-6 grid gap-5">

              {/* FIRST NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name
                </label>

                <input
                  name="firstName"
                  value={
                    formValues.firstName
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                  placeholder="Enter your first name"
                />
              </div>


              {/* LAST NAME */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name
                </label>

                <input
                  name="lastName"
                  value={
                    formValues.lastName
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                  placeholder="Enter your last name"
                />
              </div>


              {/* PHONE */}

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


              {/* ADDRESS */}

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


              {/* CITY */}

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


              {/* COUNTRY */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Country
                </label>

                <input
                  name="country"
                  value={
                    formValues.country
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />
              </div>


              {/* PAYMENT */}

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


          {/* ==================================
              ORDER SUMMARY
          ================================== */}

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
                      {item.product?.name}
                      {" × "}
                      {item.quantity}
                    </span>

                    <span>
                      {(item.product?.price || 0) *
                        item.quantity}
                      {" "}EGP
                    </span>

                  </div>
                )
              )}

            </div>


            <div className="mt-6 space-y-3 border-t pt-5">

              <div className="flex justify-between">
                <span>
                  Subtotal
                </span>

                <span>
                  {subtotal} EGP
                </span>
              </div>


              <div className="flex justify-between">
                <span>
                  Shipping
                </span>

                <span>
                  {shippingCost === 0
                    ? "Free"
                    : `${shippingCost} EGP`}
                </span>
              </div>


              <div className="flex justify-between border-t pt-3 text-lg font-semibold">

                <span>
                  Total
                </span>

                <span>
                  {total} EGP
                </span>

              </div>

            </div>


            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
