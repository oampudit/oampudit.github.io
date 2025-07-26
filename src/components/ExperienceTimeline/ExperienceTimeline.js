import React from 'react';
import { motion } from 'framer-motion';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {

  const experiences = [
    {
      id: 1,
      company: 'PTT Digital Solutions',
      position: 'Mid-Level Software Developer',
      period: 'November 2023 – Present',
      location: 'Bangkok, Thailand',
      achievements: [
        'Full-stack development of web and application solutions',
        'Designed and deployed software modules with seamless business integration',
        'Improved system security and scalability using Azure Functions, Azure Web App, Key Vault',
        'Enhanced system documentation for operational efficiency'
      ],
      technologies: ['C#', '.NET Core', 'Azure', 'Angular', 'SQL Server'],
      color: '#0078D4'
    },
    {
      id: 2,
      company: 'Bangkok Life Assurance',
      position: 'Software Developer',
      period: 'April 2021 – November 2023',
      location: 'Bangkok, Thailand',
      achievements: [
        'Rewrote main group insurance system improving performance and security',
        'Redesigned mobile app with online claims, notifications, and history logs',
        'Led full development cycles using C# .NET Core, Oracle, Dart, and Flutter',
        'Enhanced customer satisfaction and usability'
      ],
      technologies: ['C#', '.NET Core', 'Oracle', 'Dart', 'Flutter'],
      color: '#DD0031'
    },
    {
      id: 3,
      company: 'BizCon Solutions',
      position: 'System Engineer',
      period: 'August 2019 – January 2021',
      location: 'Bangkok, Thailand',
      achievements: [
        'Managed and optimized systems infrastructure for clients (SET, Betagro, FWD)',
        'Completed server installations and migrations including Windows Server Active Directory',
        'Reduced system downtime through proactive monitoring and maintenance',
        'Improved infrastructure reliability'
      ],
      technologies: ['Windows Server', 'Active Directory', 'Exchange', 'System Administration'],
      color: '#00B4AB'
    }
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="experience-timeline">


      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Professional Experience</h2>
        <p>Click on any experience to learn more about my journey</p>
      </motion.div>

      <motion.div
        className="timeline-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            className="timeline-item"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="timeline-marker" style={{ backgroundColor: experience.color }}>
              <div className="marker-dot"></div>
            </div>
            
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{experience.position}</h3>
                <h4>{experience.company}</h4>
                <p className="timeline-period">{experience.period}</p>
                <p className="timeline-location">{experience.location}</p>
              </div>
              
              <div className="timeline-achievements">
                <h5>Key Achievements:</h5>
                <ul>
                  {experience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              
              <div className="timeline-technologies">
                <h5>Technologies Used:</h5>
                <div className="tech-grid">
                  {experience.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag" style={{ backgroundColor: experience.color }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceTimeline; 