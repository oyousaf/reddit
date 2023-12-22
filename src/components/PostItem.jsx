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
    {/* Additional conditional check for missing or incorrect image data */}
    {(!post.preview ||
      !post.preview.images ||
      post.preview.images.length === 0) && (
      <div className="mt-2 rounded sm:w-1/3">No Preview Image</div>
    )}
  </li>
);

export default PostItem;
