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
  getTechnology,
  updateTechnology,
  uploadImage,
} from "../services/technologyApi";

const EditTechnologyPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      code: "",

      description: "",

      icon: "",

      status: "active",

    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    loadTechnology();

  }, []);

  const loadTechnology =
    async () => {

      try {

        const response =
          await getTechnology(id);

        const technology =
          response.data.technology;

        setFormData(technology);

        if (technology.icon) {

          setPreview(

            technology.icon.startsWith("http")

              ? technology.icon

              : `http://localhost:5000${technology.icon}`

          );

        }

      } catch (error) {

        console.error(error);

        setError(

          error?.response?.data?.message ||

          "Failed to load technology."

        );

      } finally {

        setIsLoading(false);

      }

    };

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

      const file =
        event.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(

        URL.createObjectURL(file)

      );

    };

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setIsSaving(true);

      setError("");

      try {

        let icon =
          formData.icon;

        if (image) {

          const form =
            new FormData();

          form.append(
            "image",
            image
          );

          const upload =
            await uploadImage(form);

          icon =
            upload.image;

        }

        await updateTechnology(

          id,

          {

            ...formData,

            icon,

          }

        );

        navigate(
          "/admin/technologies"
        );

      } catch (error) {

        console.error(error);

        setError(

          error?.response?.data?.message ||

          "Failed to update technology."

        );

      } finally {

        setIsSaving(false);

      }

    };

  if (isLoading) {

    return (

      <div className="py-20 text-center">

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

              Edit Technology

            </h1>

            <p className="text-sm text-gray-500">

              Update technology information

            </p>

          </div>

          <Link

            to="/admin/technologies"

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

                Technology Name

              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block">

                Technology Code

              </label>

              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
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
                className="w-full rounded-lg border px-4 py-3"
              />

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

              <label className="mb-2 block">

                Technology Icon

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-lg border px-4 py-3"
              />

            </div>

            {preview && (

              <img

                src={preview}

                alt="Technology"

                className="h-40 w-40 rounded-lg border object-cover"

              />

            )}

            <div className="flex justify-end gap-4 border-t pt-6">

              <Link

                to="/admin/technologies"

                className="rounded-lg border px-6 py-3"

              >

                Cancel

              </Link>

              <button

                type="submit"

                disabled={isSaving}

                className="rounded-lg bg-black px-6 py-3 font-semibold text-white"

              >

                {

                  isSaving

                    ? "Updating..."

                    : "Update Technology"

                }

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

};

export default EditTechnologyPage;