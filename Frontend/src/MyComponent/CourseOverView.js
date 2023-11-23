import React, { useEffect, useState } from "react";
import "./Styles/courseOverView.css";
import Navbar from "./Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CourseOverView({ Loginstate, Loginsetstate }) {
  const { id } = useParams();
  const userID = localStorage.getItem("userID");
  const nav = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      axios.get(`http://localhost:3001/auth/getCourse/${id}`).then((res) => {
        setData(res.data.data);
      });
    };
    getData();
  }, [id]);
  const handleClick = () => {
    if (userID === null) {
      toast.info('Login To Continue');
      setTimeout(() => {
      return nav('/Login');
      }, 2000);
    }
    try {      
      if(userID !== null){
        const mydata = { id, userID };
        axios
          .post("http://localhost:3001/auth/AddEnrolledCourse", mydata)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message);
              setTimeout(() => {
                return nav("/MyLearning");
                }, 1000);
            } 
            else {
              toast.info(res.data.message);
            }
          }).catch((err)=>{
            toast.error(err);
          });
        }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <Navbar Loginstate={Loginstate} Loginsetstate={Loginsetstate} />
      <div className="course-container">
        <div className="course-details">
          <h2 className="course-heading">{data.CourseName}</h2>
          <p className="course-description">{data.CourseDesc}</p>
          <div className="button-container">
            <button className="enroll-button" onClick={handleClick}>
              Enroll Now
            </button>
            <a
              className="test-button"
              href={"https://forms.gle/JwEezU1C2hPe2HEn9"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Test Now
            </a>
          </div>
        </div>
        <div className="course-images">
          <img
            className="main-img"
            src={data.CourseImg}
            alt={data.CourseName}
          />
        </div>
      </div>

      <footer className="sticky-footer">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </footer>
      <ToastContainer />
    </>
  );
}
export default CourseOverView;
