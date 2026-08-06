import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  createSmartUnit,
} from "../services/smartUnitApi";

const AddSmartUnitPage = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",

      description: "",

      price: "",

      stock: "",

      status: "active",

    });

  const [error, setError] =
    useState("");

  const [isSaving, setIsSaving] =
    useState(false);

  const handleChange = (event) => {

    const { name, value } =
      event.target;

    setFormData(previous => ({

      ...previous,

      [name]: value,

    }));

  };

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");

      setIsSaving(true);

      try {

        await createSmartUnit({

          ...formData,

          price: Number(
            formData.price
          ),

          stock: Number(
            formData.stock
          ),

        });

        navigate(
          "/admin/smart-units"
        );

      }

      catch (error) {

        console.error(error);

        setError(

          error?.response?.data
            ?.message ||

          "Failed to create Smart Unit."

        );

      }

      finally {

        setIsSaving(false);

      }

    };

  return (

    <div className="min-h-screen bg-gray-50">

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold">

              Add Smart Unit

            </h1>

            <p className="text-sm text-gray-500">

              Create a new smart unit

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

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-xl border bg-white p-8 shadow-sm">

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
                  ? "Saving..."
                  : "Create Smart Unit"}

              </button>

            </div>

          </form>

        </div>

      </main>

    </div>

  );

};

export default AddSmartUnitPage;