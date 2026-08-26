import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function MainLayout() {
  return (
    <div className="main-layout">
      <Navbar></Navbar>

      <div className="main-body">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
