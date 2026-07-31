
import {
  createContext,
  useEffect,
  useState,
} from "react";


// ==========================================
// Create Auth Context
// ==========================================

export const AuthContext =
  createContext(null);


// ==========================================
// Auth Provider
// ==========================================

const AuthProvider = ({
  children,
}) => {

  // ========================================
  // User State
  // ========================================

  const [
    user,
    setUser,
  ] = useState(() => {

    const savedUser =
      localStorage.getItem(
        "smart_jewelry_user"
      );

    if (!savedUser) {
      return null;
    }

    try {

      return JSON.parse(
        savedUser
      );

    } catch (error) {

      console.error(
        "Failed to parse saved user:",
        error
      );

      return null;

    }

  });


  // ========================================
  // Loading State
  // ========================================

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  // ========================================
  // Save User
  // ========================================

  useEffect(() => {

    if (user) {

      localStorage.setItem(
        "smart_jewelry_user",
        JSON.stringify(user)
      );

    } else {

      localStorage.removeItem(
        "smart_jewelry_user"
      );

    }

  }, [user]);


  // ========================================
  // Login
  // ========================================

  const login = (
    userData
  ) => {

    setUser(
      userData
    );

  };


  // ========================================
  // Logout
  // ========================================

  const logout = async () => {

    try {

      setIsLoading(
        true
      );


      // لو عندك API للـLogout
      // ممكن نستدعيه هنا لاحقًا

      setUser(
        null
      );

      localStorage.removeItem(
        "smart_jewelry_user"
      );

      localStorage.removeItem(
        "smart_jewelry_token"
      );


    } catch (error) {

      console.error(
        "Logout Error:",
        error
      );

    } finally {

      setIsLoading(
        false
      );

    }

  };


  // ========================================
  // Check Authentication
  // ========================================

  const isAuthenticated =
    Boolean(user);


  // ========================================
  // Context Value
  // ========================================

  const contextValue = {

    user,

    setUser,

    login,

    logout,

    isAuthenticated,

    isLoading,

  };


  // ========================================
  // Provider
  // ========================================

  return (

    <AuthContext.Provider
      value={
        contextValue
      }
    >

      {children}

    </AuthContext.Provider>

  );

};


// ==========================================
// Export Provider
// ==========================================

export default AuthProvider;
