import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../services/dashboardApi";


const AdminDashboardPage = () => {

  const [
    stats,
    setStats,
  ] = useState({

    totalProducts: 0,

    totalOrders: 0,

    totalCustomers: 0,

    pendingOrders: 0,

  });


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const loadStats =
      async () => {

        try {

          setIsLoading(true);

          setError("");


          const response =
            await getDashboardStats();


          setStats(
            response.data
          );


        } catch (error) {

          console.error(
            "Dashboard Stats Error:",
            error
          );


          setError(

            error?.response
              ?.data
              ?.message ||

            "Failed to load dashboard statistics."

          );

        } finally {

          setIsLoading(false);

        }

      };


    loadStats();

  }, []);


  const dashboardStats = [

    {
      title:
        "Total Products",

      value:
        stats.totalProducts,

    },

    {
      title:
        "Total Orders",

      value:
        stats.totalOrders,

    },

    {
      title:
        "Total Customers",

      value:
        stats.totalCustomers,

    },

    {
      title:
        "Pending Orders",

      value:
        stats.pendingOrders,

    },

  ];


  return (

    <div className="space-y-8">


      {/* Header */}

      <div>

        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Smart Jewelry administration panel.
        </p>

      </div>


      {/* Error */}

      {error && (

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">

          {error}

        </div>

      )}


      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {dashboardStats.map(
          (stat) => (

            <div
              key={
                stat.title
              }
              className="rounded-xl border bg-white p-6"
            >

              <p className="text-sm text-gray-500">
                {
                  stat.title
                }
              </p>


              <p className="mt-3 text-3xl font-semibold">

                {isLoading
                  ? "..."
                  : stat.value}

              </p>

            </div>

          )
        )}

      </div>


      {/* Welcome */}

      <div className="rounded-xl border bg-white p-8">

        <h2 className="text-lg font-semibold">
          Welcome, Admin 👋
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          From here you can manage your Smart Jewelry products and orders.
        </p>

      </div>


    </div>

  );

};


export default AdminDashboardPage;