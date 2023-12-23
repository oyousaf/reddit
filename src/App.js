import React from "react";
import logo from "./logo.svg";

import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";

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
      <main className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="w-full lg:w-1/4 h-full  bg-teal-800 p-4 mb-4 mr-4 lg:mb-0 rounded-md">
          <Sidebar />
        </div>
        <div className="w-full lg:w-3/4">
          <PostList />
        </div>
      </main>
    </div>
  );
}

export default App;
