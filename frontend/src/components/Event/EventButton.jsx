function EventButton({ event, onClick, selected }) {
  return (
    <button
      key={event.id}
      onClick={() => onClick(event)}
      className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
        selected
          ? "bg-pink-500/20 border border-pink-500 shadow-lg shadow-pink-500/20"
          : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
      }`}
    >
      <h3 className="font-bold text-white mb-1">{event.name}</h3>
      <p className="text-xs font-semibold text-pink-400 uppercase">
        {event.type}
      </p>
      {event.date && (
        <p className="text-xs text-gray-500 mt-2">
          {new Date(event.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}
    </button>
  );
}

export default EventButton;
