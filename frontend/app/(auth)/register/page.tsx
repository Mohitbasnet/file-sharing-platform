"use client";
import { apiRegister } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");
  const handleCreateAccount = async () => {
    if (!fullName || !email || !password || !passwordConfirmation) {
      return showToast("warning", "All fields are required.");
    }
    if (fullName.length < 3) {
      return showToast("warning", "Full name must be at least 3 characters.");
    }
    if (password.length < 6) {
      return showToast("warning", "Password must be at least 6 characters.");
    }
    if (password !== passwordConfirmation) {
      return showToast("warning", "Passwords do not match.");
    }
    try {
      const response = await apiRegister({
        email,
        full_name: fullName,
        password,
      });
      if (response.status === 201) {
        showToast("success", "Account created successfully.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
      if (response.status === 400) {
        showToast("error", "Email already exists.");
      }
    } catch (error: any) {
      if (error?.response?.data?.email[0].length > 0) {
        showToast("error", error?.response?.data?.email[0]);
      } else {
        showToast("error", "Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <div className="hidden md:flex relative h-32 items-end bg-gray-900 dark:bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            width={1920}
            height={1080}
            alt=""
            src="/assets/register.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </div>

        <div className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div>
              <h1 className="text-3xl text-indigo-800 dark:text-gray-200 font-bold">
                Join KeepSafe today
              </h1>
              <p className="mt-2">
                Welcome to KeepSafe. Please fill in the form to create an
                account
              </p>
            </div>
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-span-6">
                <label
                  htmlFor="FullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  Full Name
                </label>

                <input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  id="FullName"
                  name="full_name"
                  className="w-full py-2 px-2 mt-1 ring-1 rounded ring-gray-200 focus:ring-indigo-600 active:ring-indigo-600 dark:ring-gray-400"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="Email"
                  name="email"
                  className="w-full py-2 px-2 mt-1 ring-1 rounded ring-gray-200 focus:ring-indigo-600 active:ring-indigo-600 dark:ring-gray-400"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="Password"
                  name="password"
                  className="w-full py-2 px-2 mt-1 ring-1 rounded ring-gray-200 focus:ring-indigo-600 active:ring-indigo-600 dark:ring-gray-400"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                >
                  Password Confirmation
                </label>

                <input
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="w-full py-2 px-2 mt-1 ring-1 rounded ring-gray-200 focus:ring-indigo-600 active:ring-indigo-600 dark:ring-gray-400"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={handleCreateAccount}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-gray-100 transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link href="/login">
                    <span className="ml-1 text-gray-700 dark:text-gray-100 underline">
                      Log in
                    </span>
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
