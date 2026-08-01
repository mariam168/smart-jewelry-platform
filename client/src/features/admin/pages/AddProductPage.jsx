import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  createProduct,
} from "../services/productApi";

import {
  getCategories,
} from "../services/categoryApi";

const AddProductPage = () => {

  const navigate =
    useNavigate();

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
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {

    const loadCategories =
      async () => {

        try {

          const response =
            await getCategories();

          const data =
            response.data.categories;

          setCategories(data);

          if (data.length > 0) {

            setFormData(previous => ({
              ...previous,
              category:
                data[0]._id,
            }));

          }

        } catch (error) {

          console.error(error);

        }

      };

    loadCategories();

  }, []);

  const handleChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;

      setFormData(previous => ({
        ...previous,
        [name]: value,
      }));

    };

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");

      setIsLoading(true);

      try {

        await createProduct({

          name:
            formData.name,

          description:
            formData.description,

          category:
            formData.category,

          price:
            Number(formData.price),

          stock:
            Number(formData.stock),

          status:
            formData.status,

        });

        navigate(
          "/admin/products"
        );

      } catch (error) {

        setError(

          error?.response
            ?.data
            ?.message ||

          "Failed to create product."

        );

      } finally {

        setIsLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">
              Add Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new product
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

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-xl border bg-white p-8">

          {error && (

            <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">

              {error}

            </div>

          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block">
                Product Name
              </label>

              <input
                className="w-full rounded-lg border px-4 py-3"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <label className="mb-2 block">
                Description
              </label>

              <textarea
                rows={5}
                className="w-full rounded-lg border px-4 py-3"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

            <div>

              <label className="mb-2 block">
                Category
              </label>

              <select
                className="w-full rounded-lg border px-4 py-3"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                {categories.map(category => (

                  <option
                    key={category._id}
                    value={category._id}
                  >

                    {category.name}

                  </option>

                ))}

              </select>

            </div>

            <div className="grid gap-6 sm:grid-cols-2">

              <div>

                <label className="mb-2 block">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border px-4 py-3"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />

              </div>

              <div>

                <label className="mb-2 block">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border px-4 py-3"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block">
                Status
              </label>

              <select
                className="w-full rounded-lg border px-4 py-3"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>

            </div>

            <div className="flex justify-end gap-4 border-t pt-6">

              <Link
                to="/admin/products"
                className="rounded-lg border px-6 py-3"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-black px-6 py-3 text-white"
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