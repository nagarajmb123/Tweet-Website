import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuth, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">Home</Link>
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-4">
              {isAuth ? (
                <>
                  <li>
                    <Link to="/create" className="text-white hover:text-gray-300">Create Post</Link>
                  </li>
                  <li>
                    <Link to="/all" className="text-white hover:text-gray-300">All Posts</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
                  </li>
                </>
              )}


              
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



/*
  import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-purple">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Home</Link> 
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/create" className="nav-link">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link to="/all" className="nav-link">All Posts</Link>
            </li>
            <li className="nav-item">
              <Link to="/update" className="nav-link">Update Post</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
*/
