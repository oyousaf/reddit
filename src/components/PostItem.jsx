import React from "react";
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from "react-icons/fa";

const PostItem = ({ post, onItemClick }) => {
  const isSelfPost = post.is_self;
  const isImagePost = post.is_image;
  const isVideoPost = post.is_video;
  const isExternalLink = post.post_hint === "link";
  const {
    permalink,
    subreddit_name_prefixed,
    title,
    ups,
    downs,
    num_comments,
    author,
    created_utc,
    selftext,
    media,
    subreddit,
    url,
    thumbnail,
  } = post;

  const calculateTimeDifference = (utcTimestamp) => {
    const secondsDifference = Math.floor(Date.now() / 1000) - utcTimestamp;

    const timeUnits = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const unit of timeUnits) {
      const value = Math.floor(secondsDifference / unit.seconds);
      if (value >= 1) {
        return `${value} ${unit.label}${value !== 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  const renderThumbnail = () => {
    if (thumbnail === "self") {
      return "";
    } else if (isImagePost) {
      return (
        <img
          src={url || thumbnail}
          alt="Post Thumbnail"
          className="mt-2 rounded sm:w-1/3"
        />
      );
    } else if (isVideoPost) {
      return (
        <div className="mt-2 rounded sm:w-1/3 overflow-hidden">
          <video controls width="100%">
            <source
              src={media.reddit_video?.fallback_url || url}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (isExternalLink) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={thumbnail}
            className="mt-2 rounded w-[150px] md:w-[300px]"
            alt="External Link Thumbnail"
          />
        </a>
      );
    }

    return null;
  };

  return (
    <a
      href={`https://www.reddit.com${permalink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="sm:w-2/3 pr-4"
      onClick={() => onItemClick(post)}
    >
      <h3 className="text-xl font-semibold mb-2">
        <a
          href={`https://www.reddit.com/${subreddit_name_prefixed}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </a>
      </h3>
      <div className="flex items-center space-x-4 text-gray-300">
        <span>
          <FaArrowUp /> {ups < 1000 ? ups : `${(ups / 1000).toFixed(1)}K`}
        </span>
        <span>
          <FaArrowDown /> {downs}
        </span>
        <span>
          <FaRegCommentAlt /> {num_comments} Comments
        </span>
      </div>
      {isSelfPost && (
        <div className="flex items-center mt-2 text-gray-300">
          <span>Posted by u/{author}</span>
          <span className="mx-2">•</span>
          <span>{calculateTimeDifference(created_utc)}</span>
          <p className="ml-4">{selftext.substring(0, 100)}...</p>
        </div>
      )}
      {!isSelfPost && (
        <>
          <div className="flex items-center mt-2 text-gray-300">
            <span>Posted by u/{author}</span>
            <span className="mx-2">•</span>
            <span>{calculateTimeDifference(created_utc)}</span>
          </div>
          <div className="text-gray-100 mt-2">
            <p>
              Posted in:
              <a
                href={`https://www.reddit.com/r/${subreddit}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`r/${subreddit}`}
              </a>
            </p>
          </div>
        </>
      )}
      {renderThumbnail()}
    </a>
  );
};

export default PostItem;
