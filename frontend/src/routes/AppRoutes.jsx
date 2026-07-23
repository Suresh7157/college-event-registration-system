import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  return <h1>Dashboard</h1>;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
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
    </BrowserRouter>
  );
}

export default AppRoutes;