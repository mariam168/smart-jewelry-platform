import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getTechnologies,
  deleteTechnology,
} from "../services/technologyApi";

const AdminTechnologiesPage = () => {

  const [technologies, setTechnologies] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadTechnologies =
    async () => {

      try {

        setIsLoading(true);

        setError("");

        const response =
          await getTechnologies();

        setTechnologies(
          response.data?.technologies || []
        );

      } catch (error) {

        console.error(error);

        setError(

          error?.response?.data?.message ||

          "Failed to load technologies."

        );

      } finally {

        setIsLoading(false);

      }

    };

  useEffect(() => {

    loadTechnologies();

  }, []);

  const handleDelete =
    async (technologyId) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this technology?"
        );

      if (!confirmed) return;

      try {

        await deleteTechnology(
          technologyId
        );

        setTechnologies(previous =>

          previous.filter(

            technology =>

              technology._id !== technologyId

          )

        );

      } catch (error) {

        console.error(error);

        alert(

          error?.response?.data?.message ||

          "Failed to delete technology."

        );

      }

    };

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Technologies

            </h1>

            <p className="mt-1 text-sm text-gray-500">

              Manage Smart Jewelry Technologies

            </p>

          </div>

          <Link
            to="/admin/technologies/new"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >

            Add Technology

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

          <div className="py-20 text-center text-gray-500">

            Loading Technologies...

          </div>

        ) : technologies.length === 0 ? (

          <div className="rounded-xl border bg-white p-10 text-center">

            <h2 className="text-xl font-semibold">

              No Technologies Found

            </h2>

            <p className="mt-2 text-gray-500">

              Create your first technology.

            </p>

            <Link
              to="/admin/technologies/new"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
            >

              Add Technology

            </Link>

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <table className="w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left">

                    Icon

                  </th>

                  <th className="px-6 py-4 text-left">

                    Name

                  </th>

                  <th className="px-6 py-4 text-left">

                    Code

                  </th>

                  <th className="px-6 py-4 text-left">

                    Description

                  </th>

                  <th className="px-6 py-4 text-left">

                    Status

                  </th>

                  <th className="px-6 py-4 text-left">

                    Actions

                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {technologies.map((technology) => (

                  <tr
                    key={technology._id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      {technology.icon ? (

                        <img
                          src={
                            technology.icon.startsWith("http")

                              ? technology.icon

                              : `http://localhost:5000${technology.icon}`
                          }

                          alt={technology.name}

                          className="h-16 w-16 rounded-lg border object-cover"
                        />

                      ) : (

                        <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">

                          No Icon

                        </div>

                      )}

                    </td>

                    <td className="px-6 py-4 font-medium">

                      {technology.name}

                    </td>

                    <td className="px-6 py-4">

                      {technology.code}

                    </td>

                    <td className="px-6 py-4 text-gray-600">

                      {technology.description}

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          technology.status === "active"

                            ? "bg-green-100 text-green-700"

                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {technology.status}

                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex gap-4">

                        <Link
                          to={`/admin/technologies/${technology._id}/edit`}
                          className="text-blue-600"
                        >

                          Edit

                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              technology._id
                            )
                          }
                          className="text-red-600"
                        >

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>

  );

};

export default AdminTechnologiesPage;