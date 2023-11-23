import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Styles/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  const navigate = useNavigate();
  const [User, SetUser] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };
  const handleClick = () => {
    if (User.Email === "" || User.Password === "" || User.Username === "") {
      return toast.error("Filled is empty");
    }
    try {
      axios
        .post("http://localhost:3001/auth/register", User)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            SetUser({
              Username: "",
              Email: "",
              Password: "",
            });
            setTimeout(() => {
              return navigate("/Login");
            }, 1000);
          } else {
            toast.info(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <Navbar />
      <form className="Login-Form-Container">
        <h2>Register Form</h2>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            name="Username"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-container">
          <i className="fa fa-envelope icon"></i>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            name="Email"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            name="Password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="button" className="btn" onClick={handleClick}>
          Register
        </button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Faculty Register</h3>
          <Link to="/Faculty/Register">( Click Here )</Link>
        </div>
      </form>
      <footer
        className="sticky-footer"
        style={{ marginTop: "8.5%", width: "100%" }}
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/about">Contact</Link>
          </li>
        </ul>
      </footer>
      <ToastContainer />
    </>
  );
}
export default Register;
