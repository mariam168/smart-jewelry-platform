import { Link, NavLink, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";

import { CartContext } from "../../context/CartContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const { cartItems, openCart } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,

    0,
  );

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `
        text-sm
        font-medium
        transition
        ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
      `;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link to="/" className="text-2xl font-bold tracking-[0.2em]">
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

        {/* Actions */}

        <div className="flex items-center gap-4">
          {/* Account */}

          {user ? (
            <div className="hidden items-center gap-4 sm:flex">
              <Link
                to="/account"
                className="text-sm font-medium text-gray-600 hover:text-black"
              >
                My Account
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-gray-500 hover:text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden text-sm font-medium text-gray-600 hover:text-black sm:block"
            >
              Login
            </Link>
          )}

          {/* Cart */}

          <button
            type="button"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
            aria-label="Open cart"
          >
            <span className="text-xl">🛒</span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Contact
            </NavLink>

            {!user && (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium"
              >
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
