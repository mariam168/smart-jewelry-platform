
import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getShopProduct,
} from "../services/shopApi";

import {
  useCart,
} from "../../../context/CartContext";


const ProductDetailsPage = () => {

  const {
    id,
  } = useParams();


  // ==========================================
  // Product State
  // ==========================================

  const [
    product,
    setProduct,
  ] = useState(null);


  // ==========================================
  // Quantity State
  // ==========================================

  const [
    quantity,
    setQuantity,
  ] = useState(1);


  // ==========================================
  // Product Loading State
  // ==========================================

  const [
    isProductLoading,
    setIsProductLoading,
  ] = useState(true);


  // ==========================================
  // Error State
  // ==========================================

  const [
    error,
    setError,
  ] = useState("");


  // ==========================================
  // Cart Context
  // ==========================================

  const {
    addToCart,
    isLoading: isCartLoading,
  } = useCart();


  // ==========================================
  // Added To Cart State
  // ==========================================

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

        setIsProductLoading(true);

        setError("");

        setAddedToCart(false);

        setQuantity(1);


        const response =
          await getShopProduct(id);


        setProduct(
          response?.data?.product
        );


      } catch (error) {

        console.error(
          "Product Details Error:",
          error
        );


        setError(
          error?.response
            ?.data
            ?.message ||
          "Failed to load product."
        );


      } finally {

        setIsProductLoading(false);

      }

    };


    if (id) {

      loadProduct();

    }

  }, [id]);


  // ==========================================
  // Increase Quantity
  // ==========================================

  const increaseQuantity = () => {

    if (!product) {
      return;
    }


    if (
      quantity <
      product.stock
    ) {

      setQuantity(
        (previousQuantity) =>
          previousQuantity + 1
      );

    }

  };


  // ==========================================
  // Decrease Quantity
  // ==========================================

  const decreaseQuantity = () => {

    if (
      quantity > 1
    ) {

      setQuantity(
        (previousQuantity) =>
          previousQuantity - 1
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


    if (
      product.stock <= 0
    ) {

      return;

    }


    try {

      setAddedToCart(false);


      const cartItem = {

        productId:
          product._id,

        name:
          product.name,

        price:
          product.price,

        quantity:
          quantity,

      };


      console.log(
        "Add To Cart:",
        cartItem
      );


      // Add selected quantity
      await addToCart(
        product._id,
        quantity
      );


      // Show success message
      setAddedToCart(true);


    } catch (error) {

      console.error(
        "Add To Cart Error:",
        error
      );

    }

  };


  // ==========================================
  // Product Loading
  // ==========================================

  if (isProductLoading) {

    return (

      <div className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <p className="text-sm text-gray-500">

            Loading product details...

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

        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center">

            <h1 className="text-xl font-semibold text-red-700">

              Something went wrong

            </h1>


            <p className="mt-3 text-sm text-red-600">

              {error}

            </p>


            <Link
              to="/shop"
              className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white"
            >

              Back to Shop

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

      <div className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-7xl px-6 py-24 text-center">

          <h1 className="text-2xl font-bold text-gray-900">

            Product Not Found

          </h1>


          <p className="mt-3 text-sm text-gray-500">

            The product you're looking for
            does not exist.

          </p>


          <Link
            to="/shop"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white"
          >

            Back to Shop

          </Link>

        </div>

      </div>

    );

  }


  // ==========================================
  // Product Status
  // ==========================================

  const isOutOfStock =
    product.stock <= 0;


  const isInactive =
    product.status !==
    "active";


  const isUnavailable =
    isOutOfStock ||
    isInactive;


  // ==========================================
  // Render
  // ==========================================

  return (

    <div className="min-h-screen bg-gray-50">


      {/* ====================================== */}
      {/* Breadcrumb */}
      {/* ====================================== */}

      <div className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-4">

          <div className="flex items-center gap-2 text-sm">

            <Link
              to="/shop"
              className="text-gray-500 hover:text-black"
            >

              Shop

            </Link>


            <span className="text-gray-300">

              /

            </span>


            <span className="text-gray-900">

              {product.name}

            </span>

          </div>

        </div>

      </div>


      {/* ====================================== */}
      {/* Product Details */}
      {/* ====================================== */}

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-12 lg:grid-cols-2">


          {/* ================================== */}
          {/* Product Image */}
          {/* ================================== */}

          <div>

            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gray-100">

              {product.image ? (

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />

              ) : (

                <div className="text-center">

                  <p className="text-sm text-gray-400">

                    Product Image

                  </p>

                </div>

              )}


              {isOutOfStock && (

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">

                  <span className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900">

                    Out of Stock

                  </span>

                </div>

              )}

            </div>

          </div>


          {/* ================================== */}
          {/* Product Information */}
          {/* ================================== */}

          <div className="flex flex-col justify-center">


            {/* Category */}

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">

              {product.category}

            </p>


            {/* Product Name */}

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">

              {product.name}

            </h1>


            {/* Price */}

            <p className="mt-6 text-2xl font-bold text-gray-900">

              ${product.price}

            </p>


            {/* Description */}

            <div className="mt-8 border-t border-gray-200 pt-8">

              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">

                Description

              </h2>


              <p className="mt-4 leading-7 text-gray-600">

                {product.description}

              </p>

            </div>


            {/* Stock */}

            <div className="mt-8">

              {isOutOfStock ? (

                <p className="text-sm font-medium text-red-600">

                  This product is currently
                  out of stock.

                </p>

              ) : (

                <p className="text-sm font-medium text-green-600">

                  {product.stock} items
                  available.

                </p>

              )}

            </div>


            {/* Quantity */}

            {!isUnavailable && (

              <div className="mt-8">

                <label className="mb-3 block text-sm font-semibold text-gray-900">

                  Quantity

                </label>


                <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={
                      quantity <= 1 ||
                      isCartLoading
                    }
                    className="px-5 py-3 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >

                    −

                  </button>


                  <span className="min-w-14 border-x border-gray-300 px-5 py-3 text-center text-sm font-medium">

                    {quantity}

                  </span>


                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    disabled={
                      quantity >=
                        product.stock ||
                      isCartLoading
                    }
                    className="px-5 py-3 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
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
                onClick={
                  handleAddToCart
                }
                disabled={
                  isUnavailable ||
                  isCartLoading
                }
                className="w-full rounded-lg bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {isCartLoading
                  ? "Adding..."
                  : isOutOfStock
                    ? "Out of Stock"
                    : "Add to Cart"}

              </button>


              {addedToCart && (

                <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-700">

                  Product added to cart
                  successfully.

                </div>

              )}

            </div>


            {/* Back To Shop */}

            <Link
              to="/shop"
              className="mt-6 text-center text-sm font-medium text-gray-500 underline underline-offset-4 hover:text-black"
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
