import React, { useState, useMemo, useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCards";
import useSpotlight from "../../hooks/useSpotlight";
import { projects as allProjects, filters } from "../../data/projects";
import "./Projects.css";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const spot = useSpotlight();

  const counted = useMemo(
    () =>
      filters.map((f) => ({
        ...f,
        count:
          f.id === "all"
            ? allProjects.length
            : allProjects.filter(
                (p) => p.category === f.id || p.status === f.id
              ).length,
      })),
    []
  );

  const filtered = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter(
      (p) => p.category === activeFilter || p.status === activeFilter
    );
  }, [activeFilter]);

  return (
    <div
      className="projects-pro spotlight"
      ref={spot.ref}
      onMouseMove={spot.onMouseMove}
      onMouseLeave={spot.onMouseLeave}
    >
      <Container>
        <motion.header
          className="projects-head"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Case studies</span>
          <h1 className="projects-title">Selected work</h1>
          <p className="projects-sub">
            Each card opens a full case study — problem, architecture, a code
            snippet, and the metrics that matter.
          </p>

          <div className="projects-filters">
            {counted.map((f) => (
              <button
                key={f.id}
                className={`pf-btn ${activeFilter === f.id ? "is-active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
                type="button"
              >
                {f.label}
                <span className="pf-count">{f.count}</span>
              </button>
            ))}
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="projects-grid"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.06 }}
                onClick={() => setSelected(project)}
                className="projects-cell"
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
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>

      <AnimatePresence>
        {selected && (
          <CaseStudyModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CaseStudyModal({ project, onClose }) {
  // Close on Escape and lock background scroll while the modal is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="cs-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cs-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="cs-close" onClick={onClose} type="button" aria-label="Close">
          ×
        </button>

        <div className="cs-hero">
          <img src={project.imgPath} alt={project.title} />
          <div className="cs-hero-meta">
            <span className={`cs-status cs-${project.status}`}>{project.status}</span>
            <span className="cs-year">{project.year}</span>
          </div>
        </div>

        <div className="cs-body">
          <h2 className="cs-title">{project.title}</h2>
          <p className="cs-tagline">{project.tagline}</p>

          <div className="cs-tech-tags">
            {project.technologies.map((t) => (
              <span key={t} className="cs-tech">{t}</span>
            ))}
          </div>

          <Sec label="Problem">
            <p>{project.problem}</p>
          </Sec>

          <Sec label="Architecture">
            <ul className="cs-bullets">
              {project.architecture.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </Sec>

          <Sec label="Implementation">
            <pre className={`cs-code lang-${project.codeSnippet.language}`}>
              <code>{project.codeSnippet.code}</code>
            </pre>
          </Sec>

          <Sec label="Results">
            <div className="cs-metrics">
              {project.metrics.map((m) => (
                <div key={m.label} className="cs-metric">
                  <div className="cs-metric-value">{m.value}</div>
                  <div className="cs-metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </Sec>

          <Sec label="Lessons">
            <p className="cs-lessons">{project.lessons}</p>
          </Sec>

          <Sec label="Features">
            <ul className="cs-bullets">
              {project.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </Sec>

          <div className="cs-links">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="cs-link demo">
                Live Demo <span>→</span>
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="cs-link gh">
                View Source <span>→</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Sec({ label, children }) {
  return (
    <section className="cs-section">
      <h3 className="cs-section-label">{label}</h3>
      {children}
    </section>
  );
}
