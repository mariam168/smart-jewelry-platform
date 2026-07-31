
import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  adminLogin,
} from "../services/adminAuthApi";


const AdminLoginPage = () => {

  const navigate =
    useNavigate();


  const [
    formValues,
    setFormValues,
  ] = useState({
    email: "",
    password: "",
  });


  const [
    error,
    setError,
  ] = useState("");


  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  const handleChange =
    (event) => {

      const {
        name,
        value,
      } = event.target;


      setFormValues(
        (previous) => ({
          ...previous,

          [name]:
            value,
        })
      );

      setError("");
    };


  const handleSubmit =
    async (event) => {

      event.preventDefault();


      try {

        setIsLoading(
          true
        );

        setError("");


        await adminLogin(
          formValues
        );


        navigate(
          "/admin"
        );

      } catch (error) {

        setError(
          error?.response?.data
            ?.message ||
            "Admin login failed."
        );

      } finally {

        setIsLoading(
          false
        );

      }
    };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 text-center">

          <h1 className="text-2xl font-semibold">
            Smart Jewelry
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Admin Dashboard
          </p>

        </div>


        {error && (

          <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">

            {error}

          </div>

        )}


        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >

          <div>

            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                formValues.email
              }
              onChange={
                handleChange
              }
              required
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              placeholder="admin@smartjewelry.com"
            />

          </div>


          <div>

            <label className="text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={
                formValues.password
              }
              onChange={
                handleChange
              }
              required
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              placeholder="Enter your password"
            />

          </div>


          <button
            type="submit"
            disabled={
              isLoading
            }
            className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-50"
          >

            {isLoading
              ? "Signing in..."
              : "Sign in"}

          </button>

        </form>

      </div>

    </div>
  );
};


export default AdminLoginPage;
