import React from "react";
import { motion } from "framer-motion";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";

function ProjectCards(props) {
  const {
    imgPath,
    title,
    description,
    demoLink,
    githubLink,
    technologies = [],
    status = "completed",
    year = 2024,
    iframeSrc
  } = props;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#00ff88';
      case 'in-progress':
        return '#ffa500';
      case 'planned':
        return '#ff4757';
      default:
        return '#00ff88';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return 'Completed';
    }
  };

  return (
    <motion.div 
      className="project-card-view"
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="project-card-image">
        {iframeSrc ? (
          <div className="iframe-container">
            <iframe
              src={iframeSrc}
              title={title}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        ) : (
          <div className="image-container">
            <img src={imgPath} alt={title} />
            <div className="image-overlay">
              <div className="overlay-content">
                <span className="project-status" style={{ color: getStatusColor(status) }}>
                  {getStatusText(status)}
                </span>
                <span className="project-year">{year}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="project-card-body">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <div className="project-meta">
            <span className="project-year-badge">{year}</span>
            <span 
              className="project-status-badge"
              style={{ backgroundColor: `${getStatusColor(status)}20`, color: getStatusColor(status) }}
            >
              {getStatusText(status)}
            </span>
          </div>
        </div>
        
        <p className="project-description">
          {description}
        </p>
        
        {technologies.length > 0 && (
          <div className="project-technologies">
            <div className="tech-tags">
              {technologies.slice(0, 3).map((tech, index) => (
                <motion.span
                  key={tech}
                  className="tech-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
              {technologies.length > 3 && (
                <span className="tech-tag more">+{technologies.length - 3}</span>
              )}
            </div>
          </div>
        )}
        
        <div className="project-links">
          {demoLink && (
            <motion.a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CgWebsite />
              <span>Live Demo</span>
              <FaExternalLinkAlt />
            </motion.a>
          )}
          
          {githubLink && (
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link github"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BsGithub />
              <span>View Code</span>
              <FaExternalLinkAlt />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCards;
