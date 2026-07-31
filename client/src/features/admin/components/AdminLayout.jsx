
import {
  Outlet,
} from "react-router-dom";

import AdminSidebar from "./AdminSidebar";


const AdminLayout = () => {

  return (
    <div className="min-h-screen bg-gray-50">

      <AdminSidebar />

      <main className="min-h-screen lg:ml-64">

        <header className="flex h-16 items-center justify-between border-b bg-white px-6">

          <h2 className="font-semibold">
            Admin Dashboard
          </h2>

          <span className="text-sm text-gray-500">
            Administrator
          </span>

        </header>


        <div className="p-6">

          <Outlet />

        </div>

      </main>

    </div>
  );
};


export default AdminLayout;
