"use client";
import { apiRegister } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
        setFullName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
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
              <h1 className="text-3xl text-zinc-900 dark:text-gray-200 font-bold">
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
                <Label htmlFor="FullName">Full Name</Label>
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  id="FullName"
                  name="full_name"
                  placeholder="Full Name"
                />
              </div>

              <div className="col-span-6">
                <Label htmlFor="Email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="Email"
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="Password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="Password"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="PasswordConfirmation">
                  Password Confirmation
                </Label>
                <Input
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  placeholder="Password Confirmation"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  onClick={handleCreateAccount}
                  className="w-full dark:bg-slate-300"
                  type="button"
                  size={"lg"}
                >
                  Create Account
                </Button>
              </div>
            </form>
            <p className="pt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <Link href="/login">
                <span className="text-indigo-800 dark:text-indigo-400">
                  {" "}
                  Login
                </span>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
