import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Secure Your Files
            <strong className="font-extrabold text-red-700 sm:block">
              {" "}
              Simplify Your Sharing with KeepSafe.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="destructive" size={"lg"}>
              Get Started
            </Button>

            <Button variant="secondary" size={"lg"}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
