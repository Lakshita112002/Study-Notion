import React, { useEffect, useState } from 'react';
import './Styles/allCourse.css';
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
function AllCourses({Loginstate,Loginsetstate}) {
    const [data,setData] = useState([]);
    useEffect(()=>{
        const getData = ()=>{
            axios.get('http://localhost:3001/auth/getAllCourse').then((res)=>{
                setData(res.data.data);
            })
        }
        getData();
    },[])
    return (<>
    <Navbar Loginstate={Loginstate} Loginsetstate={Loginsetstate}/>
        <div className="heading"><h1>All Courses</h1></div>
        <div className="course-catalog">
        {data.map((item)=>{return(
            <div className="course" key={item._id}>
                <img src={item.CourseImg} alt={item.CourseName} />
                <h3>{item.CourseName}</h3>
                <Link to={`/CourseOverView/${item._id}`}>View Course</Link>
            </div>        
        )})}
        </div>
        </>)
}

export default AllCourses;