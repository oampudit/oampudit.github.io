import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import useTilt from "../../hooks/useTilt";
import useSpotlight from "../../hooks/useSpotlight";
import { experience as EXPERIENCES } from "../../data/experience";
import "./ExperienceTimeline.css";

function TiltItem({ children }) {
  const tilt = useTilt({ max: 4, scale: 1.005 });
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="tl-item tilt-card"
    >
      {children}
    </div>
  );
}

export default function ExperienceTimeline() {
  const spot = useSpotlight();
  return (
    <div
      className="timeline-pro spotlight"
      ref={spot.ref}
      onMouseMove={spot.onMouseMove}
      onMouseLeave={spot.onMouseLeave}
    >
      <Container>
        <motion.header
          className="tl-head"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Career</span>
          <h1 className="tl-title">Professional experience</h1>
          <p className="tl-sub">
            Roles, scope, and the parts I'm proud of.
          </p>
        </motion.header>

        <div className="tl-rail">
          {EXPERIENCES.map((e, i) => (
            <motion.div
              key={e.id}
              className="tl-row"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="tl-marker">
                <div className="tl-dot" />
              </div>
              <TiltItem>
                <div className="tl-item-head">
                  <div>
                    <h3 className="tl-position">{e.position}</h3>
                    <div className="tl-company">
                      {e.company} <span className="tl-sep">·</span>{" "}
                      <span className="tl-loc">{e.location}</span>
                    </div>
                  </div>
                  <span className="tl-period">{e.period}</span>
                </div>
                <ul className="tl-list">
                  {e.achievements.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
                <div className="tl-tags">
                  {e.technologies.map((t) => (
                    <span key={t} className="tl-tag">{t}</span>
                  ))}
                </div>
              </TiltItem>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
