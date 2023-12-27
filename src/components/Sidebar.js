import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setPosts } from "../redux/actions";
import { fetchPosts } from "../services/redditService";

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

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSubredditList = () => {
    setIsOpen(!isOpen);
  };

  const handleSubredditClick = async (subreddit) => {
    try {
      const data = await fetchPosts(subreddit);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching subreddit posts:", error);
    }
  };

  return (
    <div className="flex flex-col text-center">
      <div className="flex justify-center items-center mb-4">
        <h2 className="text-white text-xl font-semibold uppercase">Popular</h2>
        <button
          className={`md:hidden text-white focus:outline-none ml-2 text-2xl transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
          onClick={toggleSubredditList}
        >
          <FiChevronDown />
        </button>
      </div>
      <div className={`md:flex justify-center ${isOpen ? "block" : "hidden"} max-h-screen overflow-hidden transition-all duration-500`}>
        <ul className="space-y-2 md:flex flex-col ">
          {popularSubreddits.map((subreddit) => (
            <li
              key={subreddit}
              className="text-white hover:text-gray-300 cursor-pointer"
              onClick={() => {
                handleSubredditClick(subreddit);
                toggleSubredditList();
              }}
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
