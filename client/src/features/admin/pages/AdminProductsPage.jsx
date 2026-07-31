
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

  const [
    products,
    setProducts,
  ] = useState([]);


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const loadProducts =
    async () => {

      try {

        setIsLoading(true);

        setError("");


        const response =
          await getProducts();


        setProducts(
          response.data.products
        );


      } catch (error) {

        console.error(
          error
        );


        setError(
          error?.response
            ?.data
            ?.message ||

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


      if (!confirmed) {
        return;
      }


      try {

        await deleteProduct(
          productId
        );


        setProducts(
          (previousProducts) =>
            previousProducts.filter(
              (product) =>
                product._id !==
                productId
            )
        );


      } catch (error) {

        console.error(
          error
        );


        alert(
          error?.response
            ?.data
            ?.message ||

          "Failed to delete product."
        );

      }
    };


  return (

    <div className="min-h-screen bg-gray-50">


      {/* Header */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your Smart Jewelry products
            </p>

          </div>


          <Link
            to="/admin/products/new"
            className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Add Product
          </Link>

        </div>

      </header>


      {/* Content */}

      <main className="mx-auto max-w-7xl px-6 py-10">


        {error && (

          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">

            {error}

          </div>

        )}


        {isLoading ? (

          <div className="py-20 text-center text-gray-500">

            Loading products...

          </div>

        ) : products.length === 0 ? (

          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">

            <h2 className="text-xl font-semibold text-gray-900">
              No Products Yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Start by adding your first jewelry product.
            </p>


            <Link
              to="/admin/products/new"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white"
            >
              Add Your First Product
            </Link>

          </div>

        ) : (

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b bg-gray-50">

                  <tr>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Product
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Category
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Price
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y">

                  {products.map(
                    (product) => (

                      <tr
                        key={
                          product._id
                        }
                        className="hover:bg-gray-50"
                      >

                        <td className="px-6 py-4">

                          <div className="font-medium text-gray-900">
                            {
                              product.name
                            }
                          </div>

                          <div className="mt-1 max-w-xs truncate text-sm text-gray-500">
                            {
                              product.description
                            }
                          </div>

                        </td>


                        <td className="px-6 py-4 text-sm text-gray-600">

                          {
                            product.category
                          }

                        </td>


                        <td className="px-6 py-4 text-sm font-medium text-gray-900">

                          $
                          {
                            product.price
                          }

                        </td>


                        <td className="px-6 py-4 text-sm text-gray-600">

                          {
                            product.stock
                          }

                        </td>


                        <td className="px-6 py-4">

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">

                            {
                              product.status
                            }

                          </span>

                        </td>


                        <td className="px-6 py-4">

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )}

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
