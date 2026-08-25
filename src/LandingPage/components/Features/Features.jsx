import React from "react";
import "../Features/Features.css";
import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: "▥",
      title: "Track Progress",
      description:
        "Monitor your journey with clear progress indicators and phase-by-phase tracking.",
      color: "blue",
    },
    {
      icon: "▣",
      title: "Manage Tasks",
      description:
        "Prioritize assignments and deadlines. Filter by status and never miss a deadline.",
      color: "purple",
    },
    {
      icon: "▤",
      title: "Save Notes",
      description:
        "Capture key concepts, snippets and ideas. Pin the important ones to the top.",
      color: "green",
    },
    {
      icon: "▱",
      title: "Learning Resources",
      description:
        "Curated guides, handbooks and cheat sheets for every phase of your track.",
      color: "orange",
    },
    {
      icon: "♙",
      title: "Student Profile",
      description:
        "Track your skills, earned badges, and overall progress across the curriculum.",
      color: "red",
    },
  ];

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        {/* Section Header */}
        <div className="features-header">
          <span className="features-label">FEATURES</span>

          <h2>Everything in one place</h2>

          <p>
            Purpose-built tools for TechMaster Academy students to stay
            <br className="desktop-break" />
            organized through every phase.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className={`feature-icon ${feature.color}`}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Link */}
        <div className="features-link-wrapper">
          <Link to="/dashboard" className="features-link">
            Explore Student Hub
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features;
