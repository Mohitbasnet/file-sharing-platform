import React from "react";
import ThemeSwitcher from "../ThemeSwitcher";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="">
      <nav className="container mx-auto py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">KeepSafe</h1>
        </div>
        <div>
          <ul className="flex items-center space-x-16">
            <li className="cursor-pointer hover:opacity-80">Home</li>
            <li className="cursor-pointer hover:opacity-80">About Us</li>
            <li className="cursor-pointer hover:opacity-80">Services</li>
            <li className="cursor-pointer hover:opacity-80">Testimonials</li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <Link href={"/login"}>
            <Button variant="default">Login</Button>
          </Link>{" "}
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;
