import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      setError("Deleted successfully");
      setTimeout(() => {
        setError("");
        getData(); // Refresh data after deletion
      }, 1000);
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-200 py-8">
      <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <h2 className="text-3xl text-white text-center mb-8">All Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Displaying Photo from Cloudinary */}
              {item.photo && (
                <img
                  src={item.photo} // Assuming 'photo' field contains the Cloudinary URL
                  className="w-full h-48 object-cover"
                  alt="User"
                />
              )}
              <div className="p-4">
                <h5 className="text-xl font-semibold mb-2">{item.name}</h5>
                <p className="text-gray-700 mb-4">TweetMsg: {item.tweetmsg}</p>
                <div className="flex justify-between">
                  <button
                    className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update/${item._id}`}
                    className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Read;
