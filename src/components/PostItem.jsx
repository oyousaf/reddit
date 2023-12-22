import React from "react";
import { FaArrowUp, FaArrowDown, FaRegCommentAlt } from "react-icons/fa";

const PostItem = ({ post, onItemClick }) => {
  const hasMedia = post.media || post.url_overridden_by_dest || post.thumbnail;
  const isVideoPost = post.is_video;
  const isExternalLink = post.post_hint === "link";

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
        {hasMedia ? (
          <div className="flex items-center mt-2 text-gray-300">
            <span>Posted by u/{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.created_utc * 1000).toLocaleString()}</span>
          </div>
        ) : null}
      </div>
      {hasMedia && (
        <>
          {isVideoPost ? (
            // Render a video player or any specific UI for videos
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
              <img src={post.thumbnail} className="mt-2 rounded" />
            </a>
          ) : (
            // Render image or other media types
            <img
              src={post.url_overridden_by_dest || post.thumbnail}
              alt="Post Thumbnail"
              className="mt-2 rounded sm:w-1/3"
            />
          )}
        </>
      )}
    </li>
  );
};

export default PostItem;
