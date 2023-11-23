import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage({Loginstate,Loginsetstate}) {
    const nav = useNavigate();
    function handleClick(id) {
        nav(`/CourseOverView/${id}`);
    }
    const [data,setData] = useState([]);
    useEffect(()=>{
        const getData = ()=>{
            axios.get('http://localhost:3001/auth/getAllCourse').then((res)=>{
                setData(res.data.data);
            })
        }
        getData();
    },[])
    return (
        <div>
            <Navbar Loginstate={Loginstate} Loginsetstate={Loginsetstate}/>
            <div className="head-container">
                <div className="quote">
                    <h1>The beautiful thing about <span>learning </span> is that nobody can take it away from you.</h1> <br /> <br />
                    <h5>Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, beliefs, and habits. Educational methods include teaching, training, storytelling, discussion and directed research!
                        Bright Your FutureWith the help of E-Learning , create your own path and
                        drive on your skills on your own to achieve what you seek.
                        Build a deep,solid understanding in your core subject.
                    </h5>
                </div>
                <div className="svg-image">
                    <div id="gola">
                        <img src={require('./Image/svg1.jpg')} alt="svg" />
                    </div>
                </div>
                <div className="v">
                    <video autoPlay={true} muted={true} loop={true}>
                        <source src={require('./Video/E-Learning.mp4')} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="course-heading">
                    <h1>Popular Courses</h1>
                </div>
                <div className="popular-courses">
                {data.map((item)=>{return(
                    <div className="course-box" key={item._id}>
                        <div className="course-image">
                            <img src={item.CourseImg} alt={item.CourseName} />
                        </div>
                        <h3 className="course-title">{item.CourseName}</h3>
                        <button className="start-learning-button" onClick={() => handleClick(item._id)}>View Course</button>
                    </div>
                )})}
                </div>
            </div>

            <footer className="sticky-footer">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/about">Contact</Link></li>
                </ul>
            </footer>

        </div>
    )
}
export default HomePage;