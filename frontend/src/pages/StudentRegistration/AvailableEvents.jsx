import { useState } from "react";

import Navbar from "../../components/common/Navbar";
import SearchBar from "../../components/registration/SearchBar";
import CategoryFilter from "../../components/registration/CategoryFilter";
import EventCard from "../../components/registration/EventCard";
import RegisterModal from "../../components/registration/RegisterModal";

import { events } from "../../data/events";

function AvailableEvents() {

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filteredEvents = events.filter((event) => {

        const matchesSearch = event.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    const openModal = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleRegister = () => {

        alert(`Successfully registered for ${selectedEvent.title}`);

        closeModal();

    };

    return (
        <>
            <Navbar />

            <div className="container py-4">

                <h2 className="fw-bold text-primary mb-4">
                    Available Events
                </h2>

                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <CategoryFilter
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <div className="row">

                    {
                        filteredEvents.length > 0 ? (

                            filteredEvents.map((event) => (

                                <div
                                    key={event.id}
                                    className="col-lg-4 col-md-6 mb-4"
                                >

                                    <EventCard
                                        event={event}
                                        onRegister={openModal}
                                    />

                                </div>

                            ))

                        ) : (

                            <div className="col-12 text-center py-5">

                                <h4>No Events Found</h4>

                                <p className="text-muted">
                                    Try another search or select a different category.
                                </p>

                            </div>

                        )
                    }

                </div>

            </div>

            <RegisterModal
                show={showModal}
                handleClose={closeModal}
                selectedEvent={selectedEvent}
                handleRegister={handleRegister}
            />

        </>
    );

}

export default AvailableEvents;