import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";

function Contact() {
  const { t } = useTranslation();
  //const [name, setName] = useState('');
  const name = useRef();
  const email = useRef();
  const message = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameVal = name.current?.value?.trim();
    const emailVal = email.current?.value?.trim();
    const messageVal = message.current?.value?.trim();

    if (!nameVal || !emailVal || !messageVal) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(emailVal)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (messageVal.length < 10) {
      alert("Le message doit contenir au moins 10 caractères.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          message: messageVal,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert(data.message || "Message envoyé avec succès.");
        name.current.value = "";
        email.current.value = "";
        message.current.value = "";
      } else {
        alert(data.message || "Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      alert("Erreur réseau. Réessayez plus tard.");
    }
  };

  return (
    <>
      <Header />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%)`,
          backgroundSize: "cover",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 w-full">
        <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-rp from-pink-500 to-violet-500 bg-clip-text text-transparent text-white">
            {t("page_contact.contact_title")}
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Nom
              </label>
              <input
                ref={name}
                type="text"
                placeholder={t("page_contact.contact_name_placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Email
              </label>
              <input
                ref={email}
                type="email"
                placeholder={t("page_contact.contact_email_placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Message
              </label>
              <textarea
                ref={message}
                rows="5"
                placeholder={t("page_contact.contact_message_placeholder")}
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
      </div>
      <Footer />
    </>
  );
}

export default Contact;
