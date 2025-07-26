import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Skills3DAlternative.css';

const Skills3DAlternative = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skills = [
    { name: 'C#', color: '#68217A', level: 'Expert', description: 'Primary language for backend development' },
    { name: 'Angular', color: '#DD0031', level: 'Advanced', description: 'Frontend framework for web applications' },
    { name: '.NET', color: '#512BD4', level: 'Expert', description: 'Microsoft development platform' },
    { name: 'SQL', color: '#336791', level: 'Advanced', description: 'Database management and queries' },
    { name: 'Flutter', color: '#02569B', level: 'Intermediate', description: 'Cross-platform mobile development' },
    { name: 'Dart', color: '#00B4AB', level: 'Intermediate', description: 'Programming language for Flutter' },
    { name: 'Azure', color: '#0078D4', level: 'Advanced', description: 'Cloud platform and services' },
    { name: 'Git', color: '#F05032', level: 'Advanced', description: 'Version control and collaboration' }
  ];



  return (
    <div className="modern-skills">
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="skills-title">Technical Skills</h2>
          <div className="skills-line"></div>
          <p className="skills-subtitle">Click on the skill cubes to explore my expertise</p>
        </motion.div>

        <motion.div
          className="skills-info"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {selectedSkill && (
            <motion.div
              className="skill-details"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{selectedSkill.name}</h3>
              <p className="skill-level">Level: {selectedSkill.level}</p>
              <p className="skill-description">{selectedSkill.description}</p>
            </motion.div>
          )}
        </motion.div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-cube"
              style={{ 
                '--cube-color': skill.color,
                '--animation-delay': `${index * 0.1}s`
              }}
              onClick={() => setSelectedSkill(skill)}
              
              whileHover={{ 
                scale: 1.2, 
                rotateY: 20, 
                rotateX: 20,
                z: 100,
                boxShadow: `0 20px 40px ${skill.color}40`
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <div className="cube-face front">
                <span className="skill-name">{skill.name}</span>
              </div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills3DAlternative; 