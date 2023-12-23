import React from "react";
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from "react-icons/fa";

const PostItem = ({ post, onItemClick }) => {
  const isSelfPost = post.is_self;
  const isImagePost = post.is_image;
  const isVideoPost = post.is_video;
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
    } else if (secondsDifference < 2592000) {
      const days = Math.floor(secondsDifference / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (secondsDifference < 31536000) {
      const months = Math.floor(secondsDifference / 2592000);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(secondsDifference / 31536000);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <>
      <div className="sm:w-2/3 pr-4" onClick={() => onItemClick(post)}>
        <h3 className="text-xl font-semibold mb-2">
          <a
            href={`https://www.reddit.com/${post.subreddit_name_prefixed}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.title}
          </a>
        </h3>
        <div className="flex items-center space-x-4 text-gray-300">
          <span>
            <FaArrowUp />{" "}
            {post.ups < 1000 ? post.ups : `${(post.ups / 1000).toFixed(1)}K`}
          </span>
          <span>
            <FaArrowDown /> {post.downs}
          </span>
          <span>
            <FaRegCommentAlt /> {post.num_comments} Comments
          </span>
        </div>
        {isSelfPost ? (
          <div className="flex items-center mt-2 text-gray-300">
            <span>Posted by u/{post.author}</span>
            <span className="mx-2">•</span>
            <span>{calculateTimeDifference(post.created_utc)}</span>
            <p className="ml-4">{post.selftext.substring(0, 100)}...</p>
          </div>
        ) : isImagePost ? (
          <p>Hi</p>
        ) : (
          <>
            <div className="flex items-center mt-2 text-gray-300">
              <span>Posted by u/{post.author}</span>
              <span className="mx-2">•</span>
              <span>{calculateTimeDifference(post.created_utc)}</span>
            </div>
            <div className="text-gray-100 mt-2">
              <p>
                Posted in:
                <a
                  href={`https://www.reddit.com/r/${post.subreddit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`r/${post.subreddit}`}
                </a>
              </p>
            </div>
          </>
        )}
      </div>
      {isImagePost ? (
        <img
          src={post.url || post.thumbnail}
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
            alt="External Link Thumbnail"
          />
        </a>
      ) : null}
    </>
  );
};

export default PostItem;
