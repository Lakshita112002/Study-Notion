import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function AddCourse() {
  useEffect(()=>{
    const linkElement = document.createElement("link");  
    linkElement.rel = "stylesheet";
    linkElement.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css";
    linkElement.integrity =
      "sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO";
    linkElement.crossOrigin = "anonymous";
  
    document.head.appendChild(linkElement);
  },[])  
  const fid = localStorage.getItem('facultyID');
  const [User, SetUser] = useState({
    CourseName:"",
    CourseImg:"",
    CourseDesc:"",
    CourseVideo:"",
    FacultyID:fid
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetUser({ ...User, [name]: value });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(User)
    axios.post("http://localhost:3001/auth/faculty/addCourse", User).then((res) => {
      alert(res.data.message);
      if (res.data.success) {
        SetUser({
            CourseName:"",
            CourseImg:"",
            CourseDesc:"",
            CourseVideo:"",
            FacultyID:fid
        });
      }
    });
  }
  
  const handleLogout = () => {
    localStorage.removeItem("facultyID");
    setTimeout(()=>{
      navigate('/Faculty/Login');
    },1000)
  };
  return (
    <>
      <nav className="navbar navbar-light bg-dark">
        <span className="navbar-brand mb-0 h1 text-white">Faculty Panel</span>
        <span
          className="navbar mb-0 h5 text-white"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          Logout
        </span>
      </nav>

      <div style={{ display: "flex" }}>
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: "280px", height: "92vh" }}
        >
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                to="/Faculty/ManageCourse"
                className="nav-link text-white"
              >
                Courses List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Faculty/AddCourse" className="nav-link active">
                Add Course
              </Link>
            </li>
          </ul>
          <hr />
        </div>
        <div
          className="b-example-divider"
          style={{ marginLeft: 50, width: "100%" }}
        >
          <form className="form-horizontal" style={{marginTop:50}}>
            <div className="form-group">
              <label className="control-label col-sm-2" for="CourseName">
                Course Name:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="CourseName"
                  name="CourseName"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  placeholder="Enter Course Name"
                />
              </div>
            </div>            
            
            <div className="form-group">
              <label className="control-label col-sm-2" for="CourseDesc">
                Course Description:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="CourseDesc"
                  autoComplete="off"
                  name="CourseDesc"
                  onChange={(e)=>handleChange(e)}
                  placeholder="Enter Course Description"
                />
              </div>
            </div>            
            <div className="form-group">
              <label className="control-label col-sm-2" for="CourseImg">
                Course Image:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="CourseImg"
                  name="CourseImg"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  placeholder="Enter Course Image Link"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="CourseVideo">
                Course Video:
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="CourseVideo"
                  name="CourseVideo"
                  autoComplete="off"
                  onChange={(e)=>handleChange(e)}
                  placeholder="Enter Course Video Link"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="button" className="btn btn-default" onClick={handleClick}>
                  Add Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddCourse;
