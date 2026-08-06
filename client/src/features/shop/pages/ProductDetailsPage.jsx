import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getShopProduct,
  getProductImages,
  getProductVariants,
} from "../services/shopApi";

import {
  getSmartUnits,
} from "../../admin/smart-units/services/smartUnitApi";

import {
  useCart,
} from "../../../context/CartContext";

const ProductDetailsPage = () => {

  const { id } = useParams();

  // ==========================================
  // Product
  // ==========================================

  const [
    product,
    setProduct,
  ] = useState(null);

  const [
    images,
    setImages,
  ] = useState([]);

  const [
    variants,
    setVariants,
  ] = useState([]);

  // ==========================================
  // Smart Units
  // ==========================================

  const [
    smartUnits,
    setSmartUnits,
  ] = useState([]);

  const [
    selectedSmartUnit,
    setSelectedSmartUnit,
  ] = useState(null);

  // ==========================================
  // Selected Variant
  // ==========================================

  const [
    selectedVariant,
    setSelectedVariant,
  ] = useState(null);

  const [
    selectedColor,
    setSelectedColor,
  ] = useState("");

  const [
    selectedSize,
    setSelectedSize,
  ] = useState("");

  // ==========================================
  // Gallery
  // ==========================================

  const [
    selectedImage,
    setSelectedImage,
  ] = useState("");

  // ==========================================
  // Quantity
  // ==========================================

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  // ==========================================
  // Loading
  // ==========================================

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================
  // Cart
  // ==========================================

  const {
    addToCart,
    isLoading: isCartLoading,
  } = useCart();

  const [
    addedToCart,
    setAddedToCart,
  ] = useState(false);

  // ==========================================
  // Load Product
  // ==========================================

  useEffect(() => {

    const loadProduct = async () => {

      try {

        setIsLoading(true);
        setError("");
        setQuantity(1);
        setAddedToCart(false);

        const [

          productResponse,

          imagesResponse,

          variantsResponse,

          smartUnitsResponse,

        ] = await Promise.all([

          getShopProduct(id),

          getProductImages(id).catch(() => []),

          getProductVariants(id).catch(() => []),

          getSmartUnits().catch(() => ({
            data: {
              smartUnits: [],
            },
          })),

        ]);

        const currentProduct =
          productResponse.product;

        setProduct(currentProduct);

        // ======================================
        // Images
        // ======================================

        const loadedImages =
          imagesResponse || [];

        setImages(
          loadedImages
        );

        if (
          loadedImages.length > 0
        ) {

          const primaryImage =
            loadedImages.find(
              image =>
                image.isPrimary
            );

          setSelectedImage(

            primaryImage?.imageUrl ||

            loadedImages[0].imageUrl

          );

        } else {

          setSelectedImage(

            currentProduct.primaryImage ||

            currentProduct.image ||

            ""

          );

        }

        // ======================================
        // Variants
        // ======================================

        const loadedVariants =
          variantsResponse || [];

        setVariants(
          loadedVariants
        );

        if (
          loadedVariants.length > 0
        ) {

          const firstVariant =
            loadedVariants[0];

          setSelectedVariant(
            firstVariant
          );

          setSelectedColor(
            firstVariant.color
          );

          setSelectedSize(
            firstVariant.size
          );

          if (
            firstVariant.image
          ) {

            setSelectedImage(
              firstVariant.image
            );

          }

        }

        // ======================================
        // Smart Units
        // ======================================

        const allSmartUnits =
          smartUnitsResponse.data
            ?.smartUnits || [];

        setSmartUnits(
          allSmartUnits
        );

        if (
          currentProduct.smartUnits?.length
        ) {

          const firstUnit =
            allSmartUnits.find(

              unit =>

                currentProduct.smartUnits.includes(
                  unit._id
                )

            );

          if (firstUnit) {

            setSelectedSmartUnit(
              firstUnit
            );

          }

        }

      } catch (error) {

        console.error(error);

        setError(

          error?.response?.data?.message ||

          "Failed to load product."

        );

      } finally {

        setIsLoading(false);

      }

    };

    if (id) {

      loadProduct();

    }

  }, [id]);
  // ==========================================
// Available Colors
// ==========================================

const colors = useMemo(() => {

  return [

    ...new Set(

      variants
        .map(variant => variant.color)
        .filter(Boolean)

    ),

  ];

}, [variants]);

// ==========================================
// Available Sizes
// ==========================================

const sizes = useMemo(() => {

  if (!selectedColor) {

    return [];

  }

  return variants

    .filter(

      variant =>

        variant.color === selectedColor

    )

    .map(

      variant => variant.size

    )

    .filter(Boolean);

}, [

  variants,

  selectedColor,

]);

// ==========================================
// Update Variant
// ==========================================

useEffect(() => {

  if (

    !selectedColor ||

    !selectedSize

  ) {

    return;

  }

  const variant =

    variants.find(

      item =>

        item.color === selectedColor &&

        item.size === selectedSize

    );

  if (!variant) return;

  setSelectedVariant(variant);

  if (variant.image) {

    setSelectedImage(

      variant.image

    );

  }

}, [

  selectedColor,

  selectedSize,

  variants,

]);

// ==========================================
// Product Technologies
// ==========================================

const technologies =

product?.technologies || [];

// ==========================================
// Product Smart Units
// ==========================================

const availableSmartUnits = useMemo(() => {

  if (

    !product?.smartUnits?.length

  ) {

    return [];

  }

  return smartUnits.filter(

    unit =>

      product.smartUnits.includes(

        unit._id

      )

  );

}, [

  smartUnits,

  product,

]);

// ==========================================
// Price
// ==========================================

const basePrice =

selectedVariant?.price ??

product?.price ??

0;

const smartPrice =

selectedSmartUnit?.price ||

0;

const currentPrice =

basePrice +

smartPrice;

const comparePrice =

selectedVariant?.compareAtPrice ??

product?.comparePrice ??

0;

const saving =

comparePrice > currentPrice

? comparePrice - currentPrice

: 0;

// ==========================================
// Stock
// ==========================================

const currentStock =

selectedVariant?.stock ??

product?.stock ??

0;

// ==========================================
// Current Image
// ==========================================

const currentImage =

selectedImage ||

selectedVariant?.image ||

product?.primaryImage ||

product?.image ||

"";

// ==========================================
// Status
// ==========================================

const isOutOfStock =

currentStock <= 0;

const isInactive =

product?.status !== "active";

const isUnavailable =

isOutOfStock ||

isInactive;

// ==========================================
// Quantity
// ==========================================

const increaseQuantity = () => {

  if (

    quantity < currentStock

  ) {

    setQuantity(

      previous => previous + 1

    );

  }

};

const decreaseQuantity = () => {

  if (

    quantity > 1

  ) {

    setQuantity(

      previous => previous - 1

    );

  }

};

// ==========================================
// Change Smart Unit
// ==========================================

const handleSmartUnitChange = (

unit

) => {

  setSelectedSmartUnit(unit);

};

// ==========================================
// Add To Cart
// ==========================================

const handleAddToCart = async () => {

  if (!product) return;

  try {

    await addToCart(

      product._id,

      quantity,

      selectedVariant?._id,

      selectedSmartUnit?._id

    );

    setAddedToCart(true);

  }

  catch (error) {

    console.error(error);

  }

};

// ==========================================
// Loading
// ==========================================

if (isLoading) {

  return (

    <div className="min-h-screen flex items-center justify-center">

      Loading...

    </div>

  );

}

// ==========================================
// Error
// ==========================================

if (error) {

  return (

    <div className="min-h-screen flex items-center justify-center">

      {error}

    </div>

  );

}

// ==========================================
// Product Not Found
// ==========================================

if (!product) {

  return (

    <div className="min-h-screen flex items-center justify-center">

      Product Not Found

    </div>

  );

}
return (

<div className="min-h-screen bg-gray-50">

{/* ================================= */}
{/* Breadcrumb */}
{/* ================================= */}

<div className="border-b bg-white">

<div className="mx-auto max-w-7xl px-6 py-4 flex items-center gap-2 text-sm">

<Link
to="/shop"
className="text-gray-500 hover:text-black"
>

Shop

</Link>

<span>/</span>

<span className="font-semibold">

{product.name}

</span>

</div>

</div>

{/* ================================= */}
{/* Main */}
{/* ================================= */}

<main className="mx-auto max-w-7xl px-6 py-12">

<div className="grid lg:grid-cols-2 gap-14">

{/* =============================== */}
{/* Gallery */}
{/* =============================== */}

<div>

<div className="rounded-3xl overflow-hidden border bg-white shadow-sm">

{currentImage ? (

<img

src={currentImage}

alt={product.name}

className="w-full h-[650px] object-cover"

/>

) : (

<div className="h-[650px] flex items-center justify-center bg-gray-100">

No Image

</div>

)}

</div>

{images.length > 0 && (

<div className="grid grid-cols-5 gap-3 mt-5">

{images.map(image => (

<button

key={image._id}

onClick={() =>

setSelectedImage(

image.imageUrl

)

}

className={`rounded-xl overflow-hidden border-2 transition

${

selectedImage === image.imageUrl

?

"border-black"

:

"border-gray-200"

}

`}

>

<img

src={image.imageUrl}

alt=""

className="h-24 w-full object-cover"

/>

</button>

))}

</div>

)}

</div>

{/* =============================== */}
{/* Product Info */}
{/* =============================== */}

<div>

<p className="uppercase tracking-[0.25em] text-sm text-gray-500">

{product.category?.name}

</p>

<h1 className="mt-4 text-5xl font-bold">

{product.name}

</h1>

{product.shortDescription && (

<p className="mt-5 text-lg text-gray-600 leading-8">

{product.shortDescription}

</p>

)}

{/* =============================== */}
{/* Price */}
{/* =============================== */}

<div className="mt-8">

<div className="flex items-end gap-4">

<h2 className="text-5xl font-bold">

${currentPrice}

</h2>

{comparePrice > currentPrice && (

<span className="line-through text-2xl text-gray-400">

${comparePrice}

</span>

)}

</div>

{saving > 0 && (

<p className="mt-2 text-green-600 font-semibold">

You Save ${saving}

</p>

)}

</div>

{/* =============================== */}
{/* Technologies */}
{/* =============================== */}

{technologies.length > 0 && (

<div className="mt-8">

<h3 className="font-semibold text-lg mb-4">

Technologies

</h3>

<div className="flex flex-wrap gap-3">

{technologies.map(technology => (

<span

key={technology._id}

className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"

>

{technology.name}

</span>

))}

</div>

</div>

)}
{/* ================================= */}
{/* Smart Unit */}
{/* ================================= */}

{availableSmartUnits.length > 0 && (

<div className="mt-10">

<h2 className="mb-5 text-2xl font-bold">

Choose Smart Unit

</h2>

<div className="grid gap-4">

{availableSmartUnits.map((unit) => (

<div

key={unit._id}

onClick={() => handleSmartUnitChange(unit)}

className={`cursor-pointer rounded-2xl border p-5 transition

${

selectedSmartUnit?._id === unit._id

?

"border-black bg-black text-white"

:

"border-gray-200 bg-white hover:border-black"

}

`}

>

<div className="flex items-start gap-5">

{unit.image && (

<img

src={unit.image}

alt={unit.name}

className="h-24 w-24 rounded-xl object-cover"

/>

)}

<div className="flex-1">

<div className="flex items-center justify-between">

<h3 className="text-xl font-bold">

{unit.name}

</h3>

<span className="text-xl font-semibold">

+ ${unit.price}

</span>

</div>

<p className="mt-2 opacity-80">

{unit.description}

</p>

</div>

</div>

</div>

))}

</div>

</div>

)}
<div className="mt-10 rounded-2xl border bg-white p-6">

<h2 className="mb-6 text-2xl font-bold">

Product Specifications

</h2>

<div className="space-y-4">

{product.material && (

<div className="flex justify-between border-b pb-3">

<span>Material</span>

<strong>

{product.material}

</strong>

</div>

)}

{product.color && (

<div className="flex justify-between border-b pb-3">

<span>Color</span>

<strong>

{product.color}

</strong>

</div>

)}

{product.weight > 0 && (

<div className="flex justify-between border-b pb-3">

<span>Weight</span>

<strong>

{product.weight} g

</strong>

</div>

)}

{product.sku && (

<div className="flex justify-between border-b pb-3">

<span>SKU</span>

<strong>

{product.sku}

</strong>

</div>

)}

<div className="flex justify-between border-b pb-3">

<span>Stock</span>

<strong>

{currentStock}

</strong>

</div>

<div className="flex justify-between">

<span>Status</span>

<strong>

{product.status}

</strong>

</div>

</div>

</div>
{selectedSmartUnit && (

<div className="mt-10 rounded-2xl border bg-blue-50 p-6">

<h2 className="mb-5 text-2xl font-bold">

Smart Unit Specifications

</h2>

<div className="grid md:grid-cols-2 gap-5">

{selectedSmartUnit.processor && (

<div>

<strong>

Processor

</strong>

<p>

{selectedSmartUnit.processor}

</p>

</div>

)}

{selectedSmartUnit.bluetooth && (

<div>

<strong>

Bluetooth

</strong>

<p>

{selectedSmartUnit.bluetooth}

</p>

</div>

)}

{selectedSmartUnit.battery && (

<div>

<strong>

Battery

</strong>

<p>

{selectedSmartUnit.battery}

</p>

</div>

)}

{selectedSmartUnit.chargingType && (

<div>

<strong>

Charging

</strong>

<p>

{selectedSmartUnit.chargingType}

</p>

</div>

)}

{selectedSmartUnit.waterResistance && (

<div>

<strong>

Water Resistance

</strong>

<p>

{selectedSmartUnit.waterResistance}

</p>

</div>

)}

{selectedSmartUnit.warranty && (

<div>

<strong>

Warranty

</strong>

<p>

{selectedSmartUnit.warranty}

</p>

</div>

)}

{selectedSmartUnit.connectivity && (

<div>

<strong>

Connectivity

</strong>

<p>

{selectedSmartUnit.connectivity}

</p>

</div>

)}

{selectedSmartUnit.compatibility && (

<div>

<strong>

Compatibility

</strong>

<p>

{selectedSmartUnit.compatibility}

</p>

</div>

)}

</div>

{selectedSmartUnit.features?.length > 0 && (

<>

<h3 className="mt-8 mb-3 text-xl font-semibold">

Features

</h3>

<ul className="list-disc pl-6 space-y-2">

{selectedSmartUnit.features.map(feature => (

<li key={feature}>

{feature}

</li>

))}

</ul>

</>

)}

</div>

)}
{/* ========================================== */}
{/* Quantity */}
{/* ========================================== */}

{!isUnavailable && (

<div className="mt-10">

<h3 className="mb-4 text-xl font-bold">

Quantity

</h3>

<div className="flex w-fit items-center overflow-hidden rounded-xl border">

<button
type="button"
onClick={decreaseQuantity}
disabled={quantity <= 1}
className="px-6 py-4 hover:bg-gray-100"
>

-

</button>

<div className="border-x px-8 py-4 font-semibold">

{quantity}

</div>

<button
type="button"
onClick={increaseQuantity}
disabled={quantity >= currentStock}
className="px-6 py-4 hover:bg-gray-100"
>

+

</button>

</div>

</div>

)}

{/* ========================================== */}
{/* Add To Cart */}
{/* ========================================== */}

<div className="mt-10">

<button

type="button"

disabled={

isUnavailable ||

isCartLoading

}

onClick={handleAddToCart}

className="w-full rounded-2xl bg-black py-5 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:opacity-40"

>

{isCartLoading

?

"Adding..."

:

isOutOfStock

?

"Out Of Stock"

:

`Add To Cart • $${currentPrice}`

}

</button>

{addedToCart && (

<div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">

Product added successfully.

</div>

)}

</div>

{/* ========================================== */}
{/* Description */}
{/* ========================================== */}

<div className="mt-12 border-t pt-10">

<h2 className="mb-5 text-2xl font-bold">

Description

</h2>

<p className="leading-8 text-gray-600">

{product.description}

</p>

</div>

{/* ========================================== */}
{/* Care Instructions */}
{/* ========================================== */}

{product.careInstructions && (

<div className="mt-10 border-t pt-10">

<h2 className="mb-5 text-2xl font-bold">

Care Instructions

</h2>

<p className="leading-8 text-gray-600">

{product.careInstructions}

</p>

</div>

)}

{/* ========================================== */}
{/* Tags */}
{/* ========================================== */}

{product.tags?.length > 0 && (

<div className="mt-10 border-t pt-10">

<h2 className="mb-5 text-2xl font-bold">

Tags

</h2>

<div className="flex flex-wrap gap-3">

{product.tags.map(tag => (

<span

key={tag}

className="rounded-full bg-gray-100 px-4 py-2 text-sm"

>

#{tag}

</span>

))}

</div>

</div>

)}

{/* ========================================== */}
{/* Preparation */}
{/* ========================================== */}

{product.preparationDays > 0 && (

<div className="mt-10 rounded-2xl bg-yellow-50 p-6">

<h3 className="text-xl font-bold">

Preparation Time

</h3>

<p className="mt-3">

Estimated preparation:

<strong>

{" "}
{product.preparationDays} day(s)

</strong>

</p>

</div>

)}

{/* ========================================== */}
{/* Custom Product */}
{/* ========================================== */}

{product.isCustomizable && (

<div className="mt-8 rounded-2xl border border-green-300 bg-green-50 p-6">

<h3 className="text-xl font-bold text-green-700">

✨ Customizable Product

</h3>

<p className="mt-3 text-green-600">

This product can be customized before manufacturing.

</p>

</div>

)}

{/* ========================================== */}
{/* SEO */}
{/* ========================================== */}

{product.seoDescription && (

<div className="mt-10 rounded-2xl bg-gray-100 p-6">

<h2 className="text-2xl font-bold">

About This Product

</h2>

<p className="mt-4 leading-8 text-gray-600">

{product.seoDescription}

</p>

</div>

)}

<Link

to="/shop"

className="mt-12 inline-block text-gray-500 underline"

>

Continue Shopping

</Link>

</div>

</div>

</main>

</div>

);

};

export default ProductDetailsPage;