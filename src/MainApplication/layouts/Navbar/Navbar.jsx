import { useLocation } from "react-router-dom";
import "../Navbar/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/tasks": "Tasks",
    "/notes": "Notes",
    "/resources": "Resources",
    "/profile": "Profile",
  };

  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">{currentTitle}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-divider"></div>

        <div className="user-info">
          <div className="user-avatar">
            M
          </div>

          <div>
            <h4>Menna</h4>
            <span>Front-End Track</span>
          </div>
        </div>
      </div>
    </header>
  );
}