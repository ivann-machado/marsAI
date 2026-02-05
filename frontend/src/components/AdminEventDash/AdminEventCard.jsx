function AdminEventCard(props) {
  let event = props.event;
  return (
    <div className="bg-gray-800 min-h-25 border m-4 rounded-xl p-2 text-white">
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
        Lien de l'evenement:{" "}
        <a href={event.url} className="hover:text-blue-600">
          Lien
        </a>
      </p>
      <div className="flex justify-around">
        <button className="bg-gray-400 text-black text-center p-2 border-amber-50 rounded-xl  hover:bg-amber-200">
          Liste de participants
        </button>
        <button className="bg-gray-400 text-black text-center p-2 border-amber-50 rounded-xl hover:bg-amber-200">
          Sauvgarder modifications
        </button>
      </div>
    </div>
  );
}

export default AdminEventCard;
