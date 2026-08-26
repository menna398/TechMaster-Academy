import "../Navbar/Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-title">Dashboard</h2>
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