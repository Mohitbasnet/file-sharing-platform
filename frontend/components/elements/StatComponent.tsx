import React from "react";

const StatComponent = () => {
  return (
    <section className="bg-white dark:bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Trusted by Several Businesses
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-200 sm:text-xl">
            At KeepSafe, we pride ourselves on being the trusted choice of
            numerous businesses worldwide. Our platform offers robust security
            measures, ensuring the confidentiality and integrity of your
            valuable data.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-200">
                Individual Users
              </dt>

              <dd className="text-4xl font-extrabold text-red-700 md:text-5xl">
                2k+
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-200">
                Organizations
              </dt>

              <dd className="text-4xl font-extrabold text-red-700 md:text-5xl">
                50+
              </dd>
            </div>

            <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-200">
                Countries
              </dt>

              <dd className="text-4xl font-extrabold text-red-700 md:text-5xl">
                10+
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default StatComponent;
