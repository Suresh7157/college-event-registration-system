import { useEffect, useState } from "react";
import FilterBar from "../../components/events/FilterBar";
import AvailableEvents from "../../components/events/AvailableEvents";
import eventService from "../../services/eventService";

function EventList() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {

        try {

            const response = await eventService.getAllEvents();

            setEvents(response.data.content);

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <>
            <FilterBar />
            <AvailableEvents events={events} />
        </>
    );
}

export default EventList;