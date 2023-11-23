import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ManageCourse() {
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

  const fid = localStorage.getItem("facultyID");
  const [data, setData] = useState([]);

  const memoizedGetData = useCallback(() => {
    axios
      .get(`http://localhost:3001/auth/faculty/getAllCourse/${fid}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fid]); // Specify dependencies for memoizedGetData

  useEffect(() => {
    memoizedGetData();
  }, [memoizedGetData]); // Use memoizedGetData in useEffect hook
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("facultyID");
    setTimeout(() => {
      navigate("/Faculty/Login");
    }, 1000);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/auth/faculty/DeleteCourse/${id}`)
      .then(() => {
        memoizedGetData();
      })
      .catch((error) => {
        console.error("Error deleting course:", error);
      });
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
              <Link to="/Faculty/ManageCourse" className="nav-link active">
                Courses List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Faculty/AddCourse" className="nav-link text-white">
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Course Name</th>
                <th scope="col">Course Description</th>
                <th scope="col">Course Image</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, idx) => {
                return (
                  <tr key={item._id}>
                    <th scope="row">{idx + 1}</th>
                    <td style={{ width: "300px" }}>{item.CourseName}</td>
                    <td style={{ width: "300px" }}>
                      {item.CourseDesc.length < 100
                        ? item.CourseDesc
                        : `${item.CourseDesc.split(" ")
                            .slice(0, 20)
                            .join(" ")}...`}
                    </td>
                    <td style={{ width: "300px" }}>
                      <img
                        src={item.CourseImg}
                        alt={item.CourseName}
                        width={"150px"}
                      />
                    </td>
                    <td style={{ width: "250px" }}>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ManageCourse;
