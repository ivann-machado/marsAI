import { useState } from "react";
import AdminEventParticipants from "./AdminEventParticipants.jsx";
import { useFlash } from "../../context/FlashContext.jsx";
import { useauth } from "../../context/AuthContext.jsx";

function AdminEventCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState(props.event);
  const [modified, setModified] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useauth();
  const eventTypes = props.eventTypes ?? ["atelier"]; // à recuperer dans la DB

  const updateEvent = (key, value) => {
    setEvent((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  const saveEvent = async () => {
    const formData = new FormData();
    formData.append("type", event.type);
    formData.append("name", event.name);
    formData.append("url", event.url);
    formData.append("logo", event.logo);
    formData.append("info", event.info);
    formData.append("place", event.place);
    formData.append("duration", event.duration);
    formData.append("cover_image", event.cover_image);
    formData.append("date", event.date);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/events/" + event.id,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const json = await response.json();
      showFlash("success", "Event mis a jour");
    } catch (err) {
      showFlash("error", "Erreur de mise à jour du event");
      console.error(err);
    }

    setModified(false);
  };

  const deleteEvent = async () => {
    /* Suppresion dans la DB ici */
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/events/" + event.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");

      setEvent(null);
      setModified(false);
      showFlash("success", "Event supprimé");
    } catch (err) {
      console.error(err);
      showFlash("error", "Erreur de suppresion du event");
    }

    setModified(false);
  };

  const formatForDatetimeLocal = (isoString) => {
    const date = new Date(isoString);

    const pad = (n) => n.toString().padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const handleDateChange = (value) => {
    const isoString = new Date(value).toISOString();
    updateEvent("date", isoString);
  };

  if (!event) return <></>;

  return (
    <div className="bg-gray-800 min-h-25 max-w-200 mx-auto border m-4 rounded-xl p-2 text-white">
      <h1 className="font-bold text-xl text-center">
        Nom:
        <input
          value={event.name}
          onChange={(e) => updateEvent("name", e.target.value)}
          className="bg-gray-700 text-center"
        ></input>
        Type:
        <select
          value={event.type}
          onChange={(e) => updateEvent("type", e.target.value)}
          className="bg-gray-700 text-center"
        >
          {eventTypes.map((eventType) => (
            <option key={eventType} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
      </h1>
      <div className="flex justify-center items-center">
        <img src={event.cover_image} className="aspect-auto h-25"></img>
        <input
          type="file"
          id=""
          onChange={(e) => updateEvent("cover_image", e.target.value)}
          className="bg-gray-700"
        ></input>
      </div>
      <p>
        Date:
        <input
          type="datetime-local"
          value={formatForDatetimeLocal(event.date)}
          onChange={(e) => handleDateChange(e.target.value)}
          className="bg-gray-700 text-center ml-2"
        ></input>
        - Duration:
        <input
          value={event.duration}
          onChange={(e) => updateEvent("duration", e.target.value)}
          className="bg-gray-700 text-center"
        ></input>
        minutes
      </p>
      <p>
        Location:
        <input
          value={event.place}
          onChange={(e) => updateEvent("place", e.target.value)}
          className="bg-gray-700 text-center"
        ></input>
      </p>
      <p>
        Details:
        <input
          value={event.info}
          onChange={(e) => updateEvent("info", e.target.value)}
          className="bg-gray-700 text-center"
        ></input>
      </p>
      <p>
        Lien de l'evenement:
        <input
          type="url"
          value={event.url}
          onChange={(e) => updateEvent("url", e.target.value)}
          className="bg-gray-700 text-center"
        ></input>
      </p>
      <div className="flex justify-around">
        <button
          className="bg-gray-400 text-black text-center p-2 border-amber-50 rounded-xl  hover:bg-amber-200"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Liste de participants
        </button>
        {modified ? (
          <button
            className="bg-green-700 text-black text-center p-2 border-amber-50 rounded-xl hover:bg-amber-200"
            onClick={() => saveEvent()}
          >
            Sauvegarder
          </button>
        ) : null}
        <button
          className="bg-red-700 text-white text-center p-2 border-amber-50 rounded-xl hover:bg-red-500"
          onClick={() => deleteEvent()}
        >
          Supprimer evenement
        </button>
      </div>
      <AdminEventParticipants isOpen={isOpen} eventId={event.id} />
    </div>
  );
}

export default AdminEventCard;
