import React from "react";
import image1 from "../../public/work-icon-1.svg";
import image2 from "../../public/work-icon-2.svg";
import image3 from "../../public/work-icon-3.svg";

const Ads = () => {
  return (
    <div className="px-4 text-center">
      <div className="bg-white p-7 mt-7 rounded-sm">
        <h3 className="text-2xl">How It Works</h3>
        <p className="">Follow these 3 steps to book your place</p>
      </div>
      <div className="md:flex gap-4">
        <div className="bg-white mt-7 rounded-md py-6 px-9">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="max-w-16 max-h-16 mx-auto text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <h3 className="icon-svg mt-3 text-2xl font-extrabold text-red-400">
              01. Search for Location
            </h3>

            <br />
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mollis et sem sed sollicitudin. Donec non odio…
            </p>
          </div>
        </div>
        <div className="bg-white mt-7 py-6 px-9 rounded-md">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="max-w-16 max-h-16 mx-auto text-orange-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <h3 className="icon-svg mt-3 text-2xl font-extrabold text-orange-400">
              02. Select Property Type
            </h3>
            <br />
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mollis et sem sed sollicitudin. Donec non odio…
            </p>
          </div>
        </div>
        <div className="bg-white mt-7 py-6 px-9 rounded-md">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="max-w-16 max-h-16 mx-auto text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>

            <h3 className="icon-svg mt-3 text-2xl font-extrabold text-green-500">
              03. Book Your Property
            </h3>
            <br />
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mollis et sem sed sollicitudin. Donec non odio…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
