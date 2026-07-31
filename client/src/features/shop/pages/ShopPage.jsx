
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import ShopHeader from "../components/ShopHeader";
import ShopFilters from "../components/ShopFilters";
import ProductGrid from "../components/ProductGrid";

import {
  getShopProducts,
} from "../services/shopApi";


const ShopPage = () => {
  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    category,
    setCategory,
  ] = useState("all");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response =
          await getShopProducts();

        setProducts(
          response?.data?.products || []
        );
      } catch (error) {
        console.error(
          "Shop Products Error:",
          error
        );

        setError(
          error?.response?.data?.message ||
            "Failed to load products."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);


  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) => {
          const matchesSearch =
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            product.description
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            category === "all" ||
            product.category === category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      products,
      search,
      category,
    ]);


  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader
        productsCount={
          filteredProducts.length
        }
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <ShopFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="py-24 text-center">
            <p className="text-sm text-gray-500">
              Loading our collection...
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <ProductGrid
              products={
                filteredProducts
              }
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;

