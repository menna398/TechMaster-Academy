import React from "react";
import "../Hero/Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div>
      <section id="Home" className="hero-section">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row align-items-center">
            {/* Hero Content */}
            <div className="col-lg-7 col-xl-6">
              {/* Badge */}
              <div className="hero-badge">
                <span className="badge-dot"></span>
                TechMaster Academy · Student Platform
              </div>

              {/* Heading */}
              <h1 className="hero-title">
                Your Learning
                <br />
                Journey, <span>Organized.</span>
              </h1>

              {/* Description */}
              <p className="hero-description">
                Track your progress, manage tasks, save notes
                <br className="d-none d-md-block" />
                and access your learning resources — all in one
                <br className="d-none d-md-block" />
                focused workspace.
              </p>

              {/* Buttons */}
              <div className="hero-buttons">
                <Link to="/dashboard" className="hero-primary-btn">
                  Enter Student Hub
                  <span>→</span>
                </Link>

                <a href="#features" className="hero-secondary-btn">
                  Explore Features
                </a>
              </div>

              {/* Features */}
              <div className="hero-features">
                <div className="hero-feature">
                  <span>📈</span>
                  <span>Progress Tracking</span>
                </div>

                <div className="hero-feature">
                  <span>✅</span>
                  <span>Task Management</span>
                </div>

                <div className="hero-feature">
                  <span>📝</span>
                  <span>Smart Notes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
