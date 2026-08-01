
import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProduct,
  updateProduct,
} from "../services/productApi";

import {
  getCategories,
} from "../services/categoryApi";


const EditProductPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();


  const [
    categories,
    setCategories,
  ] = useState([]);


  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    status: "active",
  });


  const [
    isLoading,
    setIsLoading,
  ] = useState(true);


  const [
    isSaving,
    setIsSaving,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  // =========================================
  // Load Product + Categories
  // =========================================

  useEffect(() => {

    const loadData = async () => {

      try {

        const [
          categoriesResponse,
          productResponse,
        ] = await Promise.all([

          getCategories(),

          getProduct(id),

        ]);


        const categoriesData =
          categoriesResponse.data.categories;


        const product =
          productResponse.data.product;


        setCategories(
          categoriesData
        );


        setFormData({

          name:
            product.name || "",

          description:
            product.description || "",

          category:
            product.category?._id || "",

          price:
            product.price || "",

          stock:
            product.stock || "",

          status:
            product.status || "active",

        });


      } catch (error) {

        console.error(error);


        setError(

          error?.response
            ?.data
            ?.message ||

          "Failed to load product."

        );


      } finally {

        setIsLoading(false);

      }

    };


    loadData();

  }, [id]);


  // =========================================
  // Handle Input Changes
  // =========================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData(
      (previous) => ({

        ...previous,

        [name]:
          value,

      })
    );

  };


  // =========================================
  // Handle Form Submit
  // =========================================

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setError("");

    setIsSaving(true);


    try {

      await updateProduct(

        id,

        {

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

        }

      );


      navigate(
        "/admin/products"
      );


    } catch (error) {

      console.error(error);


      setError(

        error?.response
          ?.data
          ?.message ||

        "Failed to update product."

      );


    } finally {

      setIsSaving(false);

    }

  };


  // =========================================
  // Loading State
  // =========================================

  if (isLoading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }


  // =========================================
  // Page
  // =========================================

  return (

    <div className="min-h-screen bg-gray-50">


      {/* Header */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Edit Product

            </h1>


            <p className="mt-1 text-sm text-gray-500">

              Update product information

            </p>

          </div>


          <Link

            to="/admin/products"

            className="rounded-lg border px-5 py-3"

          >

            Back

          </Link>

        </div>

      </header>


      {/* Main */}

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-xl border bg-white p-8">


          {/* Error */}

          {error && (

            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">

              {error}

            </div>

          )}


          {/* Form */}

          <form

            onSubmit={handleSubmit}

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

                value={formData.name}

                onChange={handleChange}

                required

                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"

              />

            </div>


            {/* Description */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">

                Description

              </label>


              <textarea

                rows="5"

                name="description"

                value={
                  formData.description
                }

                onChange={handleChange}

                required

                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"

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

                onChange={handleChange}

                required

                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"

              >

                <option value="">

                  Select Category

                </option>


                {categories.map(
                  (category) => (

                    <option

                      key={
                        category._id
                      }

                      value={
                        category._id
                      }

                    >

                      {
                        category.name
                      }

                    </option>

                  )
                )}

              </select>

            </div>


            {/* Price + Stock */}

            <div className="grid gap-6 sm:grid-cols-2">


              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">

                  Price

                </label>


                <input

                  type="number"

                  min="0"

                  name="price"

                  value={
                    formData.price
                  }

                  onChange={
                    handleChange
                  }

                  required

                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"

                />

              </div>


              {/* Stock */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700">

                  Stock

                </label>


                <input

                  type="number"

                  min="0"

                  name="stock"

                  value={
                    formData.stock
                  }

                  onChange={
                    handleChange
                  }

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


            {/* Buttons */}

            <div className="flex justify-end gap-4 border-t pt-6">


              <Link

                to="/admin/products"

                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-50"

              >

                Cancel

              </Link>


              <button

                type="submit"

                disabled={isSaving}

                className="rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"

              >

                {isSaving

                  ? "Updating..."

                  : "Update Product"}

              </button>


            </div>


          </form>

        </div>

      </main>


    </div>

  );

};


export default EditProductPage;
