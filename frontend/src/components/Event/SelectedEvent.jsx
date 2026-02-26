import { useTranslation } from "react-i18next";
import RegistrationForm from "./RegistrationForm.jsx";
import { useState, useEffec } from "react";

function SelectedEvent({ selectedEvent }) {
  const { t } = useTranslation();
  const [registration, setRegistration] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistrationSuccess = (msg) => {
    setRegistration(false);
    setSuccessMessage(msg);
    setErrorMessage("");
  };

  const handleRegistrationError = (msg) => {
    setErrorMessage(msg);
    setSuccessMessage("");
  };

  // clear messages after 3 seconds
  useEffect(() => {
    let timer;
    if (successMessage || errorMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  return (
    selectedEvent && (
      <div className="lg:col-span-2">
        <div className="bg-gray-800 border rounded-xl p-6 text-white">
          <h1 className="font-bold text-2xl text-center mb-4">
            {selectedEvent.name} - {selectedEvent.type}
          </h1>

          {selectedEvent.cover_image && (
            <div className="w-full mb-4">
              <img
                src={selectedEvent.cover_image}
                alt={selectedEvent.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <p className="mb-2">
            <span className="font-semibold">Date:</span> {selectedEvent.date} -{" "}
            <span className="font-semibold">Duration:</span>{" "}
            {selectedEvent.duration} minutes
          </p>

          <p className="mb-2">
            <span className="font-semibold">Location:</span>{" "}
            {selectedEvent.place}
          </p>

          <p className="mb-4">
            <span className="font-semibold">Details:</span> {selectedEvent.info}
          </p>

          <p className="mb-6">
            <span className="font-semibold">Lien de l'événement:</span>{" "}
            {selectedEvent.url ? (
              <a
                href={selectedEvent.url}
                className="hover:text-blue-400 text-blue-500"
              >
                Lien
              </a>
            ) : (
              "Non disponible"
            )}
          </p>

          {selectedEvent.logo && (
            <div className="mb-6">
              <img
                src={selectedEvent.logo}
                alt="Event Logo"
                className="h-16 object-contain"
              />
            </div>
          )}

          {/* messages displayed above the register button */}
          {successMessage && (
            <p className="text-green-400 text-center text-2xl font-bold mb-4">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-400 text-center text-2xl font-bold mb-4">
              {errorMessage}
            </p>
          )}
          <div className="flex justify-center">
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
              onClick={() => {
                setRegistration(true);
                setSuccessMessage("");
                setErrorMessage("");
              }}
            >
              {t("event_page.register") || "S'inscrire"}
            </button>
          </div>

          {registration && (
            <RegistrationForm
              selectedEvent={selectedEvent}
              onSuccess={handleRegistrationSuccess}
              onError={handleRegistrationError}
            />
          )}
        </div>
      </div>
    )
  );
}
export default SelectedEvent;
