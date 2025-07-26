import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, useViewportScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import mysteryagents from "../../Assets/Projects/mysteryagents.png";
import btcclock from "../../Assets/Projects/btc-clock.png";
import regolich from "../../Assets/Projects/regolich.png";
import "./Projects.css";

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const { scrollYProgress } = useViewportScroll();
  const springConfig = { damping: 20, stiffness: 100 };

  // Advanced cursor effects
  const cursorX = useSpring(useMotionValue(0), springConfig);
  const cursorY = useSpring(useMotionValue(0), springConfig);
  const cursorScale = useSpring(useMotionValue(1), springConfig);
  const cursorOpacity = useSpring(useMotionValue(0), springConfig);

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const gridY = useTransform(scrollYProgress, [0.2, 1], [0, -50]);

  const projectsData = [
    {
      id: 1,
      title: "Mystery Agents",
      description: "Board game on mobile",
      fullDescription: "A mobile board game that brings the classic mystery-solving experience to your phone. Features real-time multiplayer, interactive gameplay, and stunning visuals.",
      imgPath: mysteryagents,
      demoLink: "https://mystery-agents.web.app/",
      githubLink: "https://github.com/oampudit/mystery-agents",
      category: "mobile",
      technologies: ["Flutter", "Dart", "Firebase", "Real-time Database"],
      features: ["Multiplayer Support", "Real-time Updates", "Interactive UI", "Cross-platform"],
      status: "completed",
      year: 2024
    },
    {
      id: 2,
      title: "BTC Clock",
      description: "BTC Clock is a web app that displays real-time Bitcoin block height, price, satoshis per unit of currency, local time, and halving estimate.",
      fullDescription: "A comprehensive Bitcoin monitoring dashboard that provides real-time data including block height, current price, satoshis per currency unit, local time synchronization, and halving countdown estimates.",
      imgPath: btcclock,
      demoLink: "https://blockclock-online.firebaseapp.com/",
      githubLink: "https://github.com/oampudit/blockclock-online",
      category: "web",
      technologies: ["React", "JavaScript", "Firebase", "Bitcoin API"],
      features: ["Real-time Data", "Bitcoin Integration", "Price Tracking", "Halving Countdown"],
      status: "completed",
      year: 2023
    },
    {
      id: 3,
      title: "RegoLich",
      description: "RegoLich combines MOBA and Battle Royale genres with Bitcoin integration via Lightning Network and Nostr for decentralized transactions.",
      fullDescription: "An innovative gaming platform that merges MOBA and Battle Royale gameplay with cryptocurrency integration. Features Lightning Network payments and Nostr protocol for decentralized communication.",
      imgPath: regolich,
      demoLink: "https://regolich-project.firebaseapp.com/",
      githubLink: "https://github.com/oampudit/regolich",
      category: "web",
      technologies: ["React", "Bitcoin Lightning", "Nostr Protocol", "Web3"],
      features: ["Bitcoin Integration", "Lightning Network", "Decentralized Gaming", "MOBA + Battle Royale"],
      status: "in-progress",
      year: 2024
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projectsData.length },
    { id: 'web', label: 'Web Apps', count: projectsData.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile Apps', count: projectsData.filter(p => p.category === 'mobile').length },
    { id: 'completed', label: 'Completed', count: projectsData.filter(p => p.status === 'completed').length },
    { id: 'in-progress', label: 'In Progress', count: projectsData.filter(p => p.status === 'in-progress').length }
  ];

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      cursorOpacity.set(1);
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      cursorOpacity.set(0);
      setIsHovering(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, cursorOpacity]);

  // Filter projects
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => 
        project.category === activeFilter || project.status === activeFilter
      ));
    }
  }, [activeFilter]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="modern-projects">
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
        {[...Array(20)].map((_, i) => (
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

      {/* Interactive Background */}
      <motion.div 
        className="interactive-background"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(255, 71, 87, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(255, 71, 87, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <Particle />
      <Container>
        {/* Header Section */}
        <motion.section 
          className="projects-header-section" 
          ref={headerRef}
          style={{ y: headerY }}
        >
          <motion.div
            className="projects-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="projects-title"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 71, 87, 0.5)",
                  "0 0 40px rgba(255, 71, 87, 0.8)",
                  "0 0 20px rgba(255, 71, 87, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              My Projects
            </motion.h1>
            <div className="projects-line"></div>
            <p className="projects-subtitle">
              Here are a few projects I've worked on recently.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="projects-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => cursorScale.set(1.2)}
                onMouseLeave={() => cursorScale.set(1)}
              >
                <span className="filter-label">{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
              </motion.button>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects Grid */}
        <motion.section 
          className="projects-grid-section"
          ref={gridRef}
          style={{ y: gridY }}
        >
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="projects-row"
              >
                <Row>
                  {filteredProjects.map((project, index) => (
                    <Col lg={4} md={6} className="project-card-wrapper" key={project.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        whileHover={{ 
                          y: -15,
                          scale: 1.02,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                        }}
                        onMouseEnter={() => cursorScale.set(1.2)}
                        onMouseLeave={() => cursorScale.set(1)}
                        onClick={() => handleProjectClick(project)}
                        className="project-card-container"
                      >
                        <ProjectCard
                          imgPath={project.imgPath}
                          title={project.title}
                          description={project.description}
                          demoLink={project.demoLink}
                          githubLink={project.githubLink}
                          technologies={project.technologies}
                          status={project.status}
                          year={project.year}
                        />
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.section>

        {/* Project Statistics */}
        <motion.section 
          className="projects-stats-section"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.div className="stats-grid">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => cursorScale.set(1.2)}
              onMouseLeave={() => cursorScale.set(1)}
            >
              <div className="stat-icon">🚀</div>
              <div className="stat-number">{projectsData.length}</div>
              <div className="stat-label">Total Projects</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => cursorScale.set(1.2)}
              onMouseLeave={() => cursorScale.set(1)}
            >
              <div className="stat-icon">✅</div>
              <div className="stat-number">{projectsData.filter(p => p.status === 'completed').length}</div>
              <div className="stat-label">Completed</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => cursorScale.set(1.2)}
              onMouseLeave={() => cursorScale.set(1)}
            >
              <div className="stat-icon">💻</div>
              <div className="stat-number">{projectsData.filter(p => p.category === 'web').length}</div>
              <div className="stat-label">Web Apps</div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => cursorScale.set(1.2)}
              onMouseLeave={() => cursorScale.set(1)}
            >
              <div className="stat-icon">📱</div>
              <div className="stat-number">{projectsData.filter(p => p.category === 'mobile').length}</div>
              <div className="stat-label">Mobile Apps</div>
            </motion.div>
          </motion.div>
        </motion.section>
      </Container>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>×</button>
              
              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProject.imgPath} alt={selectedProject.title} />
                  <div className="modal-image-overlay">
                    <span className="project-status">{selectedProject.status}</span>
                  </div>
                </div>
                
                <div className="modal-info">
                  <h2>{selectedProject.title}</h2>
                  <p className="modal-description">{selectedProject.fullDescription}</p>
                  
                  <div className="modal-technologies">
                    <h3>Technologies Used:</h3>
                    <div className="tech-tags">
                      {selectedProject.technologies.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="tech-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="modal-features">
                    <h3>Key Features:</h3>
                    <ul>
                      {selectedProject.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="modal-links">
                    <motion.a
                      href={selectedProject.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-link demo"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Live Demo
                    </motion.a>
                    {selectedProject.githubLink && (
                      <motion.a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-link github"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
