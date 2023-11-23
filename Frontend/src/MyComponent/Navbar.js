import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Navbar({ Loginstate, Loginsetstate }) {
  const handleLogout = () => {
    toast.success("Logout Success");
    localStorage.removeItem("userID");
    localStorage.removeItem("userEmail");
    Loginsetstate(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="container">
          <div className="logo">
            <img src={require("./Image/logo.jpg")} alt="Logo" />
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/MyLearning">My Learning</Link>
            </li>
            <li>
              <Link to="/AllCourses">All Courses</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
            {Loginstate !== true ? (
              <>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
                <li>
                  <Link to="/Register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ cursor: "pointer", fontWeight: "bold" }}>
                  {localStorage.getItem("userEmail")}
                </li>
                <li
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
          <div className="search-container">
            <input type="text" id="search-input" placeholder="Search Courses" />
            <button id="search-button">Search</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
export default Navbar;
