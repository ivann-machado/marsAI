import { useState } from "react";
import AdminEventParticipants from "./AdminEventParticipants.jsx";
import { useFlash } from "../../context/FlashContext.jsx";
import { useauth } from "../../context/AuthContext.jsx";

function AdminEventCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState(props.event);
  const [modified, setModified] = useState(false);
  const { showFlash} = useFlash();
  const authToken = useauth()


  const updateEvent = (key, value) => {
    setEvent((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  const saveEvent = async () => {
    const formData = new FormData();
    formData.append("type",event.type);
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
          headers: { "Content-Type": "application/json",
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

if (!event) return (<></>)

  return (
    <div className="bg-gray-800 min-h-25 max-w-200 mx-auto border m-4 rounded-xl p-2 text-white">
      <h1 className="font-bold text-xl text-center">
        {event.name} - {event.type}
      </h1>
      <img src={event.cover_image} className="w-full h-25"></img>
      <p>
        Date: {event.date} - Duration: {event.duration} minutes
      </p>
      <p>Location: {event.place}</p>
      <p>Details: {event.info}</p>
      <p>
        Lien de l'evenement: 
        <a href={event.url} className="hover:text-blue-600">
          {event.url}
        </a>
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
        {modified ? <button className="bg-green-700 text-black text-center p-2 border-amber-50 rounded-xl hover:bg-amber-200">
          Sauvegarder
        </button> : null}
        <button className="bg-red-700 text-white text-center p-2 border-amber-50 rounded-xl hover:bg-red-500"
        onClick={() => deleteEvent()}>
          Supprimer evenement
        </button>
      </div>
      <AdminEventParticipants isOpen={isOpen} eventId={event.id} />
    </div>
  );
}

export default AdminEventCard;
