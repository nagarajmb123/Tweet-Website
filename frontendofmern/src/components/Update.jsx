import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [tweetmsg, setTweetMsg] = useState(""); // Use 'tweetmsg' to match the backend
  const [photo, setPhoto] = useState(null); // State for the photo
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch single post data
  const getSinglePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setName(result.name);
      setTweetMsg(result.tweetmsg); // Set 'tweetmsg' state

      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching post:", error);
      setError(error.message);
    }
  };

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("tweetmsg", tweetmsg);
    if (photo) {
      formData.append("photo", photo); // Append photo if it is selected
    }

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setError(""); // Clear any previous errors
      navigate("/all"); // Navigate to '/all' after successful update
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getSinglePost(); // Fetch post data on component mount
  }, []);

  return (
    <div className="container my-2 bg-blue-200 py-4 px-6 rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <h2 className="text-center text-3xl mb-4">Edit Post</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tweet Message</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={tweetmsg}
            onChange={(e) => setTweetMsg(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
          <input
            type="file"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
