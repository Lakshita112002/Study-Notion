import React, { useState } from "react";
import Navbar from "./Navbar";
import "./Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login({ setstate }) {
  const navigate = useNavigate();
  const [User, SetUser] = useState({
    Email: "",
    Password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };
  const handleClick = () => {
    if (User.Email === "" || User.Password === "") {
      return toast.error("Filled is empty");
    }
    try {
      axios
        .post("http://localhost:3001/auth/login", User)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            localStorage.setItem("userID", res.data.data._id);
            localStorage.setItem("userEmail", res.data.data.Email);
            setstate(true);
            SetUser({
              Email: "",
              Password: "",
            });
            setTimeout(() => {
              return navigate("/MyLearning");
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
        <h2>Login Form</h2>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
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
          Login
        </button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3>Faculty Login</h3>
          <Link to="/Faculty/Login">( Click Here )</Link>
        </div>

      </form>

      <footer
        className="sticky-footer"
        style={{ marginTop: "12.3%", width: "100%" }}
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
export default Login;
