import { NavLink } from "react-router-dom";
import "../Sidebar/Sidebar.css";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">T</div>

          <div>
            <h3>TechMaster</h3>
            <span>Student Hub</span>
          </div>
        </div>

        <div className="sidebar-menu">
          <p className="menu-title">MENU</p>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            <span>▦</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            <span>☑</span>
            <span>Tasks</span>
          </NavLink>

          <NavLink
            to="/notes"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            <span>▤</span>
            <span>Notes</span>
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            <span>▯</span>
            <span>Resources</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            onClick={() => setIsOpen(false)}
          >
            <span>♙</span>
            <span>Profile</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}