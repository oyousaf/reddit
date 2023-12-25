const REDDIT_API_URL = "https://www.reddit.com";

export const fetchPosts = async (subreddit, searchTerm, permalink) => {
  let url;

  if (searchTerm) {
    url = `${REDDIT_API_URL}/r/${subreddit}/search.json?q=${searchTerm}`;
  } else if (permalink) {
    url = `${REDDIT_API_URL}/r/${subreddit}/comments/${permalink}.json`;
  } else {
    url = `${REDDIT_API_URL}/r/${subreddit}.json`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (searchTerm) {
      return data.data.children.map((result) => result.data);
    } else if (permalink) {
      return data[0].data.children.map((post) => post.data);
    } else {
      return data.data.children.map((post) => post.data);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
