import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import useTilt from "../../hooks/useTilt";
import useSpotlight from "../../hooks/useSpotlight";
import "./ExperienceTimeline.css";

const EXPERIENCES = [
  {
    id: 1,
    company: "PTT Digital Solutions",
    position: "Mid-Level Software Developer",
    period: "Nov 2023 — Present",
    location: "Bangkok, Thailand",
    achievements: [
      "Full-stack delivery of web and application solutions.",
      "Designed and deployed modules with clean business integration.",
      "Hardened systems via Azure Functions, Web Apps, Key Vault.",
      "Lifted operational documentation and runbook quality.",
    ],
    technologies: ["C#", ".NET Core", "Azure", "Angular", "SQL Server"],
  },
  {
    id: 2,
    company: "Bangkok Life Assurance",
    position: "Software Developer",
    period: "Apr 2021 — Nov 2023",
    location: "Bangkok, Thailand",
    achievements: [
      "Rewrote the group-insurance core; performance and security up across the board.",
      "Designed the customer mobile app: claims, notifications, history.",
      "Owned full release cycles in C# .NET Core, Oracle, Dart, Flutter.",
    ],
    technologies: ["C#", ".NET Core", "Oracle", "Dart", "Flutter"],
  },
  {
    id: 3,
    company: "BizCon Solutions",
    position: "System Engineer",
    period: "Aug 2019 — Jan 2021",
    location: "Bangkok, Thailand",
    achievements: [
      "Operated infrastructure for SET, Betagro, FWD.",
      "Migrations and installations: Windows Server, Active Directory, Exchange.",
      "Reduced incident frequency through proactive monitoring.",
    ],
    technologies: ["Windows Server", "Active Directory", "Exchange", "System Admin"],
  },
];

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
