import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import EventButton from "../../components/Event/EventButton.jsx";
import SelectedEvent from "../../components/Event/SelectedEvent.jsx";

function Event() {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // reservation form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/events",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.data);
        if (data.data && data.data.length > 0) {
          setSelectedEvent(data.data[0]);
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
      <meta
        name="description"
        content="Sur notre page évènements vous pourrez consulter tout les ateliers et interventions prévus pendant le festival, et vous pourrez si vous le souhaiter vous y inscrire"
      />
      <Header />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%)`,
          backgroundSize: "cover",
        }}
      />
      <div className="min-h-screen bg-[#050508] text-white font-inter">
        <section className="relative py-16 md:py-24 ">
          <div className="absolute inset-0 "></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 rounded-full border border-white/20 font-orbitron">
                {t("event_page.hero_badge") || "Events"}
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter font-orbitron">
                {t("event_page.hero_title") || "EVENTS"}
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg font-orbitron">
                {t("event_page.hero_description") ||
                  "Découvrez nos événements exclusifs et participez à des expériences inoubliables"}
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-16 md:py-24 ">
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
                  <h2 className="text-2xl font-black mb-6 font-orbitron">
                    {t("event_page.list_title") || "Événements"}
                  </h2>
                  <div className="space-y-3">
                    {events.map((event) => (
                      <EventButton
                        key={event.id}
                        event={event}
                        selected={selectedEvent?.id === event.id}
                        onClick={(e) => setSelectedEvent(e)}
                      />
                    ))}
                  </div>
                </div>

                <SelectedEvent selectedEvent={selectedEvent} />
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
