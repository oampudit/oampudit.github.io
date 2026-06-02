import React from "react";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import useTilt from "../../hooks/useTilt";

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
  } = props;

  const tilt = useTilt({ max: 5, scale: 1.01 });

  const stop = (e) => e.stopPropagation();

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="pc-card tilt-card"
    >
      <div className="pc-image">
        <img src={imgPath} alt={title} loading="lazy" />
        <div className="pc-image-frame" />
      </div>

      <div className="pc-body">
        <div className="pc-head">
          <h3 className="pc-title">{title}</h3>
          <span className={`pc-status pc-${status}`}>{status}</span>
        </div>

        <p className="pc-desc">{description}</p>

        {technologies.length > 0 && (
          <div className="pc-techs">
            {technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="pc-tech">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="pc-footer">
          <span className="pc-year">{year}</span>
          <div className="pc-links">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                aria-label="View source"
                className="pc-iconlink"
              >
                <BsGithub />
              </a>
            )}
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={stop}
                aria-label="Live demo"
                className="pc-iconlink"
              >
                <FiExternalLink />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCards;
