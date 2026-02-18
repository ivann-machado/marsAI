import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";

function Event() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/events", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
        if (data && data.length > 0) {
          setSelectedEvent(data[0]);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white">
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-purple-900/20 to-black">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 rounded-full border border-white/20">
                {t("event_page.hero_badge") || "Events"}
              </div>
              <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter">
                {t("event_page.hero_title") || "EVENTS"}
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                {t("event_page.hero_description") ||
                  "Découvrez nos événements exclusifs et participez à des expériences inoubliables"}
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 md:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">
                    {t("event_page.loading") || "Chargement..."}
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-500 text-lg">{error}</p>
              </div>
            ) : !Array.isArray(events) || events.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  {t("event_page.no_events") || "Aucun événement disponible"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <h2 className="text-2xl font-black mb-6">
                    {t("event_page.list_title") || "Événements"}
                  </h2>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                          selectedEvent?.id === event.id
                            ? "bg-pink-500/20 border border-pink-500 shadow-lg shadow-pink-500/20"
                            : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                        }`}
                      >
                        <h3 className="font-bold text-white mb-1">
                          {event.name}
                        </h3>
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
                    ))}
                  </div>
                </div>

                {selectedEvent && (
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
                        <span className="font-semibold">Date:</span>{" "}
                        {selectedEvent.date} -{" "}
                        <span className="font-semibold">Duration:</span>{" "}
                        {selectedEvent.duration} minutes
                      </p>

                      <p className="mb-2">
                        <span className="font-semibold">Location:</span>{" "}
                        {selectedEvent.place}
                      </p>

                      <p className="mb-4">
                        <span className="font-semibold">Details:</span>{" "}
                        {selectedEvent.info}
                      </p>

                      <p className="mb-6">
                        <span className="font-semibold">
                          Lien de l'événement:
                        </span>{" "}
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

                      <div className="flex justify-center">
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300">
                          {t("event_page.register") || "S'inscrire"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Event;
