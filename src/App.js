import React from "react";
import logo from "./logo.svg";

import PostList from "./components/PostList";
import SubredditList from "./components/SubredditList";

function App() {
  return (
    <div className="flex flex-col items-center bg-[#880000] min-h-screen">
      {/* Header */}
      <header className="text-white p-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Reddit Logo"
            className="mr-2"
            width={50}
            height={50}
          />
          <h1 className="text-3xl font-bold">Reddit Client</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 flex">
        <div className="w-1/4 bg-teal-800 p-4 mr-4">
          <h2 className="text-white text-xl font-semibold mb-4 uppercase">
            Popular
          </h2>
          <SubredditList />
        </div>
        <PostList />
      </main>
    </div>
  );
}

export default App;
