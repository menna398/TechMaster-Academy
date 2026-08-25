import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar></Sidebar>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
