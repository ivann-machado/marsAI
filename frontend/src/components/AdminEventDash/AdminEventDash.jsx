import AdminEventCard from "./AdminEventCard";
import { useState, useEffect } from "react";
import AdminEventParticipants from "./AdminEventParticipants";

function AdminEventDash() {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setEvents(json.mockedEvents);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!events) return <p>Loading...</p>;

  return (
    <div className="w-4/5">
      {events.map((event) => (
        <AdminEventCard event={event} key={event.id} />
      ))}
      <div>
        <AdminEventParticipants isOpen={isOpen} eventId={1} />
      </div>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Click
      </div>
    </div>
  );
}

export default AdminEventDash;
