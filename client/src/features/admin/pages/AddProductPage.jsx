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
  uploadImage,
  createProductImage,
  updateProduct,
} from "../services/productApi";

import {
  getCategories,
} from "../services/categoryApi";

const AddProductPage = () => {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const [formData, setFormData] =
    useState({

      name: "",

      description: "",

      category: "",

      price: "",

      stock: "",

      status: "active",

    });

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

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

              category: data[0]._id,

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

  const handleImageChange =
    (event) => {

      const files =
        Array.from(event.target.files);

      setImages(files);

      setPreviewImages(

        files.map(file =>

          URL.createObjectURL(file)

        )

      );

    };

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");

      setIsLoading(true);

      try {

        const productResponse =
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

        const product =
          productResponse.data.product;

        let primaryImage = "";

        for (

          let i = 0;

          i < images.length;

          i++

        ) {

          const form =
            new FormData();

          form.append(

            "image",

            images[i]

          );

          const upload =
            await uploadImage(form);

          if (i === 0) {

            primaryImage =
              upload.image;

          }

          await createProductImage({

            product:
              product._id,

            imageUrl:
              upload.image,

            isPrimary:
              i === 0,

            sortOrder:
              i,

          });

        }

        if (primaryImage) {

          await updateProduct(

            product._id,

            {

              primaryImage,

            }

          );

        }

        navigate(
          "/admin/products"
        );

      } catch (error) {

        console.error(error);

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

        <div className="rounded-xl border bg-white p-8 shadow-sm">

          {error && (

            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">

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
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block">
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
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

            <div className="grid grid-cols-2 gap-6">

              <div>

                <label className="mb-2 block">
                  Price
                </label>

                <input
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block">
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-4 py-3"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              >

                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>

              </select>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Product Images
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            {previewImages.length > 0 && (

              <div>

                <label className="mb-3 block font-medium">
                  Preview
                </label>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  {previewImages.map((image, index) => (

                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border"
                    >

                      <img
                        src={image}
                        alt=""
                        className="h-36 w-full object-cover"
                      />

                      {index === 0 && (

                        <div className="bg-black py-2 text-center text-xs text-white">

                          Primary Image

                        </div>

                      )}

                    </div>

                  ))}

                </div>

              </div>

            )}

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
                className="rounded-lg bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
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