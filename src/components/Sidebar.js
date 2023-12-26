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

  const handleSubredditClick = async (subreddit) => {
    try {
      const data = await fetchPosts(subreddit);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching subreddit posts:", error);
    }
  };

  const toggleSubredditList = () => {
    setIsOpen(!isOpen);
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
      <div
        className={`md:flex justify-center space-y-2 transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0"
        } `}
      >
        {isOpen && (
          <ul className="md:flex flex-col space-y-2 overflow-hidden">
            {popularSubreddits.map((subreddit) => (
              <li
                key={subreddit}
                className="text-white hover:text-gray-300 cursor-pointer"
                onClick={() => handleSubredditClick(subreddit)}
              >
                r/{subreddit}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
