import React, { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumeForm() {
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    location: "",
    about: "",

    // EDUCATION
    sscSchool: "",
    sscYear: "",

    interCollege: "",
    interGpa: "",
    interYear: "",

    gradCollege: "",
    gradGpa: "",
    gradYear: "",

    // EXPERIENCE
    experience1: "",
    experience2: "",

    // NEW
    projects: "",
    achievements: "",

    skills: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // SAVE TO BACKEND
  const handleSubmit = () => {
  fetch("http://localhost:8080/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error");
      return res.text();
    })
    .then(() => alert("Saved successfully!"))
    .catch(() => alert("Error saving data"));
};

  // DOWNLOAD PDF
  const downloadPDF = () => {
    const input = document.getElementById("resume");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Resume.pdf");
    });
  };

  return (
    <div className="main">

      {/* FORM */}
      <div className="form">
        <h2>Resume Builder</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="location" placeholder="Location" onChange={handleChange} />

        <textarea name="about" placeholder="About Me" onChange={handleChange}></textarea>

        {/* EDUCATION */}
        <h3>Education</h3>

        <input name="sscSchool" placeholder="SSC School" onChange={handleChange} />
        <input name="sscYear" placeholder="SSC Year" onChange={handleChange} />

        <input name="interCollege" placeholder="Intermediate/Diploma College" onChange={handleChange} />
        <input name="interGpa" placeholder="Intermediate GPA" onChange={handleChange} />
        <input name="interYear" placeholder="Intermediate Year" onChange={handleChange} />

        <input name="gradCollege" placeholder="Graduation (B.Tech) College" onChange={handleChange} />
        <input name="gradGpa" placeholder="Graduation GPA" onChange={handleChange} />
        <input name="gradYear" placeholder="Graduation Year" onChange={handleChange} />

        {/* EXPERIENCE */}
        <h3>Experience</h3>
        <textarea name="experience1" placeholder="Experience 1" onChange={handleChange}></textarea>
        <textarea name="experience2" placeholder="Experience 2" onChange={handleChange}></textarea>

        {/* PROJECTS */}
        <h3>Projects</h3>
        <textarea name="projects" placeholder="Enter projects (comma separated)" onChange={handleChange}></textarea>

        {/* ACHIEVEMENTS */}
        <h3>Achievements</h3>
        <textarea name="achievements" placeholder="Enter achievements (comma separated)" onChange={handleChange}></textarea>

        {/* SKILLS */}
        <h3>Skills</h3>
        <input name="skills" placeholder="Enter skills (comma separated)" onChange={handleChange} />

        {/* BUTTONS */}
        <button onClick={handleSubmit}>Save Resume</button>
        <button onClick={downloadPDF} style={{ marginTop: "10px" }}>
          Download PDF
        </button>
      </div>

      {/* RESUME OUTPUT */}
      <div className="resume" id="resume">

        <h1>{data.name}</h1>
        <h3>{data.title}</h3>

        <div className="contact">
          <span>{data.phone}</span>
          <span>{data.email}</span>
          <span>{data.location}</span>
        </div>

        <hr />

        <h2>ABOUT ME</h2>
        <p>{data.about}</p>

        <hr />

        <h2>EDUCATION</h2>
        <p><strong>SSC:</strong> {data.sscSchool} ({data.sscYear})</p>
        <p><strong>Intermediate:</strong> {data.interCollege} - GPA: {data.interGpa} ({data.interYear})</p>
        <p><strong>Graduation:</strong> {data.gradCollege} - GPA: {data.gradGpa} ({data.gradYear})</p>

        <hr />

        <h2>WORK EXPERIENCE</h2>
        <p>{data.experience1}</p>
        <p>{data.experience2}</p>

        <hr />

        <h2>PROJECTS</h2>
        <ul>
          {data.projects &&
            data.projects.split(",").map((p, i) => (
              <li key={i}>{p}</li>
            ))}
        </ul>

        <hr />

        <h2>ACHIEVEMENTS</h2>
        <ul>
          {data.achievements &&
            data.achievements.split(",").map((a, i) => (
              <li key={i}>{a}</li>
            ))}
        </ul>

        <hr />

        <h2>SKILLS</h2>
        <div className="skills">
          {data.skills &&
            data.skills.split(",").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
        </div>

      </div>
    </div>
  );
}

export default ResumeForm;