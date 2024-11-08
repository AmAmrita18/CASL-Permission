import React, { useState } from "react";
import { cretePostController, getAllPost } from "../controller/controller";

export const CreatePost = ({ getPost, logintype }) => {
  const [title, setTitel] = useState("");
  const [content, setContent] = useState("");

  const handleClick = async () => {
    const result = await cretePostController({
      title,
      content,
      author: logintype,
    });

    getPost();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white shadow-lg rounded-xl w-full max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create a Post</h1>
      
      <input
        onChange={(e) => setTitel(e.target.value)}
        className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 placeholder-gray-400"
        type="text"
        value={title}
        placeholder="Title"
      />
      
      <textarea
        onChange={(e) => setContent(e.target.value)}
        className="w-full resize-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 placeholder-gray-400 mt-4"
        rows={4}
        value={content}
        placeholder="Content"
      />
      
      <button
        className="w-full bg-teal-500 text-white rounded-lg px-6 py-3 font-semibold mt-6 hover:bg-teal-700 focus:ring-4 focus:ring-teal-400 transition-all duration-300"
        onClick={handleClick}
      >
        Create Post
      </button>
    </div>
  );
};
