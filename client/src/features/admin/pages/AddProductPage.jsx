import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  getTechnologies,
} from "../services/technologyApi";
import {
  createProduct,
  uploadImage,
  createProductImage,
  updateProduct,
} from "../services/productApi";
import {
  getSmartUnits,
} from "../smart-units/services/smartUnitApi";
import {
  getCategories,
} from "../services/categoryApi";

const AddProductPage = () => {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);
  const [technologies, setTechnologies] =
  useState([]);
const [
  smartUnits,
  setSmartUnits,
] = useState([]);

const [
  selectedSmartUnits,
  setSelectedSmartUnits,
] = useState([]);
const [selectedTechnologies, setSelectedTechnologies] =
  useState([]);
  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);
const [formData, setFormData] = useState({

  name: "",
  shortDescription: "",
  description: "",

  category: "",

  price: "",
  comparePrice: "",

  stock: "",

  sku: "",

  material: "",

  color: "",

  weight: "",

  featured: false,
  bestSeller: false,
  newArrival: false,

  tags: "",

  seoTitle: "",
  seoDescription: "",
  seoSlug: "",

  preparationDays: "",

  careInstructions: "",

  isCustomizable: false,

  status: "active",

});

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

useEffect(() => {
const loadCategories = async () => {

  try {

    const response = await getCategories();

    console.log("Category Response:", response);

    let data = [];

    if (response.data?.categories) {

      data = response.data.categories;

    } else if (response.categories) {

      data = response.categories;

    } else if (Array.isArray(response)) {

      data = response;

    }

    console.log("Loaded Categories:", data);

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
const loadTechnologies = async () => {

  try {

    const response = await getTechnologies();

    console.log(response);

    setTechnologies(
      response.data.technologies || []
    );

  } catch (error) {

    console.error(error);

    setTechnologies([]);

  }

};
const loadSmartUnits = async () => {

  try {

    const response = await getSmartUnits();

    setSmartUnits(
      response.data.smartUnits || []
    );

  } catch (error) {

    console.error(error);

    setSmartUnits([]);

  }

};
  loadCategories();

  loadTechnologies();
loadSmartUnits();
}, []);

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
console.log(formData);
console.log("Category:", formData.category);
        const productResponse =
       await createProduct({

  name: formData.name,

  shortDescription:
    formData.shortDescription,

  description:
    formData.description,

  category:
    formData.category,
 technologies:
    selectedTechnologies,
    smartUnits:
  selectedSmartUnits,

  price:
    Number(formData.price),

  comparePrice:
    Number(formData.comparePrice),

  stock:
    Number(formData.stock),

  sku:
    formData.sku,

  material:
    formData.material,

  color:
    formData.color,

  weight:
    Number(formData.weight),

  featured:
    formData.featured,

  bestSeller:
    formData.bestSeller,

  newArrival:
    formData.newArrival,

  tags:
    formData.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean),

  seoTitle:
    formData.seoTitle,

  seoDescription:
    formData.seoDescription,

  seoSlug:
    formData.seoSlug,

  preparationDays:
    Number(formData.preparationDays),

  careInstructions:
    formData.careInstructions,

  isCustomizable:
    formData.isCustomizable,

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
    const handleSmartUnitChange = (id) => {

  setSelectedSmartUnits((previous) =>

    previous.includes(id)

      ? previous.filter(
          smartUnitId =>
            smartUnitId !== id
        )

      : [...previous, id]

  );

};
    const handleTechnologyChange = (id) => {

  setSelectedTechnologies((previous) =>

    previous.includes(id)

      ? previous.filter(
          technologyId =>
            technologyId !== id
        )

      : [...previous, id]

  );

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
    Short Description
  </label>

  <input
    type="text"
    name="shortDescription"
    value={formData.shortDescription}
    onChange={handleChange}
    className="w-full rounded-lg border px-4 py-3"
    placeholder="Short description for product card"
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
            <div className="grid grid-cols-2 gap-6">

  <div>

    <label className="mb-2 block">
      SKU
    </label>

    <input
      type="text"
      name="sku"
      value={formData.sku}
      onChange={handleChange}
      className="w-full rounded-lg border px-4 py-3"
    />

  </div>

  <div>

    <label className="mb-2 block">
      Compare Price
    </label>

    <input
      type="number"
      min="0"
      name="comparePrice"
      value={formData.comparePrice}
      onChange={handleChange}
      className="w-full rounded-lg border px-4 py-3"
    />

  </div>

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

  <option value="">
    Select Category
  </option>

  {categories.map((category) => (

    <option
      key={category._id}
      value={category._id}
    >
      {category.name}
    </option>

  ))}

</select>
           <div className="rounded-xl border p-6">

  <h2 className="mb-4 text-lg font-semibold">

    Technologies

  </h2>

  <div className="grid grid-cols-2 gap-4">

    {technologies.map((technology) => (

      <label
        key={technology._id}
        className="flex items-center gap-3"
      >

        <input
          type="checkbox"
          checked={selectedTechnologies.includes(
            technology._id
          )}
          onChange={() =>
            handleTechnologyChange(
              technology._id
            )
          }
        />

        {technology.name}

      </label>

    ))}

  </div>

</div>
<div className="rounded-xl border p-6">

  <h2 className="mb-4 text-lg font-semibold">

    Smart Units

  </h2>

  <div className="grid grid-cols-2 gap-4">

    {smartUnits.map((smartUnit) => (

      <label
        key={smartUnit._id}
        className="flex items-center gap-3"
      >

        <input
          type="checkbox"
          checked={selectedSmartUnits.includes(
            smartUnit._id
          )}
          onChange={() =>
            handleSmartUnitChange(
              smartUnit._id
            )
          }
        />

        <div>

          <div className="font-medium">

            {smartUnit.name}

          </div>

          <div className="text-sm text-gray-500">

            +{smartUnit.price} EGP

          </div>

        </div>

      </label>

    ))}

  </div>

</div>
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
              <div className="grid grid-cols-3 gap-6">

  <div>

    <label className="mb-2 block">
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

    <label className="mb-2 block">
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

    <label className="mb-2 block">
      Weight (g)
    </label>

    <input
      type="number"
      min="0"
      name="weight"
      value={formData.weight}
      onChange={handleChange}
      className="w-full rounded-lg border px-4 py-3"
    />

  </div>

</div>
<div>

  <label className="mb-2 block">
    Tags
  </label>

  <input
    type="text"
    name="tags"
    value={formData.tags}
    onChange={handleChange}
    placeholder="gold, ring, gift"
    className="w-full rounded-lg border px-4 py-3"
  />

</div>
<div className="rounded-xl border p-6">

  <h2 className="mb-5 text-xl font-semibold">

    SEO

  </h2>

  <div className="space-y-5">

    <div>

      <label className="mb-2 block">

        SEO Title

      </label>

      <input
        type="text"
        name="seoTitle"
        value={formData.seoTitle}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-3"
      />

    </div>

    <div>

      <label className="mb-2 block">

        SEO Slug

      </label>

      <input
        type="text"
        name="seoSlug"
        value={formData.seoSlug}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-3"
      />

    </div>

    <div>

      <label className="mb-2 block">

        SEO Description

      </label>

      <textarea
        rows={4}
        name="seoDescription"
        value={formData.seoDescription}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-3"
      />

    </div>

  </div>

</div>
<div className="grid grid-cols-2 gap-6">

  <div>

    <label className="mb-2 block">

      Preparation Days

    </label>

    <input
      type="number"
      min="0"
      name="preparationDays"
      value={formData.preparationDays}
      onChange={handleChange}
      className="w-full rounded-lg border px-4 py-3"
    />

  </div>

  <div className="flex items-end">

    <label className="flex items-center gap-3">

      <input
        type="checkbox"
        name="isCustomizable"
        checked={formData.isCustomizable}
        onChange={handleChange}
      />

      Customizable Product

    </label>

  </div>

</div>
<div>

  <label className="mb-2 block">

    Care Instructions

  </label>

  <textarea
    rows={4}
    name="careInstructions"
    value={formData.careInstructions}
    onChange={handleChange}
    className="w-full rounded-lg border px-4 py-3"
  />

</div>
<div className="rounded-xl border p-6">

  <h2 className="mb-5 text-xl font-semibold">

    Marketing

  </h2>

  <div className="flex flex-wrap gap-8">

    <label className="flex items-center gap-2">

      <input
        type="checkbox"
        name="featured"
        checked={formData.featured}
        onChange={handleChange}
      />

      Featured

    </label>

    <label className="flex items-center gap-2">

      <input
        type="checkbox"
        name="bestSeller"
        checked={formData.bestSeller}
        onChange={handleChange}
      />

      Best Seller

    </label>

    <label className="flex items-center gap-2">

      <input
        type="checkbox"
        name="newArrival"
        checked={formData.newArrival}
        onChange={handleChange}
      />

      New Arrival

    </label>

  </div>

</div>

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