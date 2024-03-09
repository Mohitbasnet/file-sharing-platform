import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <Image
        src="/assets/empty.svg"
        alt="Empty"
        width={300}
        height={300}
        className="h-96 w-96"
      />
    </div>
  );
};

export default Empty;
