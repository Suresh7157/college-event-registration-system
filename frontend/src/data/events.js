import hackathonImg from "../assets/Images/hackathon.jpg";
import workshopImg from "../assets/Images/workshop.jpg";
import aiImg from "../assets/Images/ai-seminar.jpg";

export const events = [

    {
        id: 1,
        title: "Hackathon 2026",
        image: hackathonImg,
        category: "Technical",
        seats: 120,
        date: "10 Aug 2026",
        venue: "Auditorium",
        description: "24-hour coding challenge."
    },

    {
        id: 2,
        title: "Web Development Workshop",
        image: workshopImg,
        category: "Workshop",
        seats: 60,
        date: "15 Aug 2026",
        venue: "Seminar Hall",
        description: "Learn React & Spring Boot."
    },

    {
        id: 3,
        title: "AI Seminar",
        image: aiImg,
        category: "Seminar",
        seats: 80,
        date: "20 Aug 2026",
        venue: "Conference Hall",
        description: "Future of Artificial Intelligence."
    }

];