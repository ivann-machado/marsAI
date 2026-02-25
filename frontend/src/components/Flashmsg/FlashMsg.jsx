function FlashMsg({ type, message, onClose }) {
  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
        ? "bg-red-600"
        : "bg-amber-500";

  return (
    <div
      className={`relative bottom-6 right-6 px-6 py-4 rounded-lg text-white ${bgColor}`}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-3 hover:bg-black"
      >
        ✕
      </button>
      <h5 className="font-bold mb-1">{type?.toUpperCase()}</h5>
      <p>{message}</p>
    </div>
  );
}

export default FlashMsg;
