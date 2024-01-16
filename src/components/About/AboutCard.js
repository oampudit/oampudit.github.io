import React from "react";
import Card from "react-bootstrap/Card";
import { VscDebugStackframe } from "react-icons/vsc";
import PropTypes from 'prop-types';

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Everyone! I am <span className="blue">Pudit Chokmeesuk</span>, based in the dynamic city of <span className="blue">Bangkok, Thailand.</span>
            <br />
            I currently embrace the role of a Full-Stack Developer, where I fuse innovation with practicality in software development. My journey in this field has been deeply influenced by my proficiency in diverse programming languages like C#, Dart, and TypeScript.
            <br />
            <br />
            My expertise extends to working with robust frameworks and libraries including the .NET Framework, Angular, and Flutter, enhancing my ability to develop versatile and high-performance web solutions. I am equally adept in the realms of HTML and CSS, underpinning my strong foundation in modern web development practices.
            <br />
            <br />
            The intricacies of database systems fascinate me, particularly Oracle Database (PL/SQL), where I have developed complex and efficient database solutions. My experience with version control systems, including Git, GitHub, and GitLab, has been pivotal in maintaining code integrity and facilitating team collaboration.
            <br />
            <br />
            Additionally, I have a practical understanding of Unreal Engine 4 and have leveraged Firebase in the development of scalable applications. This diverse skill set not only empowers my professional growth but also allows me to contribute significantly to various projects.
          </p>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

AboutCard.propTypes = {
  // Define your prop types here if any
};

export default AboutCard;
