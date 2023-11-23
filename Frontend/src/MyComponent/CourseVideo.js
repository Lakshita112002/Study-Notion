import React, { useEffect, useState } from "react";
import "./Styles/courseVideo.css";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
function CourseVideo({ Loginstate, Loginsetstate }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      axios.get(`http://localhost:3001/auth/getCourse/${id}`).then((res) => {
        setData(res.data.data);
      });
    };
    getData();
  }, [id]);
  return (
    <>
      <Navbar Loginstate={Loginstate} Loginsetstate={Loginsetstate} />
      <div className="video-container" key={data._id}>
        <h2 className="video-title">{data.CourseName}</h2>
        <iframe
        width="1000"
        height="500"
        src={data.CourseVideo}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
        {/* <div className="playlist">
          <div className="playlist-item">Video 1: Course Introduction</div>
          <div className="playlist-item">Video 2: What is Computation?</div>
          <div className="playlist-item">
            Video 3: Importance of Theory of Computation
          </div>
        </div>*/}
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
    </>
  );
}
export default CourseVideo;
