
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import {
  createProduct,
} from "../services/productApi";


const AddProductPage = () => {

  const navigate =
    useNavigate();


  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      category: "Bracelet",
      price: "",
      stock: "",
      status: "active",
    });


  const [isLoading, setIsLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const handleChange = (
    event
  ) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previousData) => ({
        ...previousData,

        [name]:
          value,
      })
    );
  };



const handleSubmit = async (
  event
) => {

  event.preventDefault();

  setError("");

  setIsLoading(true);


  try {

    const productData = {

      name:
        formData.name,

      description:
        formData.description,

      category:
        formData.category,

      price:
        Number(
          formData.price
        ),

      stock:
        Number(
          formData.stock
        ),

      status:
        formData.status,

    };


    const response =
      await createProduct(
        productData
      );


    console.log(
      "Product Created:",
      response
    );


    navigate(
      "/admin/products"
    );


  } catch (error) {

    console.error(
      "Create Product Error:",
      error
    );


    setError(

      error?.response
        ?.data
        ?.message ||

      "Failed to create product. Please try again."

    );

  } finally {

    setIsLoading(false);

  }
};



  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new jewelry product
            </p>

          </div>


          <Link
            to="/admin/products"
            className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Back to Products
          </Link>

        </div>

      </header>


      {/* Form */}

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

          {error && (

            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">

              {error}

            </div>

          )}


          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >

            {/* Product Name */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Example: Elegant NFC Bracelet"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

            </div>


            {/* Description */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                placeholder="Describe the product..."
                rows="5"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
              />

            </div>


            {/* Category */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              >

                <option value="Bracelet">
                  Bracelet
                </option>

                <option value="Necklace">
                  Necklace
                </option>

                <option value="Ring">
                  Ring
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>


            {/* Price and Stock */}

            <div className="grid gap-6 sm:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={
                    formData.price
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="0.00"
                  min="0"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>


              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={
                    formData.stock
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="0"
                  min="0"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

              </div>

            </div>


            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              >

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>

            </div>


            {/* Actions */}

            <div className="flex items-center justify-end gap-4 border-t pt-6">

              <Link
                to="/admin/products"
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>


              <button
                type="submit"
                disabled={
                  isLoading
                }
                className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {isLoading
                  ? "Creating..."
                  : "Create Product"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
};


export default AddProductPage;
