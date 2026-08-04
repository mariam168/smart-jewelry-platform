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
        setAddedToCart(false);
        setQuantity(1);

        const [
          productData,
          imagesData,
          variantsData,
        ] = await Promise.all([
          getShopProduct(id),
          getProductImages(id).catch(() => []),
          getProductVariants(id).catch(() => []),
        ]);

        const productResult =
          productData?.product;

        setProduct(productResult);

        setImages(imagesData || []);
        setVariants(variantsData || []);

        // Main Image

        if (
          imagesData?.length > 0
        ) {

          const primary =
            imagesData.find(
              (image) =>
                image.isPrimary
            );

          setSelectedImage(
            primary?.imageUrl ||
            imagesData[0].imageUrl
          );

        } else {

          setSelectedImage(
            productResult?.primaryImage ||
            productResult?.image ||
            ""
          );

        }

        // Default Variant

        if (
          variantsData?.length > 0
        ) {

          const firstVariant =
            variantsData[0];

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

      } catch (error) {

        console.error(
          "Product Details Error:",
          error
        );

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
          .map((variant) => variant.color)
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
        (variant) =>
          variant.color === selectedColor
      )
      .map(
        (variant) => variant.size
      )
      .filter(Boolean);

  }, [
    variants,
    selectedColor,
  ]);

  // ==========================================
  // Update Selected Variant
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
        (item) =>
          item.color === selectedColor &&
          item.size === selectedSize
      );

    if (!variant) {

      return;

    }

    setSelectedVariant(
      variant
    );

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
  // Increase Quantity
  // ==========================================

  const increaseQuantity = () => {

    const maxStock =
      selectedVariant?.stock ??
      product?.stock ??
      0;

    if (quantity < maxStock) {

      setQuantity(
        (previous) =>
          previous + 1
      );

    }

  };

  // ==========================================
  // Decrease Quantity
  // ==========================================

  const decreaseQuantity = () => {

    if (quantity > 1) {

      setQuantity(
        (previous) =>
          previous - 1
      );

    }

  };

  // ==========================================
  // Add To Cart
  // ==========================================

  const handleAddToCart = async () => {

    if (!product) {

      return;

    }

    const stock =
      selectedVariant?.stock ??
      product.stock;

    if (stock <= 0) {

      return;

    }

    try {

      setAddedToCart(false);

      await addToCart(

        product._id,

        quantity,

        selectedVariant?._id

      );

      setAddedToCart(true);

    } catch (error) {

      console.error(
        "Add To Cart Error:",
        error
      );

    }

  };

  // ==========================================
  // Current Product Data
  // ==========================================

  const currentPrice =
    selectedVariant?.price ??
    product?.price ??
    0;

  const comparePrice =
    selectedVariant?.compareAtPrice ??
    product?.comparePrice ??
    0;

  const currentStock =
    selectedVariant?.stock ??
    product?.stock ??
    0;

  const currentImage =
    selectedImage ||
    selectedVariant?.image ||
    product?.primaryImage ||
    product?.image ||
    "";

  const isOutOfStock =
    currentStock <= 0;

  const isInactive =
    product?.status !== "active";

  const isUnavailable =
    isOutOfStock ||
    isInactive;

  // ==========================================
  // Loading
  // ==========================================

  if (isLoading) {

    return (

      <div className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <p className="text-gray-500">

            Loading product...

          </p>

        </div>

      </div>

    );

  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {

    return (

      <div className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-5xl px-6 py-24">

          <div className="rounded-xl border border-red-200 bg-red-50 p-8">

            <h2 className="text-xl font-bold text-red-700">

              {error}

            </h2>

            <Link
              to="/shop"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
            >

              Back To Shop

            </Link>

          </div>

        </div>

      </div>

    );

  }

  // ==========================================
  // Product Not Found
  // ==========================================

  if (!product) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <h2 className="text-2xl font-bold">

          Product Not Found

        </h2>

      </div>

    );

  }
    // ==========================================
  // Render
  // ==========================================

  return (

    <div className="min-h-screen bg-gray-50">

      {/* ====================================== */}
      {/* Breadcrumb */}
      {/* ====================================== */}

      <div className="border-b border-gray-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-4 text-sm">

          <Link
            to="/shop"
            className="text-gray-500 transition hover:text-black"
          >

            Shop

          </Link>

          <span className="text-gray-400">

            /

          </span>

          <span className="font-medium text-gray-900">

            {product.name}

          </span>

        </div>

      </div>

      {/* ====================================== */}
      {/* Product Details */}
      {/* ====================================== */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* ================================== */}
          {/* Product Gallery */}
          {/* ================================== */}

          <div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              {currentImage ? (

                <img
                  src={currentImage}
                  alt={product.name}
                  className="h-[600px] w-full object-cover"
                />

              ) : (

                <div className="flex h-[600px] items-center justify-center bg-gray-100">

                  <span className="text-gray-400">

                    No Image Available

                  </span>

                </div>

              )}

            </div>

            {images.length > 0 && (

              <div className="mt-5 grid grid-cols-5 gap-3">

                {images.map((image) => (

                  <button
                    key={image._id}
                    type="button"
                    onClick={() =>
                      setSelectedImage(
                        image.imageUrl
                      )
                    }
                    className={`overflow-hidden rounded-xl border-2 transition ${
                      selectedImage === image.imageUrl
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >

                    <img
                      src={image.imageUrl}
                      alt={
                        image.alt ||
                        product.name
                      }
                      className="h-24 w-full object-cover"
                    />

                  </button>

                ))}

              </div>

            )}

          </div>

          {/* ================================== */}
          {/* Product Information */}
          {/* ================================== */}

          <div className="flex flex-col">
                        {/* Category */}

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">

              {product.category?.name || product.category}

            </p>

            {/* Product Name */}

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">

              {product.name}

            </h1>

            {/* Short Description */}

            {product.shortDescription && (

              <p className="mt-5 text-lg leading-8 text-gray-600">

                {product.shortDescription}

              </p>

            )}

            {/* Price */}

            <div className="mt-8 flex items-center gap-4">

              <span className="text-4xl font-bold text-black">

                ${currentPrice}

              </span>

              {comparePrice > currentPrice && (

                <span className="text-2xl text-gray-400 line-through">

                  ${comparePrice}

                </span>

              )}

            </div>

            {/* Product Information */}

            <div className="mt-10 space-y-4 rounded-2xl border border-gray-200 bg-white p-6">

              {product.material && (

                <div className="flex items-center justify-between border-b pb-3">

                  <span className="font-medium text-gray-600">

                    Material

                  </span>

                  <span className="font-semibold">

                    {product.material}

                  </span>

                </div>

              )}

              {product.weight > 0 && (

                <div className="flex items-center justify-between border-b pb-3">

                  <span className="font-medium text-gray-600">

                    Weight

                  </span>

                  <span className="font-semibold">

                    {product.weight} g

                  </span>

                </div>

              )}

              <div className="flex items-center justify-between border-b pb-3">

                <span className="font-medium text-gray-600">

                  Stock

                </span>

                <span
                  className={`font-semibold ${
                    currentStock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >

                  {currentStock}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="font-medium text-gray-600">

                  Status

                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    product.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {product.status}

                </span>

              </div>

            </div>

            {/* Customizable */}

            {product.isCustomizable && (

              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">

                ✨ This product can be customized.

              </div>

            )}

            {/* Colors */}

            {colors.length > 0 && (

              <div className="mt-8">

                <h3 className="mb-3 text-lg font-semibold">

                  Color

                </h3>

                <div className="flex flex-wrap gap-3">

                  {colors.map((color) => (

                    <button
                      key={color}
                      type="button"
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      className={`rounded-xl border px-5 py-3 transition ${
                        selectedColor === color
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white hover:border-black"
                      }`}
                    >

                      {color}

                    </button>

                  ))}

                </div>

              </div>

            )}

            {/* Sizes */}

            {sizes.length > 0 && (

              <div className="mt-8">

                <h3 className="mb-3 text-lg font-semibold">

                  Size

                </h3>

                <div className="flex flex-wrap gap-3">

                  {sizes.map((size) => (

                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      className={`rounded-xl border px-5 py-3 transition ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white hover:border-black"
                      }`}
                    >

                      {size}

                    </button>

                  ))}

                </div>

              </div>

            )}
                        {/* Quantity */}

            {!isUnavailable && (

              <div className="mt-8">

                <label className="mb-3 block font-semibold">

                  Quantity

                </label>

                <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={
                      quantity <= 1 ||
                      isCartLoading
                    }
                    className="px-5 py-3 transition hover:bg-gray-100 disabled:opacity-40"
                  >

                    −

                  </button>

                  <span className="min-w-16 border-x border-gray-300 px-6 py-3 text-center font-medium">

                    {quantity}

                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      quantity >= currentStock ||
                      isCartLoading
                    }
                    className="px-5 py-3 transition hover:bg-gray-100 disabled:opacity-40"
                  >

                    +

                  </button>

                </div>

              </div>

            )}

            {/* Add To Cart */}

            <div className="mt-8">

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={
                  isUnavailable ||
                  isCartLoading
                }
                className="w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {isCartLoading
                  ? "Adding..."
                  : isOutOfStock
                  ? "Out Of Stock"
                  : "Add To Cart"}

              </button>

              {addedToCart && (

                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-green-700">

                  Product added to cart successfully.

                </div>

              )}

            </div>

            {/* Description */}

            <div className="mt-10 border-t border-gray-200 pt-8">

              <h2 className="mb-4 text-xl font-bold">

                Description

              </h2>

              <p className="leading-8 text-gray-600">

                {product.description}

              </p>

            </div>

            {/* Care Instructions */}

            {product.careInstructions && (

              <div className="mt-10 border-t border-gray-200 pt-8">

                <h2 className="mb-4 text-xl font-bold">

                  Care Instructions

                </h2>

                <p className="leading-8 text-gray-600">

                  {product.careInstructions}

                </p>

              </div>

            )}

            {/* Tags */}

            {product.tags?.length > 0 && (

              <div className="mt-10 border-t border-gray-200 pt-8">

                <h2 className="mb-4 text-xl font-bold">

                  Tags

                </h2>

                <div className="flex flex-wrap gap-3">

                  {product.tags.map((tag) => (

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
            
                   {/* SEO */}

            {product.seoDescription && (

              <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">

                <h3 className="text-lg font-semibold text-gray-900">

                  About This Product

                </h3>

                <p className="mt-3 leading-7 text-gray-600">

                  {product.seoDescription}

                </p>

              </div>

            )}

            {/* Preparation */}

            {product.preparationDays > 0 && (

              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">

                <p className="font-medium text-blue-700">

                  Estimated preparation time:
                  {" "}
                  {product.preparationDays}
                  {" "}
                  day(s)

                </p>

              </div>

            )}

            {/* Continue Shopping */}

            <Link
              to="/shop"
              className="mt-10 inline-block text-sm font-medium text-gray-500 underline underline-offset-4 hover:text-black"
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
          