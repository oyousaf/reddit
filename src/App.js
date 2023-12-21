import React from "react";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="flex flex-col items-center bg-[#880000] min-h-screen">
      {/* Header */}
      <header className="text-white p-4">
        <div className="flex items-center">
          <img
            src="./logo.svg"
            alt="Reddit Logo"
            className="mr-2"
            width={30}
            height={30}
          />
          <h1 className="text-3xl font-bold">Reddit App</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <PostList />
      </main>
    </div>
  );
}

export default App;
