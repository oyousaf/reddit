const REDDIT_API_URL = "https://www.reddit.com";

export const fetchPosts = async (subreddit, searchTerm) => {
  const url = `${REDDIT_API_URL}/r/${subreddit}/search.json?q=${searchTerm}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data.children.map((post) => post.data);
};
