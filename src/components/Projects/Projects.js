import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import mysteryagents from "../../Assets/Projects/mysteryagents.png";
import btcclock from "../../Assets/Projects/btc-clock.png";
import regolich from "../../Assets/Projects/regolich.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My <strong className="blue">Projects </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mysteryagents}
              title="Mystery Agents"
              description="Board game on mobile"
              demoLink="https://mystery-agents.web.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={btcclock}
              title="BTC Clock"
              description="BTC Clock is a web app that displays real-time Bitcoin block height, price, satoshis per unit of currency, local time, and halving estimate."
              demoLink="https://btc-clock.firebaseapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={regolich}
              title="RegoLich"
              description='RegoLich combines MOBA and Battle Royale genres with Bitcoin integration via Lightning Network and Nostr for decentralized transactions.'
              demoLink="https://regolich-project.firebaseapp.com/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
