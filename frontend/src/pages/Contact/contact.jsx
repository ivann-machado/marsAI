import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';


function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    if (message.length < 10) {
      alert("Le message doit contenir au moins 10 caractères.");
      return;
    }
    console.log({ name, email, message });
  };


  return (
    <><Header />
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          {t("page_contact.contact_title")}
        </h1>



        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Nom
            </label>
            <input
              value = {name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Votre nom"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="exemple@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Message
            </label>
            <textarea
              value = {message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              placeholder="Votre message..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
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