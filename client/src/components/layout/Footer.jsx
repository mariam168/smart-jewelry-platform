
import {
  Link,
} from "react-router-dom";


const Footer = () => {

  return (

    <footer className="border-t border-gray-200 bg-black text-white">


      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">


        {/* Brand */}

        <div className="md:col-span-2">

          <Link
            to="/"
            className="text-2xl font-bold tracking-[0.2em]"
          >

            SMART JEWELRY

          </Link>


          <p className="mt-6 max-w-md text-sm leading-7 text-gray-400">

            Discover beautifully designed jewelry
            that combines timeless elegance with
            modern technology.

          </p>

        </div>


        {/* Navigation */}

        <div>

          <h3 className="text-sm font-semibold uppercase tracking-wider">

            Explore

          </h3>


          <div className="mt-6 flex flex-col gap-4">

            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white"
            >

              Home

            </Link>


            <Link
              to="/shop"
              className="text-sm text-gray-400 hover:text-white"
            >

              Shop

            </Link>


            <Link
              to="/about"
              className="text-sm text-gray-400 hover:text-white"
            >

              About Us

            </Link>


            <Link
              to="/contact"
              className="text-sm text-gray-400 hover:text-white"
            >

              Contact

            </Link>

          </div>

        </div>


        {/* Customer */}

        <div>

          <h3 className="text-sm font-semibold uppercase tracking-wider">

            Customer Care

          </h3>


          <div className="mt-6 flex flex-col gap-4">

            <Link
              to="/account"
              className="text-sm text-gray-400 hover:text-white"
            >

              My Account

            </Link>


            <Link
              to="/orders"
              className="text-sm text-gray-400 hover:text-white"
            >

              My Orders

            </Link>


            <Link
              to="/shipping"
              className="text-sm text-gray-400 hover:text-white"
            >

              Shipping & Returns

            </Link>


            <Link
              to="/privacy"
              className="text-sm text-gray-400 hover:text-white"
            >

              Privacy Policy

            </Link>

          </div>

        </div>

      </div>


      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">

          <p>

            © {new Date().getFullYear()}
            Smart Jewelry.
            All rights reserved.

          </p>


          <div className="flex gap-6">

            <span>
              Instagram
            </span>

            <span>
              Facebook
            </span>

            <span>
              TikTok
            </span>

          </div>

        </div>

      </div>

    </footer>

  );

};


export default Footer;
