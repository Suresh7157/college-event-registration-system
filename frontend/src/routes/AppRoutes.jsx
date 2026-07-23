import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import AvailableEvents from "../pages/StudentRegistration/AvailableEvents";
import MyRegistrations from "../pages/StudentRegistration/MyRegistrations";
import RegistrationStatus from "../pages/StudentRegistration/RegistrationStatus";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<AvailableEvents />} />
                <Route path="/my-registrations" element={<MyRegistrations />} />
                <Route path="/registration-status" element={<RegistrationStatus />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;