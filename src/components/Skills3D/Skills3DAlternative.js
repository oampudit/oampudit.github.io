import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import useTilt from "../../hooks/useTilt";
import useSpotlight from "../../hooks/useSpotlight";
import "./Skills3DAlternative.css";

const SKILLS = [
  { name: "C#",       level: "Expert",       desc: "Primary backend language — services, APIs, integrations." },
  { name: "Angular",  level: "Advanced",     desc: "Front-end framework for enterprise web apps." },
  { name: ".NET",     level: "Expert",       desc: "Microsoft platform — .NET Core, ASP.NET, EF." },
  { name: "SQL",      level: "Advanced",     desc: "Schema design, query tuning, migrations." },
  { name: "Flutter",  level: "Intermediate", desc: "Cross-platform mobile — one codebase, iOS + Android." },
  { name: "Dart",     level: "Intermediate", desc: "Companion language for Flutter projects." },
  { name: "Azure",    level: "Advanced",     desc: "Functions, Web Apps, Key Vault, Active Directory." },
  { name: "Git",      level: "Advanced",     desc: "Day-to-day version control and collaboration." },
];

const LEVELS = {
  Expert: 100,
  Advanced: 80,
  Intermediate: 60,
};

function SkillCard({ skill, isSelected, onSelect }) {
  const tilt = useTilt({ max: 6, scale: 1.02 });
  return (
    <motion.button
      type="button"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      onClick={() => onSelect(skill)}
      className={`sk-card tilt-card ${isSelected ? "is-active" : ""}`}
      whileTap={{ scale: 0.98 }}
    >
      <span className="sk-name">{skill.name}</span>
      <span className="sk-level">{skill.level}</span>
      <div className="sk-bar">
        <span style={{ width: `${LEVELS[skill.level] || 50}%` }} />
      </div>
    </motion.button>
  );
}

export default function Skills3DAlternative() {
  const [selected, setSelected] = useState(SKILLS[0]);
  const spot = useSpotlight();

  return (
    <div
      className="skills-pro spotlight"
      ref={spot.ref}
      onMouseMove={spot.onMouseMove}
      onMouseLeave={spot.onMouseLeave}
    >
      <Container>
        <motion.header
          className="sk-head"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">Stack</span>
          <h1 className="sk-title">Technical skills</h1>
          <p className="sk-sub">
            Hover to feel a card respond. Click to read a one-liner about the skill.
          </p>
        </motion.header>

        <div className="sk-grid">
          {SKILLS.map((s) => (
            <SkillCard
              key={s.name}
              skill={s}
              isSelected={selected?.name === s.name}
              onSelect={setSelected}
            />
          ))}
        </div>

        <motion.div
          className="sk-detail"
          key={selected?.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sk-detail-row">
            <span className="sk-detail-name">{selected.name}</span>
            <span className="sk-detail-level">{selected.level}</span>
          </div>
          <p className="sk-detail-desc">{selected.desc}</p>
        </motion.div>
      </Container>
    </div>
  );
}
