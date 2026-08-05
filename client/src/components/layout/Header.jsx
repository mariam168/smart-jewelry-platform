import { useContext, useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  FaBars,
  FaTimeline,
  FaUsers,
  FaBagShopping,
  FaArrowRightToBracket,
  FaArrowRightFromBracket,
} from "react-icons/fa6";

import { useAuth } from "../../features/auth/context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const { cartItems, openCart } =
    useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-all duration-300
    ${
      isActive
        ? "text-black after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-black"
        : "text-gray-500 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-[0.25em] transition hover:scale-105"
        >
          SMART JEWELRY
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to={
                  user?.role?.name === "admin"
                    ? "/admin"
                    : "/account"
                }
                className="hidden items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white sm:flex"
              >
                <FaUsers className="text-lg" />

                {user?.role?.name === "admin"
                  ? "Dashboard"
                  : "My Account"}
              </Link>

              <button
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white sm:flex"
              >
                <FaArrowRightFromBracket />

                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-gray-900 sm:flex"
            >
              <FaArrowRightToBracket />

              Login
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={openCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition hover:border-black hover:bg-black hover:text-white"
          >
            <FaBagShopping className="text-lg" />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100 md:hidden"
          >
            {isMenuOpen ? (
              <FaTimeline className="text-lg" />
            ) : (
              <FaBars className="text-lg" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <NavLink
              to="/"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={navLinkClass}
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className={navLinkClass}
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <Link
                  to={
                    user?.role?.name === "admin"
                      ? "/admin"
                      : "/account"
                  }
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex items-center gap-2 font-medium"
                >
                  <FaUsers />
                  {user?.role?.name === "admin"
                    ? "Dashboard"
                    : "My Account"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left font-medium text-red-500"
                >
                  <FaArrowRightFromBracket />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() =>
                  setIsMenuOpen(false)
                }
                className="flex items-center gap-2 font-medium"
              >
                <FaArrowRightToBracket />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;