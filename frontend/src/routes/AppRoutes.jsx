import { Routes, Route } from "react-router-dom";

// Authentication
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/ProtectedRoute";

// Student Registration
import Home from "../pages/Home/Home";
import AvailableEvents from "../pages/StudentRegistration/AvailableEvents";
import MyRegistrations from "../pages/StudentRegistration/MyRegistrations";
import RegistrationStatus from "../pages/StudentRegistration/RegistrationStatus";

function Dashboard() {
  return (
    <div className="container mt-5">
      <h1>Dashboard</h1>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Student Registration */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <AvailableEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute>
            <MyRegistrations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/registration-status"
        element={
          <ProtectedRoute>
            <RegistrationStatus />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;