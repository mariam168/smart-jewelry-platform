import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getProduct,
  getProductVariants,
  deleteVariant,
} from "../services/productApi";

const AdminProductVariantsPage = () => {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [variants, setVariants] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================
  // Load Product + Variants
  // =========================================

  const loadData = async () => {

    try {

      setLoading(true);

      const [
        productResponse,
        variantResponse,
      ] = await Promise.all([

        getProduct(id),

        getProductVariants(id),

      ]);

      setProduct(
        productResponse.data.product
      );

      setVariants(
        variantResponse.data?.variants || []
      );

    } catch (error) {

      console.log(error);

      setError(
        error?.response?.data?.message ||
        "Failed to load variants."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadData();

  }, [id]);

  // =========================================
  // Delete Variant
  // =========================================

  const handleDelete = async (variantId) => {

    const confirmed = window.confirm(
      "Delete this variant?"
    );

    if (!confirmed) return;

    try {

      await deleteVariant(
        variantId
      );

      setVariants(previous =>
        previous.filter(
          variant =>
            variant._id !== variantId
        )
      );

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Delete failed."
      );

    }

  };

  // =========================================
  // Loading
  // =========================================

  if (loading) {

    return (

      <div className="flex min-h-screen items-center justify-center">

        <div className="text-lg font-semibold">

          Loading...

        </div>

      </div>

    );

  }

  return (
        <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Product Variants

            </h1>

            <p className="mt-1 text-sm text-gray-500">

              {product?.name}

            </p>

          </div>

          <div className="flex gap-3">

            <Link
              to="/admin/products"
              className="rounded-lg border px-5 py-3"
            >

              Back

            </Link>

            <Link
              to={`/admin/products/${id}/variants/new`}
              className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
            >

              Add Variant

            </Link>

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">

        {error && (

          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">

            {error}

          </div>

        )}

        {variants.length === 0 ? (

          <div className="rounded-xl border bg-white p-12 text-center">

            <h2 className="text-xl font-semibold">

              No Variants Found

            </h2>

            <p className="mt-2 text-gray-500">

              This product doesn't have any variants yet.

            </p>

            <Link
              to={`/admin/products/${id}/variants/new`}
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
            >

              Create First Variant

            </Link>

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b bg-gray-100">

                  <tr>

                    <th className="px-6 py-4 text-left">

                      Image

                    </th>

                    <th className="px-6 py-4 text-left">

                      SKU

                    </th>

                    <th className="px-6 py-4 text-left">

                      Name

                    </th>

                    <th className="px-6 py-4 text-left">

                      Color

                    </th>

                    <th className="px-6 py-4 text-left">

                      Size

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
                                      {variants.map((variant) => (

                    <tr
                      key={variant._id}
                      className="hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <img
                          src={
                            variant.image
                              ? `http://localhost:5000${variant.image}`
                              : "/placeholder.png"
                          }
                          alt={variant.name}
                          className="h-16 w-16 rounded-lg border object-cover"
                        />

                      </td>

                      <td className="px-6 py-4 font-medium">

                        {variant.sku}

                      </td>

                      <td className="px-6 py-4">

                        {variant.name}

                      </td>

                      <td className="px-6 py-4">

                        {variant.color || "-"}

                      </td>

                      <td className="px-6 py-4">

                        {variant.size || "-"}

                      </td>

                      <td className="px-6 py-4">

                        {variant.price} EGP

                      </td>

                      <td className="px-6 py-4">

                        {variant.stock}

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            variant.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >

                          {variant.isActive
                            ? "Active"
                            : "Inactive"}

                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-4">

                          <Link
                            to={`/admin/variants/${variant._id}/edit`}
                            className="text-blue-600 hover:text-blue-800"
                          >

                            Edit

                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(variant._id)
                            }
                            className="text-red-600 hover:text-red-800"
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

export default AdminProductVariantsPage;
                
                