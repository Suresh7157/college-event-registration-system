import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Events from "./pages/admin/Events";
import Volunteers from "./pages/admin/Volunteers";

import Settings from "./pages/admin/Settings";
import Organizers from "./pages/admin/Organizers";
import Profile from "./pages/admin/Profile";

function App() {
  return (
      <BrowserRouter>

              <Routes>

                  {/* Authentication */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Admin */}
                  <Route path="/admin" element={<AdminLayout />}>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="users" element={<Users />} />
                      <Route path="events" element={<Events />} />
                      <Route path="volunteers" element={<Volunteers />} />
                      <Route path="organizers" element={<Organizers />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="profile" element={<Profile />} />
                  </Route>





              </Routes>

      </BrowserRouter>
  );
}
export default App;