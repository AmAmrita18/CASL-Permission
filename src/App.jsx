import { useEffect, useState } from "react";
import { defineAbilitiesFor } from "./ability/ability";
import { getAllPost } from "./controller/controller";
import { CreatePost } from "./components/createPost";

function App() {
  const [logintype, setLoginType] = useState("admin");
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPost] = useState([]);
  const [loding, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPost = async () => {
    try {
      setLoading(true);
      let data = await getAllPost(logintype);

      setLoading(false);
      setPost(data?.data?.data);
    } catch (error) {
      console.log({ error });
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    const ability = defineAbilitiesFor(logintype);

    const filtered = posts.filter((post) => {
      if (showMyPosts) {
        return post.author === logintype;
      }
      return (
        ability.can("read", "Post") &&
        (logintype === "admin" ||
          post.author === logintype ||
          (logintype === "user1" && post.author === "user2"))
      );
    });
    setFilteredPosts(filtered);
  }, [logintype, showMyPosts, posts]);

  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };

  return loding ? (
    <>Loading...</>
  ) : error ? (
    <>
      <h1>There is some server error</h1>
    </>
  ) : (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto flex flex-row space-x-8">
        
        <div className="w-1/3 h-full sticky top-0 overflow-auto bg-transparent shadow-sm p-4 rounded-lg">
          <CreatePost getPost={getPost} logintype={logintype} />
        </div>

        <div className="w-2/3">
          <h1 className="text-4xl font-bold text-center text-black mb-6">Posts</h1>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <label className="font-medium text-gray-700">Login as:</label>
            <select
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md focus:outline-none"
              onChange={handleLoginTypeChange}
              value={logintype}
            >
              <option value="admin">Admin</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setShowMyPosts(false)}
              className={`px-4 py-2 rounded-lg font-semibold shadow ${
                !showMyPosts
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setShowMyPosts(true)}
              className={`px-4 py-2 rounded-lg font-semibold shadow ${
                showMyPosts
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              My Posts
            </button>
          </div>

          <div className="h-[70vh] overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(({ title, _id, author, content }) => (
                <div
                  key={_id}
                  className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200 hover:bg-teal-50 transition duration-200 ease-in-out"
                >
                  <p className="text-teal-500 font-bold uppercase">
                    {author}
                  </p>
                  <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                  <p className="text-gray-700 mt-4">{content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No posts to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
