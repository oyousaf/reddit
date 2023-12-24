import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Sidebar = () => {
  const popularSubreddits = [
    "funny",
    "AskReddit",
    "gaming",
    "aww",
    "worldnews",
    "todayilearned",
    "Music",
    "movies",
    "science",
    "pics",
  ];

  const [isListVisible, setListVisibility] = useState(false);

  const toggleListVisibility = () => {
    setListVisibility(!isListVisible);
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-white text-xl font-semibold uppercase mr-2">
          Popular
        </h2>
        <button
          className="text-white focus:outline-none text-2xl transition-transform transform"
          onClick={toggleListVisibility}
        >
          {isListVisible ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>
      <div
        className={`md:flex transition-max-h ease-in-out duration-300 overflow-hidden ${
          isListVisible ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="space-y-2 md:flex flex-col">
          {popularSubreddits.map((subreddit) => (
            <li
              key={subreddit}
              className="text-white hover:text-gray-300 cursor-pointer"
            >
              r/{subreddit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
