import React from "react";

const Spinner = () => {
  return (
    <div className="fixed z-10 inset-0 bg-black flex items-center justify-center opacity-70">
      <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
