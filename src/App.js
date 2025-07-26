import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Footer";
import Skills3DAlternative from "./components/Skills3D/Skills3DAlternative";
import ExperienceTimeline from "./components/ExperienceTimeline/ExperienceTimeline";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home onNavigate={setCurrentSection} />;
      case 'skills':
        return <Skills3DAlternative />;
      case 'experience':
        return <ExperienceTimeline />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="App" id="scroll">
      <Navbar onNavigate={setCurrentSection} currentSection={currentSection} />
      <ScrollToTop />
      {renderSection()}
      <Footer />
    </div>
  );
}

export default App;
