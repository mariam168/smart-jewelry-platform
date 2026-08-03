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
  getCategory,
  updateCategory,
  uploadImage,
} from "../services/categoryApi";

const EditCategoryPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {

    const loadCategory = async () => {

      try {

        const response = await getCategory(id);
console.log(response);
        const category = response.data.category || response.data;

        setFormData({
          name: category.name,
          description: category.description || "",
          image: category.image || "",
        });

        setPreview(category.image || "");

      } catch (error) {

        console.error(error);

        setError(
          error?.response?.data?.message ||
          "Failed to load category."
        );

      } finally {

        setIsLoading(false);

      }

    };

    loadCategory();

  }, [id]);

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setIsSaving(true);

    try {

      let imageUrl = formData.image;

      if (image) {

        const uploadData = new FormData();

        uploadData.append("image", image);

        const uploadResponse =
          await uploadImage(uploadData);

        imageUrl = uploadResponse.image;

      }

      await updateCategory(id, {
        ...formData,
        image: imageUrl,
      });

      navigate("/admin/categories");

    } catch (error) {

      console.error(error);

      setError(
        error?.response?.data?.message ||
        "Failed to update category."
      );

    } finally {

      setIsSaving(false);

    }

  };

  if (isLoading) {

    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">
              Edit Category
            </h1>

            <p className="text-sm text-gray-500">
              Update category information
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
                onChange={(e) => {

                  const file = e.target.files[0];

                  setImage(file);

                  if (file) {

                    setPreview(
                      URL.createObjectURL(file)
                    );

                  }

                }}
              />

              {preview && (

                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-32 w-32 rounded-lg border object-cover"
                />

              )}

            </div>

            <div className="flex justify-end gap-4 border-t pt-6">

              <Link
                to="/admin/categories"
                className="rounded-lg border px-6 py-3"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
              >

                {isSaving
                  ? "Saving..."
                  : "Update Category"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

};

export default EditCategoryPage;