import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createVariant,
  uploadImage,
} from "../services/productApi";

const AddVariantPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({

    sku: "",

    name: "",

    color: "",

    size: "",

    material: "",

    finish: "",

    price: "",

    compareAtPrice: "",

    stock: "",

    isActive: true,

  });

  // =====================================
  // Handle Inputs
  // =====================================

  const handleChange = (event) => {

    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(previous => ({

      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  };

  // =====================================
  // Handle Image
  // =====================================

  const handleImageChange = (event) => {

    const file =
      event.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setIsLoading(true);

    try {

      let imageUrl = "";

      if (image) {

        const form =
          new FormData();

        form.append(
          "image",
          image
        );

        const upload =
          await uploadImage(form);

        imageUrl =
          upload.image;

      }

      await createVariant({

        product: id,

        sku:
          formData.sku,

        name:
          formData.name,

        color:
          formData.color,

        size:
          formData.size,

        material:
          formData.material,

        finish:
          formData.finish,

        price:
          Number(formData.price),

        compareAtPrice:
          Number(formData.compareAtPrice),

        stock:
          Number(formData.stock),

        image:
          imageUrl,

        isActive:
          formData.isActive,

      });

      navigate(
        `/admin/products/${id}/variants`
      );

    }

    catch (error) {

      console.log(error);

      setError(

        error?.response?.data?.message ||

        "Failed to create variant."

      );

    }

    finally {

      setIsLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Add Variant

            </h1>

            <p className="mt-1 text-sm text-gray-500">

              Create product variant

            </p>

          </div>

          <Link
            to={`/admin/products/${id}/variants`}
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
                        {/* SKU */}

            <div>
              <label className="mb-2 block font-medium">
                SKU
              </label>

              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            {/* Variant Name */}

            <div>
              <label className="mb-2 block font-medium">
                Variant Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />
            </div>

            {/* Color + Size */}

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="mb-2 block font-medium">
                  Color
                </label>

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Size
                </label>

                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

            </div>

            {/* Material + Finish */}

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="mb-2 block font-medium">
                  Material
                </label>

                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Finish
                </label>

                <input
                  type="text"
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

            </div>

            {/* Price */}

            <div className="grid grid-cols-3 gap-6">

              <div>
                <label className="mb-2 block font-medium">
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
                <label className="mb-2 block font-medium">
                  Compare Price
                </label>

                <input
                  type="number"
                  min="0"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
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

            {/* Variant Image */}

            <div>

              <label className="mb-2 block font-medium">
                Variant Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border p-3"
              />

            </div>

            {preview && (

              <div>

                <label className="mb-2 block font-medium">
                  Preview
                </label>

                <img
                  src={preview}
                  alt="Preview"
                  className="h-44 w-44 rounded-lg border object-cover"
                />

              </div>

            )}

            {/* Active */}

            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />

              <label>
                Active Variant
              </label>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-4 border-t pt-6">

              <Link
                to={`/admin/products/${id}/variants`}
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
                  ? "Saving..."
                  : "Create Variant"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

};

export default AddVariantPage;