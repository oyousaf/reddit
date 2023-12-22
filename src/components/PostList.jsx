import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../services/redditService";
import { setSearchTerm, setPosts, setSelectedItem } from "../redux/actions";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import PostItem from "./PostItem";

const PostList = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
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
          className="bg-teal-800 hover:bg-teal-500 text-white font-bold px-4 py-1 rounded border border-teal-700"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Post Items with Transitions */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TransitionGroup component="ul" className="list-none mt-4">
          {posts.map((post) => (
            <CSSTransition key={post.id} timeout={500} classNames="post-item">
              <PostItem
                post={post}
                onItemClick={() => handleItemSelected(post)}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default PostList;
