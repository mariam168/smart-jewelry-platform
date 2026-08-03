import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getCategories,
  deleteCategory,
} from "../services/categoryApi";

const AdminCategoriesPage = () => {

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const loadCategories =
    async () => {

      try {

        setIsLoading(true);

        setError("");

        const response =
          await getCategories();

        setCategories(
          response.data?.categories || []
        );

      } catch (error) {

        console.error(error);

        setError(

          error?.response
            ?.data
            ?.message ||

          "Failed to load categories."

        );

      } finally {

        setIsLoading(false);

      }

    };

  useEffect(() => {

    loadCategories();

  }, []);

  const handleDelete =
    async (categoryId) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this category?"
        );

      if (!confirmed) {

        return;

      }

      try {

        await deleteCategory(
          categoryId
        );

        setCategories(
          (previousCategories) =>
            previousCategories.filter(
              (category) =>
                category._id !== categoryId
            )
        );

      } catch (error) {

        console.error(error);

        alert(

          error?.response
            ?.data
            ?.message ||

          "Failed to delete category."

        );

      }

    };

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Categories
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage product categories
            </p>

          </div>

          <Link
            to="/admin/categories/new"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Add Category
          </Link>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        {error && (

          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">

            {error}

          </div>

        )}

        {isLoading ? (

          <div className="py-20 text-center text-gray-500">

            Loading Categories...

          </div>

        ) : categories.length === 0 ? (

          <div className="rounded-xl border bg-white p-10 text-center">

            <h2 className="text-xl font-semibold">
              No Categories Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Create your first category.
            </p>

            <Link
              to="/admin/categories/new"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
            >
              Add Category
            </Link>

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <table className="w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Image
                  </th>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left">
                    Products
                  </th>

                  <th className="px-6 py-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y">

                {categories.map((category) => (

                  <tr
                    key={category._id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      {category.image ? (

                        <img
                          src={
                            category.image.startsWith("http")
                              ? category.image
                              : `http://localhost:5000${category.image}`
                          }
                          alt={category.name}
                          className="h-16 w-16 rounded-lg border object-cover"
                        />

                      ) : (

                        <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">

                          No Image

                        </div>

                      )}

                    </td>

                    <td className="px-6 py-4 font-medium">
                      {category.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {category.description}
                    </td>

                    <td className="px-6 py-4">
                      {category.productCount || 0}
                    </td>

                    <td className="space-x-4 px-6 py-4">

                      <Link
                        to={`/admin/categories/${category._id}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(category._id)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>

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

export default AdminCategoriesPage;