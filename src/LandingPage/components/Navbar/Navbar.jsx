import React from "react";
import "../Navbar/Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid px-4">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <div className="logo-circle">T</div>

            <div className="brand-text">
              <div className="brand-name">TechMaster</div>
              <div className="brand-subtitle">Academy</div>
            </div>
          </a>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Links */}
            <ul className="navbar-nav ms-5 gap-lg-4">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
            </ul>

            {/* Button */}
            <div className="ms-auto mt-3 mt-lg-0">
              <a href="/student-hub" className="student-btn">
                Enter Student Hub
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
