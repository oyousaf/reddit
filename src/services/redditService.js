const REDDIT_API_URL = "https://www.reddit.com";

export const fetchPosts = async (subreddit, searchTerm) => {
  const url = `${REDDIT_API_URL}/r/${subreddit}${searchTerm ? `/search.json?q=${searchTerm}` : ''}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.data || !data.data.children) {
      throw new Error("Invalid API response");
    }

    return data.data.children.map((post) => post.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
