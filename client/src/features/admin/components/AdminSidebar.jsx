
import {
  NavLink,
} from "react-router-dom";


const AdminSidebar = () => {

  const menuItems = [

    {
      label:
        "Dashboard",

      path:
        "/admin",
    },

    {
      label:
        "Products",

      path:
        "/admin/products",
    },

  ];


  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white lg:block">

      <div className="border-b p-6">

        <h1 className="text-xl font-bold">
          Smart Jewelry
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Admin Panel
        </p>

      </div>


      <nav className="space-y-2 p-4">

        {menuItems.map(
          (item) => (

            <NavLink
              key={
                item.path
              }
              to={
                item.path
              }
              end={
                item.path ===
                "/admin"
              }
              className={({
                isActive,
              }) =>
                `block rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >

              {
                item.label
              }

            </NavLink>

          )
        )}

      </nav>

    </aside>
  );
};


export default AdminSidebar;
