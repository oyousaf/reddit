import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostItem from "./PostItem";

const mockPost = {
  permalink: "/r/test/comments/abc123/test_post",
  title: "Test Post",
  ups: 1000,
  downs: 50,
  num_comments: 200,
  author: "test_author",
  created_utc: Math.floor(Date.now() / 1000) - 3600, // One hour ago
  selftext: "This is a test post.",
  media: null,
  subreddit: "test",
  url: "https://www.reddit.com/r/test/comments/abc123/test_post",
  thumbnail: "image",
  post_hint: "image",
  is_self: true,
  is_video: false,
};

describe("PostItem component", () => {
  it("renders the PostItem component", () => {
    render(<PostItem post={mockPost} onItemClick={() => {}} />);
    const postTitle = screen.getByText(/test post/i);
    expect(postTitle).toBeInTheDocument();
  });

  it("renders the correct vote counts", () => {
    render(<PostItem post={mockPost} onItemClick={() => {}} />);
    const upvoteCount = screen.getByText(/1000/i);
    const downvoteCount = screen.getByText(/50/i);
    expect(upvoteCount).toBeInTheDocument();
    expect(downvoteCount).toBeInTheDocument();
  });

  it("renders the correct comment count", () => {
    render(<PostItem post={mockPost} onItemClick={() => {}} />);
    const commentCount = screen.getByText(/200 comments/i);
    expect(commentCount).toBeInTheDocument();
  });

  it("renders the correct author and posted time", () => {
    render(<PostItem post={mockPost} onItemClick={() => {}} />);
    const postedInfo = screen.getByText(
      /posted by u\/test_author • 1 hour ago/i
    );
    expect(postedInfo).toBeInTheDocument();
  });

  it("renders selftext for self posts", () => {
    render(<PostItem post={mockPost} onItemClick={() => {}} />);
    const selftext = screen.getByText(/This is a test post./i);
    expect(selftext).toBeInTheDocument();
  });

  it("renders thumbnail for image posts", () => {
    render(<PostItem post={mockPost} onItemClick={() => {}} />);
    const thumbnail = screen.getByAltText(/Post Thumbnail/i);
    expect(thumbnail).toBeInTheDocument();
  });

  it("renders video player for video posts", () => {
    const videoPost = {
      ...mockPost,
      is_video: true,
      media: { reddit_video: { fallback_url: "video.mp4" } },
    };
    render(<PostItem post={videoPost} onItemClick={() => {}} />);
    const videoPlayer = screen.getByTestId("video-player");
    expect(videoPlayer).toBeInTheDocument();
  });

  it("renders subreddit link for non-self posts", () => {
    const nonSelfPost = { ...mockPost, is_self: false };
    render(<PostItem post={nonSelfPost} onItemClick={() => {}} />);
    const subredditLink = screen.getByText(/Posted in: r\/test/i);
    expect(subredditLink).toBeInTheDocument();
  });

  it("calls onItemClick when the post is clicked", () => {
    const onItemClickMock = jest.fn();
    render(<PostItem post={mockPost} onItemClick={onItemClickMock} />);
    const postContainer = screen.getByText(/test post/i);
    fireEvent.click(postContainer);
    expect(onItemClickMock).toHaveBeenCalledWith(mockPost);
  });

  it("matches the snapshot", () => {
    const { container } = render(
      <PostItem post={mockPost} onItemClick={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });
});
