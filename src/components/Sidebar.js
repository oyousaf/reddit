import React from "react";

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
  return (
    <>
    <h2 className="text-white text-xl font-semibold mb-4 uppercase">
    Popular
    </h2>
    <ul className="space-y-2">
      {popularSubreddits.map((subreddit) => (
        <li
          key={subreddit}
          className="text-white hover:text-gray-300 cursor-pointer"
        >
          r/{subreddit}
        </li>
      ))}
    </ul>
    </>
  );
};

export default Sidebar;