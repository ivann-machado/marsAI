import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import Footer from '../../components/Footer/Footer.jsx';
import Header from '../../components/Header/Header.jsx';


function Contact() {
  const { t } = useTranslation();
  //const [name, setName] = useState('');
  const name =useRef()
  const email = useRef();
  const message = useRef();

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
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
      {t("page_contact.contact_title")}
      </h1>
                <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Nom
            </label>
            <input
              ref={name}
              type="text"
              placeholder={t("page_contact.contact_name_placeholder")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Email
            </label>
            <input
              ref = {email}
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
              ref = {message}
              rows="5"
              placeholder={t("page_contact.contact_message_placeholder")}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
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