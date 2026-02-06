import { useState, useEffect } from "react";

function AdminEventParticipants({ isOpen, eventId }) {
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        eventId === 1
          ? setParticipants(json.event_participants)
          : setParticipants([]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!participants) return <p className="hidden">Loading...</p>;

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
