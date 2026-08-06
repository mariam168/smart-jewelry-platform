import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getSmartUnits,
  deleteSmartUnit,
} from "../services/smartUnitApi";

const AdminSmartUnitsPage = () => {

  const [
    smartUnits,
    setSmartUnits,
  ] = useState([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadSmartUnits =
    async () => {

      try {

        setIsLoading(true);

        const response =
          await getSmartUnits();

        setSmartUnits(
          response.data?.smartUnits || []
        );

      }

      catch (error) {

        console.error(error);

        setError(
          error?.response?.data?.message ||
          "Failed to load Smart Units."
        );

      }

      finally {

        setIsLoading(false);

      }

    };

  useEffect(() => {

    loadSmartUnits();

  }, []);

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete Smart Unit?"
        );

      if (!confirmed) return;

      try {

        await deleteSmartUnit(id);

        setSmartUnits(previous =>
          previous.filter(
            smartUnit =>
              smartUnit._id !== id
          )
        );

      }

      catch (error) {

        alert(
          error?.response?.data?.message ||
          "Delete failed."
        );

      }

    };

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">
              Smart Units
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage Smart Units
            </p>

          </div>

          <Link
            to="/admin/smart-units/new"
            className="rounded-lg bg-black px-5 py-3 font-semibold text-white"
          >
            Add Smart Unit
          </Link>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        {error && (

          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">

            {error}

          </div>

        )}

        {isLoading ? (

          <div className="py-20 text-center">

            Loading...

          </div>

        ) : smartUnits.length === 0 ? (

          <div className="rounded-xl border bg-white p-10 text-center">

            No Smart Units Found

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border bg-white shadow">

            <table className="w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {smartUnits.map(
                  smartUnit => (

                    <tr
                      key={smartUnit._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <div className="font-semibold">

                          {smartUnit.name}

                        </div>

                        <div className="text-sm text-gray-500">

                          {smartUnit.description}

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        {smartUnit.price} EGP

                      </td>

                      <td className="px-6 py-4">

                        {smartUnit.stock}

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            smartUnit.status ===
                            "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {smartUnit.status}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-4">

                          <Link
                            to={`/admin/smart-units/${smartUnit._id}/edit`}
                            className="text-blue-600"
                          >

                            Edit

                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                smartUnit._id
                              )
                            }
                            className="text-red-600"
                          >

                            Delete

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>

  );

};

export default AdminSmartUnitsPage;