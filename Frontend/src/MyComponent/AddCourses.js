import "./Styles/login.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

function AddCourses() {
  const [User, SetUser] = useState({
    CourseName:"",
    CourseImg:"",
    CourseDesc:"",
    CourseVideo:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };

  const handleClick = () => {
    axios.post("http://localhost:3001/auth/addCourse", User).then((res) => {
      alert(res.data.message);
      if (res.data.success) {
        SetUser({
            CourseName:"",
            CourseImg:"",
            CourseDesc:"",
            CourseVideo:""
        });
      }
    });
  };
  return (
    <>
      <Navbar />
      <form>
        <h2>Add Course</h2>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            placeholder="CourseName"
            name="CourseName"
            onChange={(e) => handleChange(e)}
          />
        </div>
                
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            className="input-field"
            type="text"
            placeholder="Course Image"
            name="CourseImg"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-container">
          <i className="fa fa-envelope icon"></i>
          <input
            className="input-field"
            type="text"
            placeholder="Course Descipition"
            name="CourseDesc"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input
            className="input-field"
            type="text"
            placeholder="Course Video"
            name="CourseVideo"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="button" className="btn" onClick={handleClick}>
          Add Course
        </button>
      </form>
      <footer
        className="sticky-footer"
        style={{ marginTop: "15%", width: "99%" }}
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
    </>
  );
}
export default AddCourses;
