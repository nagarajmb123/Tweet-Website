import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";
import Update from "./components/Update.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

function App() {
  const [isAuth, setAuth] = useState(false); // Manage authentication state

  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} setAuth={setAuth} /> {/* Pass isAuth and setAuth as props */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          {isAuth ? (
            <>
              <Route path="/create" element={<Create />} />
              <Route path="/all" element={<Read />} />
              <Route path="/update/:id" element={<Update />} />
            </>
          ) : (
            <Route path="/login" element={<Login setAuth={setAuth} />} />
          )}
          <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
  






/*import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import Create from "./components/Create.jsx";
import Read from "./components/Read.jsx";
import Update from "./components/Update.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

const Home = () => {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h2>Welcome to MERN Stack Application</h2>
      </div>
    </div>
  );
};

function App() {
  const [isAuth, setAuth] = useState(false); // Manage authentication state

  return (
    <div className="App">
      <Router>
        <Navbar isAuth={isAuth} setAuth={setAuth} /> 
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/all" element={<Read />} />
          <Route exact path="/update/:id" element={<Update />} /> 
          <Route exact path="/signup" element={<Signup setAuth={setAuth} />} />
          <Route exact path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

*/
