import React from "react";
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from "react-icons/fa";

const PostItem = ({ post, onItemClick }) => {
  const isImagePost = post.post_hint === "image";
  const isVideoPost = post.post_hint === "hosted:video";
  const isExternalLink = post.post_hint === "link";

  const calculateTimeDifference = (utcTimestamp) => {
    const currentUtcTimestamp = Math.floor(Date.now() / 1000);
    const secondsDifference = currentUtcTimestamp - utcTimestamp;

    if (secondsDifference < 60) {
      return `${secondsDifference} second${
        secondsDifference !== 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (secondsDifference < 86400) {
      const hours = Math.floor(secondsDifference / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const formattedDate = new Date(utcTimestamp * 1000).toLocaleString();
      return `Posted on ${formattedDate}`;
    }
  };

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
            <span>{calculateTimeDifference(post.created_utc)}</span>
          </div>
        )}
      </div>
      {isImagePost ? (
        <img
          src={post.url_overridden_by_dest || post.thumbnail}
          alt="Post Thumbnail"
          className="mt-2 rounded sm:w-1/3"
        />
      ) : isVideoPost ? (
        <div className="mt-2 rounded sm:w-1/3 overflow-hidden">
          <video controls width="100%">
            <source
              src={post.media.reddit_video?.fallback_url || post.url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : isExternalLink ? (
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          <img
            src={post.thumbnail}
            className="mt-2 rounded w-[150px] md:w-[300px]"
          />
        </a>
      ) : null}
    </li>
  );
};

export default PostItem;
