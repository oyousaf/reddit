import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { fetchPosts } from "../services/redditService";
import { setSearchTerm, setPosts, setSelectedItem } from "../redux/actions";

import LoadingSpinner from "./LoadingSpinner";
import PostItem from "./PostItem";

const PostList = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm, (prev, next) => prev === next);
  const posts = useSelector((state) => state.posts);
  const selectedItem = useSelector((state) => state.selectedItem);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const fetchPopularPosts = useCallback(async () => {
    try {
      const response = await fetch("https://www.reddit.com/r/popular.json");
      const data = await response.json();

      const popularPosts = data.data.children.map((child) => child.data);

      dispatch(setPosts(popularPosts));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
      setLoading(false);
    }
  }, [dispatch, searchTerm]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(null, searchTerm);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, searchTerm]);

  const handleSearch = () => {
    fetchData();
  };

  const handleItemSelected = (item) => {
    dispatch(setSelectedItem(item));
  };

  return (
    <div className="flex flex-col items-center text-white">
      <div className="space-x-4">
        <input
          className="bg-teal-800 px-2 py-1 border border-teal-700 rounded"
          type="text"
          placeholder="Search Reddit..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
        <button
          type="button"
          className="bg-teal-800 hover:bg-teal-500 text-white font-bold px-4 py-1 rounded border border-teal-700"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="list-none mt-4">
          {posts.map((post) => (
            <li key={post.id} className="cursor-pointer border-b border-teal-700 p-4 hover:bg-teal-800 transition duration-300 rounded-md sm:flex">
              <PostItem
                post={post}
                onItemClick={() => handleItemSelected(post)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
