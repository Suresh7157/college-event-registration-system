import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/volunteer-applications" element={<VolunteerApplications />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;
