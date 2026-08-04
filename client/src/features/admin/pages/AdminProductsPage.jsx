import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getProducts,
  deleteProduct,
} from "../services/productApi";

const AdminProductsPage = () => {

  const [products, setProducts] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadProducts = async () => {

    try {

      setIsLoading(true);
      setError("");

      const response =
        await getProducts();

      setProducts(
        response.data?.products || []
      );

    } catch (error) {

      console.error(error);

      setError(
        error?.response?.data?.message ||
        "Failed to load products."
      );

    } finally {

      setIsLoading(false);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const handleDelete =
    async (productId) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmed) return;

      try {

        await deleteProduct(productId);

        setProducts(previous =>
          previous.filter(
            product =>
              product._id !== productId
          )
        );

      } catch (error) {

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
              Products
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your jewelry products
            </p>

          </div>

          <Link
            to="/admin/products/new"
            className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
          >
            Add Product
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

            Loading Products...

          </div>

        ) : products.length === 0 ? (

          <div className="rounded-xl border bg-white p-10 text-center">

            <h2 className="text-xl font-semibold">

              No Products Found

            </h2>

            <p className="mt-2 text-gray-500">

              Create your first product.

            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-left">
                      Image
                    </th>

                    <th className="px-6 py-4 text-left">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left">
                      Category
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

                <tbody className="divide-y">

                  {products.map(product => (

                    <tr
                      key={product._id}
                      className="hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        {product.image ? (

                        <img
  src={
    product.image
      ? `http://localhost:5000${product.image}`
      : "/placeholder.png"
  }
  alt={product.name}
  className="h-16 w-16 rounded-lg border object-cover"
/>

                        ) : (

                          <div className="flex h-16 w-16 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">

                            No Image

                          </div>

                        )}

                      </td>

                      <td className="px-6 py-4">

                        <div className="font-semibold">

                          {product.name}

                        </div>

                        <div className="max-w-xs truncate text-sm text-gray-500">

                          {product.description}

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        {product.category?.name}

                      </td>

                      <td className="px-6 py-4">

                        {product.price} EGP

                      </td>

                      <td className="px-6 py-4">

                        {product.stock}

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {product.status}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                       <div className="flex gap-4">

  <Link
    to={`/admin/products/${product._id}/edit`}
    className="text-blue-600"
  >
    Edit
  </Link>

  <Link
    to={`/admin/products/${product._id}/variants`}
    className="text-green-600"
  >
    Variants
  </Link>

  <button
    onClick={() => handleDelete(product._id)}
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

          </div>

        )}

      </main>

    </div>

  );

};

export default AdminProductsPage;