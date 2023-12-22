import React from "react";
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from "react-icons/fa";

const PostItem = ({ post, onItemClick }) => {
  const isImagePost = post.post_hint === "image";
  console.log(post);
  return (
    <li className="cursor-pointer border-b border-teal-700 p-4 hover:bg-teal-800 transition duration-300 rounded-md sm:flex">
      <div className="sm:w-2/3 pr-4" onClick={() => onItemClick(post)}>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <div className="flex items-center space-x-4 text-gray-300">
          <span>
            <FaArrowUp /> {post.ups}
          </span>
          <span>
            <FaArrowDown /> {post.downs}
          </span>
          <span>
            <FaRegCommentAlt /> {post.num_comments} Comments
          </span>
        </div>
        {isImagePost ? (
          <p className="mt-2">{post.selftext.substring(0, 100)}...</p>
        ) : (
          <div className="flex items-center mt-2 text-gray-300">
            <span>Posted by u/{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.created_utc * 1000).toLocaleString()}</span>
          </div>
        )}
      </div>
      {isImagePost ? null : (
        <img
          src={post.thumbnail}
          alt="Post Thumbnail"
          className="mt-2 rounded sm:w-1/3"
        />
      )}
    </li>
  );
};

export default PostItem;
