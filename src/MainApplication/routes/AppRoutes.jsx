import { Routes, Route } from "react-router-dom";
import LandingPage from "../../LandingPage/LandingPage";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import Tasks from "../pages/Tasks/Tasks";
import Notes from "../pages/Notes/Notes";
import Resources from "../pages/Resources/Resources";
import Profile from "../pages/Profile/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage></LandingPage>} />

      {/* Main Application */}
      <Route element={<MainLayout></MainLayout>}>
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        <Route path="/tasks" element={<Tasks></Tasks>} />
        <Route path="/notes" element={<Notes></Notes>} />
        <Route path="/resources" element={<Resources></Resources>} />
        <Route path="/profile" element={<Profile></Profile>} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
