import { Link, useLocation, useParams } from "react-router-dom";

const OrderSuccessPage = () => {
const { orderId } = useParams();
const location = useLocation();

const order = location.state?.order;

return ( <main className="min-h-screen bg-gray-50 px-6 py-16"> <div className="mx-auto max-w-2xl"> <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">

```
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl text-green-600">
          ✓
        </span>
      </div>

      <h1 className="mt-6 text-3xl font-semibold">
        Order Placed Successfully!
      </h1>

      <p className="mt-3 text-gray-600">
        Thank you for your order. Your order has been received successfully.
      </p>

      {order?.orderNumber && (
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Order Number
          </p>

          <p className="mt-1 text-lg font-semibold">
            {order.orderNumber}
          </p>
        </div>
      )}

      {order?.total !== undefined && (
        <div className="mt-4 flex justify-between border-t pt-4">
          <span className="text-gray-600">
            Total
          </span>

          <span className="font-semibold">
            {order.total} EGP
          </span>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

        <Link
          to={`/account/orders/${orderId}`}
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          View Order
        </Link>

        <Link
          to="/shop"
          className="rounded-lg border border-gray-300 px-6 py-3 text-gray-800 transition hover:bg-gray-50"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  </div>
</main>


);
};

export default OrderSuccessPage;
