import { useState, useEffect } from "react";
import Loading from "../Utils/Loading";

function AdminEventParticipants({ isOpen, eventId }) {
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL + "/api/reservations/?event_id=${eventId}"}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setParticipants(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!participants) return <Loading />;

  return (
    <div className={isOpen ? "block" : "hidden"}>
      {participants.map((participant) => (
        <p key={participant.id}>
          {participant.firstname} {participant.lastname} {participant.email}
        </p>
      ))}
    </div>
  );
}

export default AdminEventParticipants;
