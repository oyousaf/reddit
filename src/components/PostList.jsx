import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../services/redditService";
import { setSearchTerm, setPosts, setSelectedItem } from "../redux/actions";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const categories = [
  "React",
  "NextJS",
  "Javascript",
  "Programming",
  "Redux",
  "Tailwind",
];

const PostItem = ({ post, onItemClick }) => (
  <li className="cursor-pointer border-b border-teal-700 p-4 hover:bg-teal-800 transition duration-300 rounded-md sm:flex">
    <div className="sm:w-2/3 pr-4" onClick={() => onItemClick(post)}>
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <div className="flex items-center space-x-4 text-gray-300">
        <span>{post.score} upvotes</span>
        <span>{post.num_comments} comments</span>
      </div>
      <p className="mt-2">{post.selftext.substring(0, 100)}...</p>
    </div>
    {post.preview && post.preview.images && post.preview.images.length > 0 && (
      <img
        src={post.preview.images[0].source.url}
        alt="Post Preview"
        className="mt-2 rounded sm:w-1/3"
      />
    )}
  </li>
);

const PostList = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm);
  const posts = useSelector((state) => state.posts);
  const selectedItem = useSelector((state) => state.selectedItem);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchTerm]);

  const fetchPopularPosts = async () => {
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
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts(selectedCategory, searchTerm);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleItemSelected = (item) => {
    dispatch(setSelectedItem(item));
  };

  const handleCloseDetail = () => {
    dispatch(setSelectedItem(null));
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

        <div className="space-x-4 space-y-4">
          <label htmlFor="category" className="uppercase font-bold">
            Category:
          </label>
          <select
            className="bg-teal-800 px-2 py-1 border border-teal-700 rounded"
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detailed View */}
      <CSSTransition
        in={!!selectedItem}
        timeout={300}
        classNames="detail-view"
        unmountOnExit
      >
        {(status) => (
          <div className="mt-4">
            <h2 className="text-2xl">{selectedItem?.title}</h2>
            <p>{selectedItem?.selftext}</p>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={handleCloseDetail}
            >
              x
            </button>
          </div>
        )}
      </CSSTransition>

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
