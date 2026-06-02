import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import useTilt from "../../hooks/useTilt";
import useSpotlight from "../../hooks/useSpotlight";
import "./About.css";

const EXPERIENCE = [
  {
    company: "PTT Digital Solutions",
    position: "Mid-Level Software Developer",
    period: "Nov 2023 — Present",
    achievements: [
      "Full-stack development of web and application solutions on Azure.",
      "Improved system security and scalability with Functions, Web Apps, Key Vault.",
      "Authored module documentation and onboarding playbooks.",
    ],
    technologies: ["C#", ".NET", "Azure", "SQL", "React"],
  },
  {
    company: "Bangkok Life Assurance",
    position: "Software Developer",
    period: "Apr 2021 — Nov 2023",
    achievements: [
      "Rewrote the group-insurance core, lifting throughput by ~40%.",
      "Designed the customer mobile app: claims, notifications, history.",
      "Owned full release cycles in C#, .NET Core, Oracle, Dart, Flutter.",
    ],
    technologies: ["C#", ".NET Core", "Flutter", "Oracle", "Dart"],
  },
  {
    company: "BizCon Solutions",
    position: "System Engineer",
    period: "Aug 2019 — Jan 2021",
    achievements: [
      "Operated infrastructure for SET, Betagro, FWD.",
      "Migrations and installations: Windows Server, Active Directory, Exchange.",
      "Reduced incident frequency through proactive monitoring.",
    ],
    technologies: ["Windows Server", "Active Directory", "Exchange", "Azure"],
  },
];

const EDUCATION = [
  {
    degree: "Master of Business Management",
    school: "Mahidol University",
    period: "2017 — 2020",
    gpa: "3.35",
  },
  {
    degree: "Bachelor of Electrical Engineering",
    school: "King Mongkut's University of Technology North Bangkok",
    period: "2015 — 2019",
    gpa: "3.24",
  },
];

function TiltWrap({ children, className = "" }) {
  const tilt = useTilt({ max: 4, scale: 1.005 });
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

function SpotSection({ children, className = "" }) {
  const spot = useSpotlight();
  return (
    <section
      ref={spot.ref}
      onMouseMove={spot.onMouseMove}
      onMouseLeave={spot.onMouseLeave}
      className={`spotlight ${className}`}
    >
      {children}
    </section>
  );
}

function About() {
  return (
    <div className="about-pro">
      <Container>
        {/* Hero */}
        <SpotSection className="about-hero">
          <Row className="align-items-center">
            <Col lg={7}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-eyebrow">About</span>
                <h1 className="about-title">A short introduction.</h1>
                <Aboutcard />
              </motion.div>
            </Col>
            <Col lg={5}>
              <TiltWrap className="about-image-tilt">
                <div className="about-image-frame">
                  <img src={laptopImg} alt="About me" />
                </div>
              </TiltWrap>
            </Col>
          </Row>
        </SpotSection>

        {/* Experience */}
        <SpotSection className="about-section">
          <header className="about-section-head">
            <span className="section-eyebrow">Experience · 01</span>
            <h2 className="about-section-title">Where I've worked</h2>
          </header>

          <div className="exp-list">
            {EXPERIENCE.map((exp, i) => (
              <TiltWrap key={exp.company} className="exp-card">
                <div className="exp-card-head">
                  <div>
                    <h3 className="exp-position">{exp.position}</h3>
                    <div className="exp-company">{exp.company}</div>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul className="exp-achievements">
                  {exp.achievements.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
                <div className="exp-tags">
                  {exp.technologies.map((t) => (
                    <span key={t} className="exp-tag">{t}</span>
                  ))}
                </div>
              </TiltWrap>
            ))}
          </div>
        </SpotSection>

        {/* Education */}
        <SpotSection className="about-section">
          <header className="about-section-head">
            <span className="section-eyebrow">Education · 02</span>
            <h2 className="about-section-title">Background</h2>
          </header>

          <div className="edu-grid">
            {EDUCATION.map((edu) => (
              <TiltWrap key={edu.degree} className="edu-card">
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
                <div className="edu-meta">
                  <span>{edu.period}</span>
                  <span className="edu-gpa">GPA {edu.gpa}</span>
                </div>
              </TiltWrap>
            ))}
          </div>
        </SpotSection>

        {/* Skills */}
        <SpotSection className="about-section">
          <header className="about-section-head">
            <span className="section-eyebrow">Stack · 03</span>
            <h2 className="about-section-title">Tools of the trade</h2>
          </header>
          <Techstack />
        </SpotSection>

        {/* Tools */}
        <SpotSection className="about-section">
          <header className="about-section-head">
            <span className="section-eyebrow">Tools · 04</span>
            <h2 className="about-section-title">What I use day-to-day</h2>
          </header>
          <Toolstack />
        </SpotSection>

        {/* GitHub */}
        <SpotSection className="about-section">
          <header className="about-section-head">
            <span className="section-eyebrow">Activity · 05</span>
            <h2 className="about-section-title">Days I code</h2>
          </header>
          <Github />
        </SpotSection>
      </Container>
    </div>
  );
}

export default About;
