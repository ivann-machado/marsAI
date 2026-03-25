import AdminEventCard from "./AdminEventCard";
import AdminEventForm from "./AdminEventForm";
import { useState, useEffect } from "react";
import Loading from "../Utils/Loading";

function AdminEventDash() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/events/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setEvents(json.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!events) return <Loading dashboard={true} />;

  return (
    <div className="w-full ml-64 min-h-screen bg-gray-950">
      {events.map((event) => (
        <AdminEventCard event={event} key={event.id} />
      ))}
      <AdminEventForm />
    </div>
  );
}

export default AdminEventDash;
