import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage/LandingPage";
import MainLayout from "./MainApplication/layouts/MainLayout";

import Dashboard from "./MainApplication/pages/Dashboard/Dashboard";
import Tasks from "./MainApplication/pages/Tasks/Tasks";
import Notes from "./MainApplication/pages/Notes/Notes";
import Resources from "./MainApplication/pages/Resources/Resources";
import Profile from "./MainApplication/pages/Profile/Profile";

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Main Application */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
