import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getAdminOrders,
} from "../../orders/services/orderApi";


const AdminOrdersPage = () => {

  const [
    orders,
    setOrders,
  ] = useState([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const loadOrders =
      async () => {

        try {

          const response =
            await getAdminOrders();

          setOrders(
            response.data || []
          );

        } catch (error) {

          setError(
            error?.response?.data?.message ||
              "Unable to load orders"
          );

        } finally {

          setIsLoading(false);

        }

      };


    loadOrders();

  }, []);


  if (isLoading) {
    return (
      <div className="p-8">
        Loading orders...
      </div>
    );
  }


  return (
    <div className="p-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-semibold">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders
          </p>

        </div>

        <div className="rounded-xl bg-gray-100 px-4 py-2">
          Total Orders:{" "}
          <strong>
            {orders.length}
          </strong>
        </div>

      </div>


      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}


      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="border-b bg-gray-50">

              <tr>

                <th className="px-6 py-4">
                  Order
                </th>

                <th className="px-6 py-4">
                  Customer
                </th>

                <th className="px-6 py-4">
                  Date
                </th>

                <th className="px-6 py-4">
                  Total
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map(
                (order) => (

                  <tr
                    key={order._id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 font-medium">
                      {order.orderNumber}
                    </td>


                    <td className="px-6 py-4">
                      {order.user?.email ||
                        "Unknown"}
                    </td>


                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>


                    <td className="px-6 py-4 font-medium">
                      {order.total} EGP
                    </td>


                    <td className="px-6 py-4">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs capitalize">
                        {order.orderStatus}
                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="text-sm font-medium underline"
                      >
                        View
                      </Link>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminOrdersPage;