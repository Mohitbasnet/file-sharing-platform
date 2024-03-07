import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold">KeepSafe</h1>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center leading-relaxed text-gray-500 dark:text-gray-200">
          Our team feels confident knowing our sensitive data is protected. Join
          countless satisfied customers and experience the reliability of
          KeepSafe for yourself.
        </p>
        <p className="text-center mt-5">
          Copyright SafeKeep &copy;pokhrelgopal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
