import React from "react";

const Sidebar = () => {
  const popularSubreddits = [
    "reactjs",
    "programming",
    "javascript",
    "redux",
    "tailwind",
  ];
  return (
    <ul className="space-y-2">
      {popularSubreddits.map((subreddit) => (
        <li
          key={subreddit}
          className="text-white hover:text-gray-300 cursor-pointer"
        >
          {subreddit}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
