import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getAdminOrderById,
  updateOrderStatus,
} from "../../orders/services/orderApi";


const statuses = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];


const AdminOrderDetailsPage = () => {

  const {
    id,
  } = useParams();


  const [
    order,
    setOrder,
  ] = useState(null);

  const [
    status,
    setStatus,
  ] = useState("");


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  const [
    isUpdating,
    setIsUpdating,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const loadOrder =
      async () => {

        try {

          const response =
            await getAdminOrderById(id);

          setOrder(
            response.data
          );

          setStatus(
            response.data.orderStatus
          );

        } catch (error) {

          setError(
            error?.response?.data?.message ||
              "Unable to load order"
          );

        } finally {

          setIsLoading(false);

        }

      };


    loadOrder();

  }, [id]);


  const handleStatusUpdate =
    async () => {

      try {

        setIsUpdating(true);

        const response =
          await updateOrderStatus(
            id,
            status
          );

        setOrder(
          response.data
        );

      } catch (error) {

        setError(
          error?.response?.data?.message ||
            "Unable to update status"
        );

      } finally {

        setIsUpdating(false);

      }

    };


  if (isLoading) {
    return (
      <div className="p-8">
        Loading order...
      </div>
    );
  }


  if (!order) {
    return (
      <div className="p-8 text-red-600">
        {error || "Order not found"}
      </div>
    );
  }


  return (
    <div className="p-6">

      <Link
        to="/admin/orders"
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back to Orders
      </Link>


      <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-2xl font-semibold">
            {order.orderNumber}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(
              order.createdAt
            ).toLocaleString()}
          </p>

        </div>


        <div className="flex gap-3">

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
            className="rounded-xl border px-4 py-3"
          >

            {statuses.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>


          <button
            onClick={
              handleStatusUpdate
            }
            disabled={isUpdating}
            className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            {isUpdating
              ? "Updating..."
              : "Update Status"}
          </button>

        </div>

      </div>


      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}


      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        {/* Order Items */}

        <div className="rounded-2xl border bg-white p-6 lg:col-span-2">

          <h2 className="text-xl font-semibold">
            Order Items
          </h2>


          <div className="mt-6 space-y-5">

            {order.items.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex gap-4 border-b pb-5"
                >

                  <div className="h-20 w-20 rounded-xl bg-gray-100 overflow-hidden">

                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    )}

                  </div>


                  <div className="flex-1">

                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity:{" "}
                      {item.quantity}
                    </p>

                  </div>


                  <div className="font-semibold">
                    {item.price *
                      item.quantity}{" "}
                    EGP
                  </div>

                </div>

              )
            )}

          </div>


          <div className="mt-6 ml-auto max-w-sm space-y-3">

            <div className="flex justify-between">
              <span>
                Subtotal
              </span>

              <span>
                {order.subtotal} EGP
              </span>
            </div>


            <div className="flex justify-between">
              <span>
                Shipping
              </span>

              <span>
                {order.shippingCost} EGP
              </span>
            </div>


            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>
                Total
              </span>

              <span>
                {order.total} EGP
              </span>
            </div>

          </div>

        </div>


        {/* Customer Information */}

        <div className="space-y-6">

          <div className="rounded-2xl border bg-white p-6">

            <h2 className="text-lg font-semibold">
              Customer
            </h2>

            <p className="mt-4 text-gray-600">
              {order.user?.email}
            </p>

          </div>


          <div className="rounded-2xl border bg-white p-6">

            <h2 className="text-lg font-semibold">
              Shipping Address
            </h2>


            <div className="mt-4 space-y-1 text-gray-600">

              <p>
                {
                  order.shippingAddress
                    .firstName
                }{" "}
                {
                  order.shippingAddress
                    .lastName
                }
              </p>

              <p>
                {
                  order.shippingAddress
                    .phone
                }
              </p>

              <p>
                {
                  order.shippingAddress
                    .address
                }
              </p>

              <p>
                {
                  order.shippingAddress
                    .city
                }
              </p>

              <p>
                {
                  order.shippingAddress
                    .country
                }
              </p>

            </div>

          </div>


          <div className="rounded-2xl border bg-white p-6">

            <h2 className="text-lg font-semibold">
              Payment
            </h2>

            <p className="mt-4 capitalize text-gray-600">
              {order.paymentMethod}
            </p>

            <p className="mt-2 capitalize text-gray-600">
              Status:{" "}
              {order.paymentStatus}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminOrderDetailsPage;