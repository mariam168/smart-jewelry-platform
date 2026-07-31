
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart as addToCartApi,
 updateCartItem as updateCartApi,
   removeCartItem as removeFromCartApi,
   clearCart as clearCartApi,
} from "../features/cart/services/cartApi";


export const CartContext =
  createContext(null);


// ==========================================
// Provider
// ==========================================

const CartProvider = ({
  children,
}) => {

  const [
    cart,
    setCart,
  ] = useState({

    items: [],

  });


  const [
    isCartOpen,
    setIsCartOpen,
  ] = useState(false);


  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  // ========================================
  // Load Cart
  // ========================================

  const loadCart =
    async () => {

      try {

        setIsLoading(
          true
        );


        const response =
          await getCart();


        setCart(
          response.data
        );


      } catch (error) {

        console.error(
          "Load Cart Error:",
          error
        );

      } finally {

        setIsLoading(
          false
        );

      }

    };


  // ========================================
  // Load Cart On Start
  // ========================================

  useEffect(() => {

    loadCart();

  }, []);


  // ========================================
  // Add To Cart
  // ========================================

  const addToCart =
    async (
      productId,
      quantity = 1
    ) => {

      try {

        setIsLoading(
          true
        );


        const response =
          await addToCartApi(

            productId,

            quantity

          );


        setCart(
          response.data
        );


        setIsCartOpen(
          true
        );


        return response;

      } catch (error) {

        console.error(
          "Add To Cart Error:",
          error
        );

        throw error;

      } finally {

        setIsLoading(
          false
        );

      }

    };


  // ========================================
  // Update Quantity
  // ========================================

  const updateQuantity =
    async (
      productId,
      quantity
    ) => {

      if (
        quantity < 1
      ) {

        return;

      }


      try {

        const response =
          await updateCartApi(

            productId,

            quantity

          );


        setCart(
          response.data
        );

      } catch (error) {

        console.error(
          "Update Cart Error:",
          error
        );

      }

    };


  // ========================================
  // Remove Item
  // ========================================

  const removeFromCart =
    async (
      productId
    ) => {

      try {

        const response =
          await removeFromCartApi(
            productId
          );


        setCart(
          response.data
        );

      } catch (error) {

        console.error(
          "Remove Cart Item Error:",
          error
        );

      }

    };


  // ========================================
  // Clear Cart
  // ========================================

  const clearCart =
    async () => {

      try {

        await clearCartApi();


        setCart({

          items: [],

        });

      } catch (error) {

        console.error(
          "Clear Cart Error:",
          error
        );

      }

    };


  // ========================================
  // Open Cart
  // ========================================

  const openCart =
    () => {

      setIsCartOpen(
        true
      );

    };


  // ========================================
  // Close Cart
  // ========================================

  const closeCart =
    () => {

      setIsCartOpen(
        false
      );

    };


  // ========================================
  // Cart Items
  // ========================================

  const cartItems =
    cart?.items || [];


  // ========================================
  // Cart Count
  // ========================================

  const cartCount =
    cartItems.reduce(

      (
        total,
        item
      ) => {

        return (
          total +
          item.quantity
        );

      },

      0

    );


  // ========================================
  // Cart Total
  // ========================================

  const cartTotal =
    cartItems.reduce(

      (
        total,
        item
      ) => {

        const price =
          Number(
            item.product?.price ||
            0
          );


        return (
          total +
          price *
          item.quantity
        );

      },

      0

    );


  // ========================================
  // Context Value
  // ========================================

  const value = {

    cart,

    cartItems,

    cartCount,

    cartTotal,

    isCartOpen,

    isLoading,

    addToCart,

    updateQuantity,

    removeFromCart,

    clearCart,

    openCart,

    closeCart,

    loadCart,

  };


  return (

    <CartContext.Provider
      value={value}
    >

      {children}

    </CartContext.Provider>

  );

};


export const useCart =
  () => {

    const context =
      useContext(
        CartContext
      );


    if (!context) {

      throw new Error(
        "useCart must be used inside CartProvider"
      );

    }


    return context;

  };


export default CartProvider;
