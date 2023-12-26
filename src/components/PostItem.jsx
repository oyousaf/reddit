import React from "react";
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPosts } from "../redux/actions";
import { fetchPosts } from "../services/redditService";
import { Link } from "react-router-dom";

const PostItem = ({ post, onItemClick }) => {
  const dispatch = useDispatch();

  const {
    title,
    ups,
    downs,
    num_comments,
    author,
    created_utc,
    selftext,
    media,
    subreddit,
    thumbnail,
    post_hint,
    is_self,
    is_video,
    permalink,
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
    const imageUrl = post.url_overridden_by_dest || post.url;
    const isGif = imageUrl.toLowerCase().endsWith(".gif");
    const isGifv = imageUrl.toLowerCase().endsWith(".gifv");

    if (thumbnail === "self") return null;

    if (post_hint === "image" || isGif || isGifv) {
      let videoUrl = null;

      if (isGif || isGifv) {
        videoUrl = imageUrl.replace(".gifv", ".mp4");
      }

      return (
        <div>
          {isGif || isGifv ? (
            <video
              width="100%"
              className="rounded w-[300px]"
              loop
              autoPlay
              muted
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={imageUrl}
              alt="Post Thumbnail"
              loading="lazy"
              className="rounded w-[150px] md:w-[300px]"
            />
          )}
        </div>
      );
    }

    if (is_video) {
      return (
        <div className="flex justify-end">
          <video controls width="100%" className="rounded w-[300px]">
            <source
              src={media?.reddit_video?.fallback_url || imageUrl}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return null;
  };

  const handleSubredditClick = async () => {
    try {
      const data = await fetchPosts(subreddit);
      dispatch(setPosts(data));
    } catch (error) {
      console.error("Error fetching subreddit posts:", error);
    }
  };

  return (
    <div className="flex md:w-screen" onClick={() => onItemClick(post)}>
      <div className="sm:w-2/3 pr-4 flex flex-col">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
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
        <div className="mt-2 text-gray-300">
          <div>
            <span>Posted by u/{author}</span>
            <span className="mx-2">•</span>
            <span>{calculateTimeDifference(created_utc)}</span>
          </div>
          {is_self && <p className="mt-2">{selftext}</p>}
        </div>
        
        <div className="items-center justify-center flex flex-col mt-4">
          {!is_self && (
            <p
              className="text-gray-100 mt-2 hover:text-red-300 cursor-pointer"
              onClick={handleSubredditClick}
            >
              Posted in r/{subreddit}
            </p>
          )}
          <Link
            to={`https://www.reddit.com${permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm mt-2 py-1 px-2 bg-teal-600 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            Original Post
          </Link>
        </div>
      </div>
      <div className="ml-4">{renderThumbnail()}</div>
    </div>
  );
};

export default PostItem;
