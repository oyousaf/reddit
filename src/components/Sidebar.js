import React, { useState } from "react";
import { FiChevronUp } from "react-icons/fi";

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
    <div className="flex flex-col text-center">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-white text-xl font-semibold uppercase">Popular</h2>
        <button
          className="md:hidden text-white focus:outline-none ml-2 text-2xl"
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: `rotate(${isListVisible ? 180 : 0}deg)`,
          }}
          onClick={toggleListVisibility}
        >
          <FiChevronUp />
        </button>
      </div>
      <div className={`md:flex ${isListVisible ? "block" : "hidden"}`}>
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
