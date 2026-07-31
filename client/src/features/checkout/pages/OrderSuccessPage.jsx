
import {
  Link,
  useLocation,
} from "react-router-dom";


const OrderSuccessPage = () => {

  const location =
    useLocation();

  const order =
    location.state?.order;


  return (
    <main className="min-h-screen bg-gray-50 px-6 py-20">

      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-10 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
          ✓
        </div>


        <h1 className="mt-6 text-3xl font-semibold">
          Order Placed Successfully
        </h1>


        <p className="mt-4 text-gray-500">
          Thank you for your order.
          We have received your order
          successfully.
        </p>


        {order && (
          <div className="mt-8 rounded-lg bg-gray-50 p-5 text-left">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Order ID
              </span>

              <span className="font-medium">
                {order._id}
              </span>

            </div>


            <div className="mt-4 flex justify-between">

              <span className="text-gray-500">
                Total
              </span>

              <span className="font-semibold">
                {order.total} EGP
              </span>

            </div>


            <div className="mt-4 flex justify-between">

              <span className="text-gray-500">
                Payment
              </span>

              <span>
                Cash on Delivery
              </span>

            </div>

          </div>
        )}


        <div className="mt-8 flex flex-col gap-3">

          <Link
            to="/shop"
            className="rounded-lg bg-black py-3 text-white"
          >
            Continue Shopping
          </Link>

          <Link
            to="/account"
            className="rounded-lg border py-3"
          >
            Go to My Account
          </Link>

        </div>

      </div>

    </main>
  );
};

export default OrderSuccessPage;
