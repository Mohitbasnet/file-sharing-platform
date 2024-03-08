"use client";
import { apiLogin } from "@/lib/apiRequests";
import showToast from "@/lib/toastNotification";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IToken {
  user_id: string;
  email: string;
  is_admin: boolean;
  is_teacher: boolean;
}
interface DecodedToken {
  exp: number;
  user_id: string;
  email: string;
  role: string;
}

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleLogin = async () => {
    if (!email || !password) {
      return showToast("warning", "All fields are required.");
    }

    try {
      const response = await apiLogin({ email, password });
      console.log(response);
      if (response.status === 200) {
        const { access, refresh } = response.data;
        setCookie("access", access, {
          expires: new Date(Date.now() + 86400000),
          secure: true,
          sameSite: "strict",
        });
        setCookie("refresh", refresh, {
          expires: new Date(Date.now() + 86400000),
          secure: true,
          sameSite: "strict",
        });
        const decodedToken = jwtDecode<DecodedToken>(access);
        const { user_id } = decodedToken;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("access", access);
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        return showToast("error", "Invalid credentials.");
      }
    }
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="hidden md:flex relative h-32 items-end bg-gray-900 dark:bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            width={1920}
            height={1080}
            alt=""
            src="/assets/login.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div>
              <h1 className="text-3xl text-zinc-800 dark:text-gray-200 font-bold">
                Log into KeepSafe
              </h1>
              <p className="mt-2">Welcome back 👋🏻</p>
            </div>
            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 w-96"
              method="post"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-span-6">
                <Label htmlFor="email">Your email address</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>

              <div className="col-span-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  onClick={handleLogin}
                  className="w-full dark:bg-slate-300"
                  type="button"
                  size={"lg"}
                >
                  Login to KeepSafe
                </Button>
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/register">
                    <span className="text-indigo-800 dark:text-indigo-400">
                      Register
                    </span>
                  </Link>
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
