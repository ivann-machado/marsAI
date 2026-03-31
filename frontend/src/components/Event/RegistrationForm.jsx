import { useState } from "react";
import { useTranslation } from "react-i18next";

function RegistrationForm({ selectedEvent, onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/reservations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            event_id: selectedEvent?.id,
          }),
        },
      );
      if (res.ok) {
        const msg = "Inscription réussie !";
        setFormSuccess(msg);
        if (onSuccess) onSuccess(msg);
      } else {
        setFormError("Erreur lors de l'inscription.");
      }
    } catch (error) {
      setFormError("Erreur réseau.");
    }
  };
  return (
    <div className="bg-gray-800 border rounded-xl p-6 text-white mt-6">
      <h2 className="font-bold text-xl mb-4">Inscription à l'événement</h2>
      {formError && <p className="text-red-500 mb-4">{formError}</p>}
      {formSuccess && <p className="text-green-500 mb-4">{formSuccess}</p>}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Nom
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
            type="text"
            placeholder={t("event_page.event_lastName")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Prénom
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
            type="text"
            placeholder={t("event_page.event_firstName")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
            Email
          </label>
          <input
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            type="email"
            placeholder={t("event_page.event_email")}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
export default RegistrationForm;
