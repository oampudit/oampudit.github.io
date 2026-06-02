import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Skills3DAlternative from "./components/Skills3D/Skills3DAlternative";
import ExperienceTimeline from "./components/ExperienceTimeline/ExperienceTimeline";
import ScrollToTop from "./components/ScrollToTop";
import Terminal from "./components/Terminal/Terminal";
import LiveGithub from "./components/LiveGithub/LiveGithub";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";
import "./theme.css";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [termOpen, setTermOpen] = useState(false);

  const navigate = useCallback((s) => {
    setCurrentSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      // Ignore when typing in input/textarea (except Escape + the toggle combo)
      const tag = document.activeElement?.tagName;
      const isTyping = tag === "INPUT" || tag === "TEXTAREA";

      if (e.key === "Escape" && termOpen) {
        e.preventDefault();
        setTermOpen(false);
        return;
      }
      if (isTyping && !termOpen) return;

      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTermOpen((p) => !p);
      } else if (e.key === "`" && !termOpen && !isTyping) {
        e.preventDefault();
        setTermOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [termOpen]);

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Home onNavigate={navigate} />;
      case "skills":
        return <Skills3DAlternative />;
      case "experience":
        return <ExperienceTimeline />;
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "github":
        return <LiveGithub />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="App" id="scroll">
      <Navbar onNavigate={navigate} currentSection={currentSection} />
      <ScrollToTop />
      {renderSection()}
      <Footer />

      <button
        type="button"
        className="term-trigger"
        title="Open terminal ( ` or Ctrl+K )"
        onClick={() => setTermOpen(true)}
      >
        <span style={{ color: "var(--accent)" }}>$</span> terminal
      </button>

      <Terminal
        open={termOpen}
        onClose={() => setTermOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}

export default App;
