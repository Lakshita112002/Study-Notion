import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './MyComponent/HomePage';
import AboutUs from './MyComponent/AboutUs';
import CourseOverView from './MyComponent/CourseOverView';
import AllCourses from './MyComponent/AllCourses';
import MyLearning from './MyComponent/MyLearning';
import CourseVideo from './MyComponent/CourseVideo';
import Login from './MyComponent/Login';
import Register from './MyComponent/Register';
import AddCourse from './MyComponent/Faculty/AddCourse';
import FacultyLogin from './MyComponent/Faculty/FacultyLogin';
import FacultyRegister from './MyComponent/Faculty/FacultyRegister';
import ManageCourse from './MyComponent/Faculty/ManageCourse';
import { useEffect, useState } from 'react';

function App() {
  const [state,setstate] = useState(false);
    useEffect(() => {
    if (localStorage.getItem("userID") !== null) {
      setstate(true)
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage Loginstate={state} Loginsetstate={setstate} />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/AllCourses" element={<AllCourses Loginstate={state} Loginsetstate={setstate}/>} />
          <Route path="/MyLearning" element={<MyLearning Loginstate={state} Loginsetstate={setstate}/>} />
          <Route path="/CourseVideo/:id" element={<CourseVideo Loginstate={state} Loginsetstate={setstate}/>} />
          <Route path="/Login" element={<Login setstate={setstate} />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CourseOverView/:id" element={<CourseOverView Loginstate={state} Loginsetstate={setstate}/>} />
          <Route path="/Faculty/Login" element={<FacultyLogin />} />
          <Route path="/Faculty/Register" element={<FacultyRegister />} />
          <Route path="/Faculty/ManageCourse" element={<ManageCourse />} />
          <Route path="/Faculty/AddCourse" element={<AddCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
