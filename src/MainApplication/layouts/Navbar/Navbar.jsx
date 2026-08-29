import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

  const [user, setUser] = useState({});

  // Load user data from localStorage
  const loadUser = () => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("app_user_profile") || "{}",
      );

      setUser(storedUser);
    } catch (error) {
      console.error("Error loading user:", error);
      setUser({});
    }
  };

  useEffect(() => {
    // Load user when Navbar first mounts
    loadUser();

    // Listen for profile updates
    window.addEventListener("userProfileUpdated", loadUser);

    // Cleanup event listener
    return () => {
      window.removeEventListener("userProfileUpdated", loadUser);
    };
  }, []);

  const fullName = user.fullName || "User";
  const firstName = fullName.split(" ")[0];
  const firstLetter = firstName.charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">{currentTitle}</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-divider"></div>

        <div className="user-info">
          <div className="user-avatar">{firstLetter}</div>

          <div>
            <h4>{firstName}</h4>
            <span>Front-End Track</span>
          </div>
        </div>
      </div>
    </header>
  );
}
