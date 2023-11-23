import React from 'react';
import './Styles/about.css';
import { Link } from 'react-router-dom';
function AboutUs() {
    return (
        <>
            <div className='About-header'>
                <h1 className='About-title'>About Us</h1>
            </div>

            <div className="About-container">
                <div className="About-section">
                    <h2>Our Story</h2>
                    <p>Our journey began as enthusiastic third-year B.Tech students at Acropolis College, where we embarked on an exciting educational venture – the creation of a cutting-edge Learning Management System. With our passion for technology and a shared vision, we set out to develop a platform that would revolutionize the way students access and interact with educational content.

                        As we delved into this project, we honed our programming skills, collaborated closely as a team, and applied the knowledge we gained during our college years. We faced challenges, learned from them, and persevered in our pursuit of excellence.

                        Today, our Learning Management System stands as a testament to our dedication and commitment to providing a dynamic and efficient learning experience for our peers. We are proud to share our journey with you and look forward to continuing to enhance the education landscape for the betterment of all</p>
                </div>

                <div className="section">
                    <h2>Meet Our Team</h2>
                    <p><span className='mem-titles'>Kareena Jethwani : </span>Kareena is a highly skilled frontend developer with a passion for creating user-friendly and visually appealing web interfaces.
                        In this project, Kareena is responsible for designing and implementing the frontend components, ensuring a seamless user experience..</p>
                    <p><span className='mem-titles'>Hitesh Rathod : </span>Hitesh is an experienced backend developer known for his strong problem-solving skills and deep knowledge of server-side technologies.
                        Hitesh's role in this project is to build and maintain the backend infrastructure, ensuring data handling and server-side functionalities are robust and efficient..</p>
                    <p><span className='mem-titles'>Lakshita Maheshwari : </span>Lakshita is a dedicated and enthusiastic member of the team with a keen interest in frontend development.
                        Lakshita will assist Kareena in frontend development tasks and provide additional support as needed.</p>

                </div>

                <div className="section">
                    <h2>Contact Us</h2>
                    <p>If you have any questions or need assistance, please feel free to contact us:</p>
                    <p>Email: Support.Study_Notion@gmail.com</p>
                    <p>Phone: +91 78936764736</p>
                </div>
            </div>
            <footer className="sticky-footer">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/">Contact</Link></li>
                </ul>
            </footer>

        </>
    )
}
export default AboutUs;