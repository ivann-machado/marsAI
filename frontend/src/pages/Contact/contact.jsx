import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer.jsx";
import Header from "../../components/Header/Header.jsx";
import { useFlash } from "../../context/FlashContext.jsx";

function Contact() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [message, setMessage] = useState("");
  const [messageValid, setMessageValid] = useState("");
  const { showFlash } = useFlash();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameVal = name.trim();
    const emailVal = email.trim();
    const messageVal = message.trim();

    if (!nameVal || !emailVal || !messageVal) {
      if (!nameVal) setNameValid(t("page_contact.error_empty_field"));
      if (!emailVal) setEmailValid(t("page_contact.error_empty_field"));
      if (!messageVal) setMessageValid(t("page_contact.error_empty_field"));
      showFlash("error", t("page_contact.error_empty_fields"));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(emailVal)) {
      setEmailValid(t("page_contact.error_invalid_email"));
      showFlash("error", t("page_contact.error_invalid_email"));
      return;
    }

    if (messageVal.length < 10) {
      setMessageValid(t("page_contact.error_minimum_length"));
      showFlash("error", t("page_contact.error_minimum_length"));
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
        showFlash(
          "success",
          data.message || t("page_contact.success_message_sent"),
        );
        setName("");
        setEmail("");
        setMessage("");
        setNameValid("");
        setEmailValid("");
        setMessageValid("");
      } else {
        showFlash(
          "error",
          data.message || t("page_contact.error_message_fail"),
        );
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      showFlash("error", t("page_contact.error_network"));
    }
  };

  const validateName = () => {
    if (name.length < 1) {
      setNameValid(t("page_contact.error_empty_field"));
    } else {
      setNameValid("");
    }
  };

  useEffect(() => {
    if (name.length > 1) {
      setNameValid("");
    }
  }, [name]);

  const validateEmail = () => {
    if (email.length < 1) {
      setEmailValid(t("page_contact.error_empty_field"));
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailValid(t("page_contact.error_invalid_email"));
    } else setEmailValid("");
  };

  useEffect(() => {
    if (/\S+@\S+\.\S+/.test(email)) setEmailValid("");
  }, [email]);
  j;

  const validateMessage = () => {
    if (message.length < 10) {
      setMessageValid(t("page_contact.error_minimum_length"));
    } else setMessageValid("");
  };

  useEffect(() => {
    if (message.length >= 10) setMessageValid("");
  }, [message]);

  /*   useEffect(() => {
    setNameValid("");
    setEmailValid("");
    setMessageValid("");
  }, []); */

  return (
    <>
      <Header />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%)`,
          backgroundSize: "cover",
        }}
      />
      <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 w-full">
        <div className="w-full max-w-lg bg-gray-900 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-rp from-pink-500 to-violet-500 bg-clip-text text-transparent text-white">
            {t("page_contact.contact_title")}
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Nom
              </label>
              <input
                value={name}
                type="text"
                placeholder={t("page_contact.contact_name_placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateName()}
              />
              <div className="text-red-800">{nameValid}</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder={t("page_contact.contact_email_placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white "
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail()}
              />
              <div className="text-red-800">{emailValid}</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                Message
              </label>
              <textarea
                value={message}
                rows="5"
                placeholder={t("page_contact.contact_message_placeholder")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                onChange={(e) => setMessage(e.target.value)}
                onBlur={() => validateMessage()}
              />
              <div className="text-red-800">{messageValid}</div>
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
