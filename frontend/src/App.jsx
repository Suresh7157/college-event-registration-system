import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Volunteer Pages
import VolunteerDashboard from "./pages/VolunteerDashboard";
import MyProfile from "./pages/MyProfile";
import AssignedEvent from "./pages/AssignedEvent";
import Attendance from "./pages/Attendance";
import DutySchedule from "./pages/DutySchedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to dashboard */}
        <Route
          path="/"
          element={<Navigate to="/volunteer-dashboard" replace />}
        />

        {/* Volunteer Routes */}
        <Route
          path="/volunteer-dashboard"
          element={<VolunteerDashboard />}
        />

        <Route
          path="/my-profile"
          element={<MyProfile />}
        />

        <Route
          path="/assigned-event"
          element={<AssignedEvent />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/duty-schedule"
          element={<DutySchedule />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;