import { h } from 'preact';
import './style.css';

const Resume = () => {
    return (
        <div className="resume">

            <div className="resume-header">
                <h1>Samuel Yuen</h1>

                <p>Software Engineer/Cybersecurity</p>
            </div>

            <section className="resume-section">
                <h2>Experience</h2>
                <ul>
                    <li>
                        <h3>AT&T</h3>
                        <p>July 2021 - Present</p>
                        <p>● Designed, mock-up, configured, and deployed full-stack applications from conception to current state using ReactJS, NodeJS, and Express.</p>
                        <p>● Engineered database schema and data management for PostgreSQL, ensuring robust backend support and performance.</p>
                        <p>● Implemented CI/CD pipelines in Azure DevOps and managed AWS infrastructure including servers, networking, and file/object storage.</p>
                    </li>
                </ul>
            </section>
            <section className="resume-section">
                <h2>Community Involvement</h2>
                <ul>
                    <li>
                        <h3>TEALS - Technology Education and Learning Support Program</h3>
                        <p>Teaching Assistant</p>
                        <p>October 2024 - Present</p>
                        <p>● Facilitated Cybersecurity Lessons: Assisted in the delivery and facilitation of high school cybersecurity curriculum, leveraging industry-standard tools and practices to enhance students' understanding and practical skills in digital security.</p>
                        <p>● Mentored and Supported Students: Provided individualized support and mentorship to students, helping them grasp complex cybersecurity concepts, troubleshoot technical issues, and develop critical thinking skills essential for future STEM careers.</p>

                    </li>
                </ul>
            </section>

            <section className="resume-section">
                <h2>Education</h2>
                <ul>
                    <li>
                        <h3>The University of Georgia</h3>
                        <p>Master's of Business Technology</p>
                        <p>August 2021 - May 2023</p>
                    </li>
                    <li>
                        <h3>The University of Georgia</h3>
                        <p>Bachelor's of Science in Computer Science</p>
                        <p>August 2017 - May 2021</p>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Resume;