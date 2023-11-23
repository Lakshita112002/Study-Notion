import React, { useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function FacultyLogin() {
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
        .post("http://localhost:3001/auth/faculty/login", User)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            localStorage.setItem("facultyID", res.data.data._id);
            SetUser({
              Email: "",
              Password: ""
            });
            setTimeout(() => {
              return navigate("/Faculty/ManageCourse");
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
      <form className="Login-Form-Container">
        <h2>Faculty Login Form</h2>
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
          <h3>Student Login</h3>
          <Link to="/Login">( Click Here )</Link>
        </div>

      </form>


      <ToastContainer />
    </>
  );
}
export default FacultyLogin;
