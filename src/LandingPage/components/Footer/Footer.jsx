import React from "react";
import "../Footer/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer">
        {/* CTA Section */}
        <div className="footer-cta">
          <span className="footer-label">GET STARTED</span>

          <h2>
            Ready to take control of
            <br />
            your learning journey?
          </h2>

          <p>
            Your personalized dashboard is waiting. Track progress, manage
            tasks, and stay organized
            <br />
            through every phase.
          </p>

          <Link to="/dashboard" className="footer-button text-decoration-none">
            Enter Student Hub
            <span>→</span>
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-brand">
            <div className="footer-logo">T</div>
            <span>TechMaster Academy</span>
          </div>

          <p>© 2026 TechMaster Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
