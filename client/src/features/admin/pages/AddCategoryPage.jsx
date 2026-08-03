import {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  createCategory,
  uploadImage,
} from "../services/categoryApi";

const AddCategoryPage = () => {

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData,
  ] = useState({

    name: "",

    description: "",

  });

  const [
    image,
    setImage,
  ] = useState(null);

  const [
    preview,
    setPreview,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const handleChange =
    (event) => {

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

  const handleImageChange =
    (event) => {

      const file =
        event.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    };

 const handleSubmit = async (event) => {
  event.preventDefault();

  setError("");
  setIsLoading(true);

  try {

    let imageUrl = "";

    if (image) {

      const formData = new FormData();

      formData.append("image", image);

      const uploadResponse = await uploadImage(formData);

      imageUrl = uploadResponse.image;
    }

    await createCategory({
      ...formData,
      image: imageUrl,
    });

    navigate("/admin/categories");

  } catch (error) {

    console.error(error);

    setError(
      error?.response?.data?.message ||
      "Failed to create category."
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

              Add Category

            </h1>

            <p className="text-sm text-gray-500">

              Create a new product category

            </p>

          </div>

          <Link
            to="/admin/categories"
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

                Category Name

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
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block">

                Category Image

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {preview && (

              <div>

                <img
                  src={preview}
                  alt="Preview"
                  className="h-40 w-40 rounded-lg border object-cover"
                />

              </div>

            )}

            <div className="flex justify-end gap-4 border-t pt-6">

              <Link
                to="/admin/categories"
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
                  : "Create Category"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

};

export default AddCategoryPage;