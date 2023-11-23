import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Styles/myLearning.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function MyLearning({ Loginstate, Loginsetstate }) {
  const nav = useNavigate();
  if (!Loginstate) {
    nav("/Login");
  }

  const userID = localStorage.getItem("userID");
  const [data, setData] = useState([]);
  const [course, setCourse] = useState([]);
  const memoizedGetData = useCallback(() => {
    try {
      axios
        .get(`http://localhost:3001/auth/getEnrolledCourse/${userID}`)
        .then((res) => {
          if (res.status === 200) {
            setData(res.data.data);
          } else {
            console.log(res.statusText);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, [userID]);
  
    const getCourseData = () => {
    try {
      axios.get(`http://localhost:3001/auth/getAllCourse`).then((res) => {
        if (res.status === 200) {
          setCourse(res.data.data);
        } else {
          console.log(res.statusText);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const courseIDs = data?.map((item) => item.courseID);
  const filteredCourses = course?.filter((course) =>
    courseIDs.includes(course._id)
  );

  useEffect(() => {
    memoizedGetData();
    getCourseData();
  }, [memoizedGetData]);
  
  function handleClick(cid) {
    nav(`/CourseVideo/${cid}`);
  }

  return (
    <>
      <Navbar Loginstate={Loginstate} Loginsetstate={Loginsetstate} />
      <div className="heading">
        <h1>My Learning</h1>
      </div>
      <div className="popular-courses">
        {filteredCourses?.map((item) => {
          return (
              <div className="course-box" key={item._id}>
                <div className="course-image">
                  <img src={item.CourseImg} alt={item.CourseName} />
                </div>
                <h3 className="course-title">{item.CourseName}</h3>
                <button
                  className="start-learning-button"
                  onClick={() => handleClick(item._id)}
                >
                  Start Learning
                </button>
              </div>

          );
        })}
      </div>
      </>
  );
}
export default MyLearning;
