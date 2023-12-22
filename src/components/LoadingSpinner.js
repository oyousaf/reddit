import React from "react";
import RedditLogo from "../logo.svg"; // Replace with the actual path

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center rounded-md">
        <img src={RedditLogo} alt="Reddit Logo" className="w-24 h-24 mb-4 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
