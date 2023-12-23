import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { fetchPosts } from "../services/redditService";
import { setSearchTerm, setPosts, setSelectedItem } from "../redux/actions";

import LoadingSpinner from "./LoadingSpinner";
import PostItem from "./PostItem";

const PostList = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const posts = useSelector((state) => state.posts);
  const selectedItem = useSelector((state) => state.selectedItem);
  const [loading, setLoading] = useState(true);

  const fetchPopularPosts = useCallback(async () => {
    try {
      const response = await fetch("https://www.reddit.com/r/popular.json");
      const data = await response.json();

      return data.data.children.map((child) => child.data);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchPopularPosts]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const data = searchTerm
        ? await fetchPosts(null, searchTerm)
        : await fetchPopularPosts();
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, searchTerm, fetchPopularPosts]);

  const handleSearch = () => {
    fetchData();
  };

  const handleItemSelected = (item) => {
    dispatch(setSelectedItem(item));
  };

  return (
    <div className="flex flex-col items-center text-white">
      <div className="space-x-2">
        <input
          className="bg-teal-800 px-2 py-1 border border-teal-700 rounded"
          type="text"
          placeholder="Search Reddit..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <ul className="list-none mt-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="cursor-pointer border-b border-teal-700 p-4 hover:bg-teal-800 transition duration-300 rounded-md sm:flex"
            >
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
