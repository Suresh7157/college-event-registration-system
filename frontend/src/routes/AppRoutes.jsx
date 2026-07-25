import { Routes, Route } from "react-router-dom";

// Authentication
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/ProtectedRoute";

// Student Module
import Home from "../pages/Home/Home";
import AvailableEvents from "../pages/StudentRegistration/AvailableEvents";
import MyRegistrations from "../pages/StudentRegistration/MyRegistrations";
import RegistrationStatus from "../pages/StudentRegistration/RegistrationStatus";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";

// Event Module
import Layout from "../components/layout/Layout";
import EventList from "../pages/events/EventList";
import EventDetails from "../pages/events/EventDetails";
import CreateEvent from "../pages/events/CreateEvent";
import EditEvent from "../pages/events/EditEvent";
import ManageEvents from "../pages/events/ManageEvents";
import Registrations from "../pages/events/Registrations";
import VolunteerApplications from "../pages/events/VolunteerApplications";
import Profile from "../pages/events/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* Authentication */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Dashboard */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
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

      {/* Event Management */}
      <Route
        path="/events-list"
        element={
          <Layout>
            <EventList />
          </Layout>
        }
      />

      <Route
        path="/events/:id"
        element={
          <Layout>
            <EventDetails />
          </Layout>
        }
      />

      <Route
        path="/events/create"
        element={
          <Layout>
            <CreateEvent />
          </Layout>
        }
      />

      <Route
        path="/events/edit/:id"
        element={
          <Layout>
            <EditEvent />
          </Layout>
        }
      />

      <Route
        path="/manage-events"
        element={
          <Layout>
            <ManageEvents />
          </Layout>
        }
      />

      <Route
        path="/registrations"
        element={
          <Layout>
            <Registrations />
          </Layout>
        }
      />

      <Route
        path="/volunteer-applications"
        element={
          <Layout>
            <VolunteerApplications />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

    </Routes>
  );
}

export default AppRoutes;