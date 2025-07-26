import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useViewportScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import profileImage from "../../Assets/profile.png";
import Particle from "../Particle";
import ProjectCard from "../Projects/ProjectCards";
import mysteryagents from "../../Assets/Projects/mysteryagents.png";
import btcclock from "../../Assets/Projects/btc-clock.png";
import regolich from "../../Assets/Projects/regolich.png";
import "./Home.css";

function Home({ onNavigate }) {
  const [activeSection, setActiveSection] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [skillProgress, setSkillProgress] = useState({});
  const [isSkillVisible, setIsSkillVisible] = useState(false);
  const [particleCount, setParticleCount] = useState(50);
  const [isGlitchActive, setIsGlitchActive] = useState(false);
  
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

  const { scrollYProgress } = useViewportScroll();
  const springConfig = { damping: 20, stiffness: 100 };

  // Advanced cursor effects
  const cursorX = useSpring(useMotionValue(0), springConfig);
  const cursorY = useSpring(useMotionValue(0), springConfig);
  const cursorScale = useSpring(useMotionValue(1), springConfig);
  const cursorOpacity = useSpring(useMotionValue(0), springConfig);

  // 3D tilt effects
  const tiltX = useSpring(useMotionValue(0), springConfig);
  const tiltY = useSpring(useMotionValue(0), springConfig);

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const skillsY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const projectsY = useTransform(scrollYProgress, [0.4, 1], [0, -100]);

  useEffect(() => {
    const typingTexts = [
      "Full-Stack Developer",
      "C# & .NET Expert",
      "Angular Developer",
      "Azure Cloud Specialist",
      "Mobile Developer (Flutter)",
      "Database Engineer"
    ];
    
    const targetText = typingTexts[textIndex % typingTexts.length];
    
    if (!isDeleting) {
      // Typing phase
      if (currentText.length < targetText.length) {
        // Continue typing
        const timeout = setTimeout(() => {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, start deleting after delay
        const timeout = setTimeout(() => setIsDeleting(true), 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        // Continue deleting
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, currentText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
      }
    }
  }, [currentText, isDeleting, textIndex]);

  // Mouse tracking with trail effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // 3D tilt effect
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltXValue = (e.clientX - centerX) / (rect.width / 2) * 10;
        const tiltYValue = (e.clientY - centerY) / (rect.height / 2) * 10;
        tiltX.set(tiltXValue);
        tiltY.set(tiltYValue);
      }

      // Mouse trail effect
      setMouseTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
        return newTrail.slice(-20); // Keep last 20 positions
      });
    };

    const handleMouseEnter = () => {
      cursorOpacity.set(1);
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
    };

    const handleScroll = () => {
      // Update active section based on scroll position
      const sections = [heroRef, skillsRef, aboutRef, projectsRef];
      const current = sections.findIndex((ref, index) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      setActiveSection(current >= 0 ? current : 0);
    };

    // Skill progress animation
    const handleSkillIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsSkillVisible(true);
          // Animate skill progress
          const skills = ['C#', '.NET', 'Angular', 'Azure', 'Flutter', 'SQL'];
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setSkillProgress(prev => ({
                ...prev,
                [skill]: Math.floor(Math.random() * 30) + 70 // 70-100%
              }));
            }, index * 200);
          });
        }
      });
    };

    const skillObserver = new IntersectionObserver(handleSkillIntersection, {
      threshold: 0.3
    });

    if (skillsRef.current) {
      skillObserver.observe(skillsRef.current);
    }

    // Glitch effect
    const glitchInterval = setInterval(() => {
      setIsGlitchActive(true);
      setTimeout(() => setIsGlitchActive(false), 200);
    }, 5000);

    // Particle interaction
    const particleInterval = setInterval(() => {
      setParticleCount(prev => Math.max(30, Math.min(80, prev + (Math.random() > 0.5 ? 5 : -5))));
    }, 3000);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      skillObserver.disconnect();
      clearInterval(glitchInterval);
      clearInterval(particleInterval);
    };
  }, [cursorX, cursorY, cursorOpacity, tiltX, tiltY]);

  const skills = [
    { name: "C#", level: 95, color: "#68217A", icon: "⚡" },
    { name: ".NET", level: 90, color: "#512BD4", icon: "🔧" },
    { name: "Angular", level: 85, color: "#DD0031", icon: "🅰️" },
    { name: "Azure", level: 80, color: "#0078D4", icon: "☁️" },
    { name: "Flutter", level: 75, color: "#02569B", icon: "📱" },
    { name: "SQL", level: 90, color: "#336791", icon: "🗄️" }
  ];

  const services = [
    { title: "Full-Stack Development", description: "End-to-end web solutions", icon: "💻", color: "#ff4757" },
    { title: "Mobile Development", description: "Cross-platform mobile apps", icon: "📱", color: "#00ff88" },
    { title: "Cloud Solutions", description: "Azure cloud infrastructure", icon: "☁️", color: "#3742fa" },
    { title: "Database Design", description: "Optimized data architecture", icon: "🗄️", color: "#ffa502" }
  ];

  const stats = [
    { number: "5+", label: "Years Experience", icon: "⏰" },
    { number: "50+", label: "Projects Completed", icon: "🚀" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" }
  ];

  const achievements = [
    { title: "Azure Certified", description: "AZ-900 Microsoft Azure", icon: "🏆" },
    { title: "Performance Expert", description: "40% system improvement", icon: "⚡" },
    { title: "Security Focused", description: "VA scan compliance", icon: "🔒" },
    { title: "Team Leader", description: "Led development teams", icon: "👥" }
  ];

  const projectsData = [
    {
      id: 1,
      title: "Mystery Agents",
      description: "Board game on mobile",
      imgPath: mysteryagents,
      demoLink: "https://mystery-agents.web.app/",
      githubLink: "https://github.com/oampudit/mystery-agents",
      category: "mobile",
      technologies: ["Flutter", "Dart", "Firebase"],
      status: "completed",
      year: 2024
    },
    {
      id: 2,
      title: "BTC Clock",
      description: "Real-time Bitcoin monitoring",
      imgPath: btcclock,
      demoLink: "https://blockclock-online.firebaseapp.com/",
      githubLink: "https://github.com/oampudit/btc-clock",
      category: "web",
      technologies: ["React", "JavaScript", "Bitcoin API"],
      status: "completed",
      year: 2023
    },
    {
      id: 3,
      title: "RegoLich",
      description: "Bitcoin-integrated gaming platform",
      imgPath: regolich,
      demoLink: "https://regolich-project.firebaseapp.com/",
      githubLink: "https://github.com/oampudit/regolich",
      category: "web",
      technologies: ["React", "Bitcoin Lightning", "Nostr"],
      status: "in-progress",
      year: 2024
    }
  ];

  return (
    <div className="modern-portfolio" ref={containerRef}>
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

      {/* Mouse Trail Effect */}
      <div className="mouse-trail">
        {mouseTrail.map((point, index) => (
          <motion.div
            key={point.id}
            className="trail-dot"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              left: point.x,
              top: point.y,
            }}
          />
        ))}
      </div>
      
      {/* Floating Elements */}
      <div className="floating-elements">
        {[...Array(particleCount)].map((_, i) => (
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
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
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
        {['hero', 'skills', 'about', 'projects'].map((section, index) => (
          <motion.button
            key={section}
            className={`nav-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => {
              const refs = [heroRef, skillsRef, aboutRef, projectsRef];
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
        <section className="hero-section" ref={heroRef}>
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="hero-background"
          />
          <Row className="align-items-center">
            <Col lg={6} className="hero-content">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="hero-greeting"
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255, 71, 87, 0.5)",
                      "0 0 40px rgba(255, 71, 87, 0.8)",
                      "0 0 20px rgba(255, 71, 87, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Hello, I'm
                </motion.div>
                
                <motion.h1 
                  className={`hero-title ${isGlitchActive ? 'glitch' : ''}`}
                  animate={{ 
                    textShadow: [
                      "0 0 20px rgba(255, 71, 87, 0.5)",
                      "0 0 40px rgba(255, 71, 87, 0.8)",
                      "0 0 20px rgba(255, 71, 87, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Pudit Chokmeesuk
                </motion.h1>
                
                <motion.div 
                  className="hero-subtitle"
                  animate={{ 
                    background: [
                      "linear-gradient(135deg, #ff4757, #ff6b7a)",
                      "linear-gradient(135deg, #00ff88, #00d4aa)",
                      "linear-gradient(135deg, #3742fa, #5352ed)",
                      "linear-gradient(135deg, #ff4757, #ff6b7a)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="typing-text">{currentText}</span>
                  <span className="typing-cursor">|</span>
                </motion.div>
                
                <motion.div 
                  className="hero-description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Full-Stack Developer with expertise in C#, Angular, .NET, and SQL, 
                  specializing in building dynamic, scalable web and mobile applications.
                </motion.div>
                
                <motion.div 
                  className="hero-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <motion.button
                    className="hero-btn primary"
                    onClick={() => onNavigate('about')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => cursorScale.set(1.2)}
                    onMouseLeave={() => cursorScale.set(1)}
                  >
                    View My Work
                  </motion.button>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6} className="hero-image">
              <motion.div
                className="image-container"
                style={{
                  rotateX: tiltY,
                  rotateY: tiltX,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="image-frame"
                  animate={{ 
                    boxShadow: [
                      "0 25px 50px rgba(0, 0, 0, 0.4)",
                      "0 25px 50px rgba(255, 71, 87, 0.3)",
                      "0 25px 50px rgba(0, 255, 136, 0.3)",
                      "0 25px 50px rgba(0, 0, 0, 0.4)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <img src={profileImage} alt="Pudit Chokmeesuk" />
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
                  
                  {/* Floating Arrows */}
                  <motion.div
                    className="floating-arrow top"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ↑
                  </motion.div>
                  <motion.div
                    className="floating-arrow bottom"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    ↓
                  </motion.div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </section>

        {/* Skills Section */}
        <section className="skills-section" ref={skillsRef}>
          <motion.div
            style={{ y: skillsY }}
            className="skills-background"
          />
          <motion.div
            className="skills-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="skills-title">Technical Expertise</h2>
            <div className="skills-line"></div>
            <p className="skills-subtitle">My core technical skills and proficiency levels</p>
          </motion.div>
          
          <motion.div
            className="skills-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
                }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <div className="skill-header">
                  <div className="skill-info">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                </div>
                <div className="skill-progress">
                  <motion.div
                    className="skill-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: isSkillVisible ? `${skillProgress[skill.name] || skill.level}%` : 0 
                    }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    style={{ 
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                      boxShadow: `0 0 10px ${skill.color}40`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <motion.div
            className="services-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="services-title">What I Do</h2>
            <div className="services-line"></div>
            <p className="services-subtitle">Comprehensive development services</p>
          </motion.div>
          
          <motion.div
            className="services-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-item"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <motion.div 
                  className="service-icon"
                  animate={{ 
                    color: [service.color, "#ffffff", service.color],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {service.icon}
                </motion.div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <motion.div
            className="stats-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <motion.div 
                  className="stat-icon"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Achievements Section */}
        <section className="achievements-section">
          <motion.div
            className="achievements-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <h2 className="achievements-title">Key Achievements</h2>
            <div className="achievements-line"></div>
          </motion.div>
          
          <motion.div
            className="achievements-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="achievement-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
                }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </Container>
    </div>
  );
}

export default Home;
