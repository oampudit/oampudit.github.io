import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useViewportScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import "./About.css";

function About() {
  const [activeSection, setActiveSection] = useState(0);
  
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const toolsRef = useRef(null);
  const githubRef = useRef(null);

  const { scrollYProgress } = useViewportScroll();
  const springConfig = { damping: 20, stiffness: 100 };

  // Advanced cursor effects
  const cursorX = useSpring(useMotionValue(0), springConfig);
  const cursorY = useSpring(useMotionValue(0), springConfig);
  const cursorScale = useSpring(useMotionValue(1), springConfig);
  const cursorOpacity = useSpring(useMotionValue(0), springConfig);

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const skillsY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const toolsY = useTransform(scrollYProgress, [0.2, 0.8], [0, -100]);
  const githubY = useTransform(scrollYProgress, [0.4, 1], [0, -50]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      cursorOpacity.set(1);
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = [heroRef, skillsRef, toolsRef, githubRef];
      const current = sections.findIndex((ref, index) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      setActiveSection(current >= 0 ? current : 0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cursorX, cursorY, cursorOpacity]);

  const experienceData = [
    {
      company: "PTT Digital Solutions",
      position: "Mid-Level Software Developer",
      period: "Nov 2023 - Present",
      achievements: [
        "Full-stack development of web and application solutions",
        "Improved system security and scalability using Azure",
        "Enhanced system documentation and operational efficiency"
      ],
      technologies: ["C#", ".NET", "Azure", "SQL", "React"]
    },
    {
      company: "Bangkok Life Assurance",
      position: "Software Developer",
      period: "Apr 2021 - Nov 2023",
      achievements: [
        "Rewrote main group insurance system improving performance by 40%",
        "Redesigned mobile app for group insurance customers",
        "Led full development cycles using C# .NET Core and Flutter"
      ],
      technologies: ["C#", ".NET Core", "Flutter", "Oracle", "Dart"]
    },
    {
      company: "BizCon Solutions",
      position: "System Engineer",
      period: "Aug 2019 - Jan 2021",
      achievements: [
        "Managed systems infrastructure for major clients",
        "Completed server installations and migrations",
        "Reduced system downtime through proactive monitoring"
      ],
      technologies: ["Windows Server", "Active Directory", "Exchange", "Azure"]
    }
  ];

  const educationData = [
    {
      degree: "Master of Business Management",
      school: "Mahidol University",
      period: "2017 - 2020",
      gpa: "3.35"
    },
    {
      degree: "Bachelor of Electrical Engineering",
      school: "King Mongkut's University of Technology North Bangkok",
      period: "2015 - 2019",
      gpa: "3.24"
    }
  ];

  return (
    <div className="modern-about">
      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          scale: cursorScale,
        }}
      />
      
      {/* Floating Elements */}
      <div className="floating-elements">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-element"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <motion.div className="navigation-dots">
        {['hero', 'skills', 'tools', 'github'].map((section, index) => (
          <motion.button
            key={section}
            className={`nav-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => {
              const refs = [heroRef, skillsRef, toolsRef, githubRef];
              refs[index]?.current?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: activeSection === index ? 1.2 : 1,
              backgroundColor: activeSection === index ? "#ff4757" : "rgba(255, 255, 255, 0.2)"
            }}
          />
        ))}
      </motion.div>

      <Particle />
      <Container>
        {/* Hero Section */}
        <section className="about-hero-section" ref={heroRef}>
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="about-hero-background"
          />
          <Row className="align-items-center">
            <Col lg={6} className="about-hero-content">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="about-hero-title"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255, 71, 87, 0.5)",
                      "0 0 40px rgba(255, 71, 87, 0.8)",
                      "0 0 20px rgba(255, 71, 87, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  About Me
                </motion.h1>
                <div className="about-hero-line"></div>
                <Aboutcard />
              </motion.div>
            </Col>
            <Col lg={6} className="about-hero-image">
              <motion.div
                className="about-image-container"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5
                }}
              >
                <motion.div 
                  className="about-image-frame"
                  animate={{ 
                    boxShadow: [
                      "0 25px 50px rgba(0, 0, 0, 0.4)",
                      "0 25px 50px rgba(255, 71, 87, 0.3)",
                      "0 25px 50px rgba(0, 0, 0, 0.4)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <img src={laptopImg} alt="About Me" />
                  <motion.div
                    className="image-overlay"
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                  >
                    <div className="overlay-content">
                      <span>💻</span>
                      <p>Full-Stack Developer</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Experience Section */}
        <section className="about-experience-section">
          <motion.div
            style={{ y: skillsY }}
            className="experience-background"
          />
          <motion.div
            className="experience-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="experience-title">Professional Experience</h2>
            <div className="experience-line"></div>
            <p className="experience-subtitle">My journey in software development</p>
          </motion.div>
          
          <motion.div
            className="experience-timeline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.company}
                className="experience-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
                }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <div className="experience-header">
                  <div className="experience-company">
                    <h3>{exp.company}</h3>
                    <span className="experience-position">{exp.position}</span>
                  </div>
                  <span className="experience-period">{exp.period}</span>
                </div>
                
                <div className="experience-achievements">
                  <h4>Achievements:</h4>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 1.1 + index * 0.2 + i * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="experience-technologies">
                  <h4>Technologies:</h4>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.3 + index * 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Education Section */}
        <section className="about-education-section">
          <motion.div
            style={{ y: toolsY }}
            className="education-background"
          />
          <motion.div
            className="education-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h2 className="education-title">Education</h2>
            <div className="education-line"></div>
          </motion.div>
          
          <motion.div
            className="education-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.degree}
                className="education-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
                }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <motion.div 
                  className="education-icon"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🎓
                </motion.div>
                <h3>{edu.degree}</h3>
                <p className="education-school">{edu.school}</p>
                <p className="education-period">{edu.period}</p>
                <motion.div 
                  className="education-gpa"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    color: ["#00ff88", "#ffffff", "#00ff88"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  GPA: {edu.gpa}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Skills Section */}
        <section className="about-skills-section" ref={skillsRef}>
          <motion.div
            className="skills-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <h2 className="skills-title">Professional Skillset</h2>
            <div className="skills-line"></div>
          </motion.div>
          <Techstack />
        </section>

        {/* Tools Section */}
        <section className="about-tools-section" ref={toolsRef}>
          <motion.div
            className="tools-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <h2 className="tools-title">Tools I Use</h2>
            <div className="tools-line"></div>
          </motion.div>
          <Toolstack />
        </section>

        {/* GitHub Section */}
        <section className="about-github-section" ref={githubRef}>
          <motion.div
            style={{ y: githubY }}
            className="github-background"
          />
          <Github />
        </section>
      </Container>
    </div>
  );
}

export default About;
