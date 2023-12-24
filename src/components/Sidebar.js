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
    <div className="flex flex-col text-center items-center">
      <div className="flex">
        <h2 className="text-white text-xl font-semibold mb-4 uppercase">
          Popular
        </h2>
        <button
          className="md:hidden text-white focus:outline-none ml-2 text-2xl"
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: isListVisible ? "rotate(180deg)" : "rotate(0deg)",
          }}
          onClick={toggleListVisibility}
        >
          {isListVisible ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>
      <div className="md:flex">
        <ul
          className={`space-y-2 md:flex flex-col ${
            isListVisible ? "block" : "hidden"
          }`}
        >
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
