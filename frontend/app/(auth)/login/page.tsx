/* eslint-disable @next/next/no-img-element */
"use client";
import showToast from "@/lib/toastNotification";
import Link from "next/link";
import React from "react";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = () => {
    if (!email || !password) {
      return showToast("warning", "All fields are required.");
    }

    showToast("success", "Logged in successfully.");
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="hidden md:flex relative h-32 items-end bg-gray-900 dark:bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/assets/login.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div>
              <h1 className="text-3xl text-indigo-800 dark:text-gray-200 font-bold">
                Log into KeepSafe
              </h1>
              <p className="mt-2">Welcome back 👋🏻</p>
            </div>
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
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

              <div className="col-span-6">
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

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  onClick={handleLogin}
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-gray-100 transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                  Login to KeepSafe
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Not a member yet?
                  <Link href="/register">
                    <span className="ml-1 text-gray-700 dark:text-gray-100 underline">
                      Register
                    </span>
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
