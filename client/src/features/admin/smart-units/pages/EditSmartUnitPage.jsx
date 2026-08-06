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
  getSmartUnit,
  updateSmartUnit,
} from "../services/smartUnitApi";

const EditSmartUnitPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    description: "",

    price: "",

    status: "active",

  });

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const loadSmartUnit = async () => {

      try {

        const response =
          await getSmartUnit(id);

        const smartUnit =
          response.data.smartUnit;

        setFormData({

          name:
            smartUnit.name || "",

          description:
            smartUnit.description || "",

          price:
            smartUnit.price || "",

          status:
            smartUnit.status || "active",

        });

      } catch (error) {

        console.error(error);

        setError(
          error?.response?.data?.message ||
          "Failed to load Smart Unit."
        );

      } finally {

        setIsLoading(false);

      }

    };

    loadSmartUnit();

  }, [id]);

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFormData(previous => ({

      ...previous,

      [name]: value,

    }));

  };

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setError("");

    setIsSaving(true);

    try {

      await updateSmartUnit(

        id,

        {

          ...formData,

          price:
            Number(formData.price),

        }

      );

      navigate(
        "/admin/smart-units"
      );

    } catch (error) {

      console.error(error);

      setError(

        error?.response?.data?.message ||

        "Failed to update Smart Unit."

      );

    } finally {

      setIsSaving(false);

    }

  };

  if (isLoading) {

    return (

      <div className="p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Edit Smart Unit

            </h1>

            <p className="text-gray-500">

              Update Smart Unit

            </p>

          </div>

          <Link

            to="/admin/smart-units"

            className="rounded-lg border px-5 py-3"

          >

            Back

          </Link>

        </div>

      </header>

      <main className="mx-auto max-w-4xl p-6">

        <div className="rounded-xl border bg-white p-8">

          {error && (

            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">

              {error}

            </div>

          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block">

                Name

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

                rows="4"

                name="description"

                value={formData.description}

                onChange={handleChange}

                className="w-full rounded-lg border px-4 py-3"

              />

            </div>

            <div>

              <label className="mb-2 block">

                Extra Price

              </label>

              <input

                type="number"

                min="0"

                name="price"

                value={formData.price}

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

            <div className="flex justify-end gap-4 border-t pt-6">

              <Link

                to="/admin/smart-units"

                className="rounded-lg border px-6 py-3"

              >

                Cancel

              </Link>

              <button

                type="submit"

                disabled={isSaving}

                className="rounded-lg bg-black px-6 py-3 font-semibold text-white"

              >

                {isSaving

                  ? "Updating..."

                  : "Update Smart Unit"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

};

export default EditSmartUnitPage;