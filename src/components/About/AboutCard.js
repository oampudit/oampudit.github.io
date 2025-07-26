import React from "react";
import { motion } from "framer-motion";

function AboutCard() {
  return (
    <motion.div 
      className="about-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="about-content">
        <p className="about-text">
          Hello Everyone! I am <span className="highlight">Pudit Chokmeesuk</span>, a Full-Stack Developer based in <span className="highlight">Bangkok, Thailand</span> with expertise in C#, Angular, .NET, and SQL.
        </p>
        
        <p className="about-text">
          Currently working at <span className="highlight">PTT Digital Solutions</span> as a Mid-Level Software Developer, I specialize in building dynamic, scalable web and mobile applications. My experience spans across delivering end-to-end solutions that enhance business processes and operational efficiency.
        </p>
        
        <p className="about-text">
          I have a proven ability to lead digital transformation projects, improving system performance and user experience. My technical expertise includes C#, Dart, TypeScript, PL/SQL, JavaScript, and Python, along with frameworks like .NET Core, Angular, and Flutter.
        </p>
        
        <p className="about-text">
          I've successfully worked with databases including Oracle and Microsoft SQL Server, and have experience with cloud platforms like Azure, Firebase, and various development tools. My background includes significant experience at Bangkok Life Assurance and BizCon Solutions, where I've delivered impactful solutions for insurance systems and infrastructure management.
        </p>
        
        <p className="about-text">
          I hold a Master of Business Management from Mahidol University and a Bachelor of Electrical Engineering from King Mongkut's University of Technology North Bangkok, combining technical expertise with business acumen.
        </p>
      </div>
    </motion.div>
  );
}

AboutCard.propTypes = {
  // Define your prop types here if any
};

export default AboutCard;
