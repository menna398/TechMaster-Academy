import React from "react";
import "../About/About.css"

function About() {
  return (
    <div>
      <section className="about-section" id="about">
        <div className="about-container">
          <span className="about-label">ABOUT THE HUB</span>

          <h2>
            Designed for focused,
            <br />
            structured learners
          </h2>

          <p>
            TechMaster Student Hub is built around the way developers actually
            learn — in structured phases, with clear milestones, daily tasks,
            and consistent review.
          </p>

          <div className="about-features text-center">
            <div className="about-feature">
              <span className="check">✓</span>
              <span>Phase-based learning path with progress tracking</span>
            </div>

            <div className="about-feature">
              <span className="check">✓</span>
              <span>Personal task management with priority filtering</span>
            </div>

            <div className="about-feature">
              <span className="check">✓</span>
              <span>Note-taking system with pin and search</span>
            </div>

            <div className="about-feature">
              <span className="check">✓</span>
              <span>Curated resource library per phase</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
