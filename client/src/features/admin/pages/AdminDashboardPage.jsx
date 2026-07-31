
const AdminDashboardPage = () => {

  const stats = [

    {
      title:
        "Total Products",

      value:
        "0",
    },

    {
      title:
        "Total Orders",

      value:
        "0",
    },

    {
      title:
        "Total Customers",

      value:
        "0",
    },

    {
      title:
        "Pending Orders",

      value:
        "0",
    },

  ];


  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-2xl font-semibold">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome to your Smart Jewelry administration panel.
        </p>

      </div>


      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map(
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
                {
                  stat.value
                }
              </p>

            </div>

          )
        )}

      </div>


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
