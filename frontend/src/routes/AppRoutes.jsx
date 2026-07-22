import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import EventList from "../pages/events/EventList";
import EventDetails from "../pages/events/EventDetails";
import CreateEvent from "../pages/events/CreateEvent";
import EditEvent from "../pages/events/EditEvent";
import ManageEvents from "../pages/events/ManageEvents";

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
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;