import fbLogo from "../../assets/fb.svg";
import instaLogo from "../../assets/insta.svg";
import twitterLogo from "../../assets/twitter.svg";
import ytLogo from "../../assets/youtube.svg";
import Loading from "../Utils/Loading";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useSettings } from "../../context/SettingsContext";
import { Link } from "react-router-dom";
import Editable from "../Utils/Editable";

function Footer() {
  const { t, i18n } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(null);
  const settings = useSettings();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const newsletterSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(newsletterEmail)) {
      setNewsletterError(null);

      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL + "/api/newsletter/subscribe",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: newsletterEmail,
            }),
          },
        );

        if (!res.ok) {
          setNewsletterError(res.message);
          return;
        }

        setNewsletterSuccess(t("footer.subscription_success"));
        //const response = await res.json();
      } catch (error) {
        console.error(error);
      }
    } else {
      setNewsletterError(t("footer.email_error"));
      setNewsletterSuccess(null);
    }
  };

  if (!settings) return <Loading />;

  return (
    <footer className="bg-gray-900 text-gray-300 w-full px-6 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 mb-20">
        {/* LEFT */}
        <div className="md:w-2/6">
          <p className="text-4xl font-bold text-white mb-6">
            MARS<span className="text-indigo-500">AI</span>
          </p>

          <p className="text-gray-400 mb-8 leading-relaxed">
            {settings.footer_message ? (
              <Editable
                initialValue={settings.footer_message}
                language={i18n.language}
                contentKey="footer_message"
              />
            ) : (
              t("footer.footer_message")
            )}
          </p>

          <div className="flex">
            <a
              href={
                settings.fb_link
                  ? settings.fb_link
                  : "https://www.facebook.com/LaPlateformeIO/?locale=fr_FR"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={fbLogo}
                className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
                alt="Facebook"
              />
            </a>

            <a
              href={
                settings.insta_link
                  ? settings.insta_link
                  : "https://www.instagram.com/laplateformeio/"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instaLogo}
                className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
                alt="Instagram"
              />
            </a>

            <a
              href={
                settings.youtube_link
                  ? settings.youtube_link
                  : "https://www.youtube.com/c/LaPlateformeIO"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={ytLogo}
                className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
                alt="YouTube"
              />
            </a>

            <a
              href={
                settings.twitter_link
                  ? settings.twitter_link
                  : "https://x.com/LaPlateformeIO"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitterLogo}
                className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
                alt="Twitter"
              />
            </a>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="md:flex-1 flex flex-col">
          <h4 className="text-indigo-400 mb-8 font-semibold text-lg">
            {t("footer.navigation")}
          </h4>

          <div className="flex gap-20">
            <ul className="space-y-4">
              <li className="hover:text-white transition">
                <Link to="/">{t("footer.footer_home")}</Link>
              </li>
              <li className="hover:text-white transition">
                <Link to="/event">{t("footer.schedule")}</Link>
              </li>
              <li className="hover:text-white transition">
                <Link to="/partners">{t("footer.partners")}</Link>
              </li>
            </ul>

            <ul className="space-y-4">
              {settings.phase != "1" ? (
                <li className="hover:text-white transition">
                  <Link to="/gallery">{t("footer.gallery")}</Link>
                </li>
              ) : null}

              <li className="hover:text-white transition">
                <Link to="/Faq">{t("footer.faq")}</Link>
              </li>

              <li className="hover:text-white transition">
                <Link to="/contact">{t("footer.contact")}</Link>
              </li>

              <li className="hover:text-white transition">
                <Link to="/CguCgv">{t("CguCgv_page.footer.cguCgv")}</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="md:w-2/6">
          <form className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-8 shadow-lg backdrop-blur-sm">
            <h3 className="text-white text-2xl font-bold mb-1">
              {t("footer.stay_connected")}
            </h3>

            <p className="text-sm text-indigo-200 mb-6">
              {t("footer.subscription")}
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                name="email"
                autoComplete="true"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 bg-gray-700/70 rounded-md h-12 px-3 text-white
                           focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              <button
                onClick={(e) => newsletterSubmit(e)}
                className="bg-indigo-500 text-white font-bold px-4 rounded-md
                           hover:bg-indigo-600 transition"
              >
                OK
              </button>
            </div>

            {newsletterError && (
              <p className="mt-4 text-sm bg-red-500/20 text-red-400 p-2 rounded">
                {newsletterError}
              </p>
            )}

            {newsletterSuccess && (
              <p className="mt-4 text-sm bg-green-500/20 text-green-400 p-2 rounded">
                {newsletterSuccess}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        <p>
          {settings.footer_bottom_message ? (
            <Editable
              initialValue={settings.footer_bottom_message}
              contentKey="footer_bottom_message"
              language={i18n.language}
            />
          ) : (
            t("footer.bottom_message")
          )}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
