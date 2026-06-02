import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "github", label: "GitHub" },
];

const NavbarComponent = ({ onNavigate, currentSection }) => {
  const [expand, setExpand] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverId, setHoverId] = useState(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [resizeTick, setResizeTick] = useState(0);
  const itemRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 20);
    const onResize = () => setResizeTick((t) => t + 1);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useLayoutEffect(() => {
    const target = itemRefs.current[hoverId ?? currentSection];
    if (!target) return setIndicator((s) => ({ ...s, opacity: 0 }));
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.parentElement.getBoundingClientRect();
    setIndicator({
      left: rect.left - parentRect.left,
      width: rect.width,
      opacity: 1,
    });
  }, [hoverId, currentSection, expand, resizeTick]);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={scrolled ? "nav-root nav-scrolled" : "nav-root"}
    >
      <Container>
        <Navbar.Brand
          className="nav-brand"
          onClick={() => onNavigate("home")}
          role="button"
        >
          <span className="nav-brand-mark" aria-hidden>P</span>
          <span className="nav-brand-text">Pudit<span className="nav-brand-dot">.</span></span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpand((v) => (v ? false : "expanded"))}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            className="ms-auto nav-items"
            onMouseLeave={() => setHoverId(null)}
          >
            <span
              className="nav-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />
            {NAV_ITEMS.map((item) => (
              <Nav.Item key={item.id}>
                <button
                  type="button"
                  ref={(el) => (itemRefs.current[item.id] = el)}
                  className={`nav-btn ${currentSection === item.id ? "is-active" : ""}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setExpand(false);
                  }}
                  onMouseEnter={() => setHoverId(item.id)}
                >
                  {item.label}
                </button>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
