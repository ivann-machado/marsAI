import fbLogo from "../../assets/fb.svg";
import instaLogo from "../../assets/insta.svg";
import twitterLogo from "../../assets/twitter.svg";
import ytLogo from "../../assets/youtube.svg";
import Loading from "../Utils/Loading";
import { useTranslation } from "react-i18next";
import { useState, useContext } from "react";
import { useSettings } from "../../context/SettingsContext";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(null);
  const settings = useSettings();

  // console.log("settings in footer ", settings);

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
          "http://localhost:3000/api/newsletter/subscribe",
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
        const response = await res.json();

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      setNewsletterError(t("footer.email_error"));
      setNewsletterSuccess(null);
    }
  };

  if (!settings) return <Loading />;

  /*   console.log(
    settings.bg_color_primary_alt,
    (settings.bg_color_primary_alt
      ? " bg-[" + settings.bg_color_primary_alt + "] "
      : " bg-gray-900 ") + " w-full px-10 py-20",
  ); */

  // Exemple si on veut changer dynamiquement le CSS en utilisant settings, à voir si on trouve une meilleure solution
  {
    /* <footer
      style={{
        "--bg_color_primary_alt": settings?.bg_color_primary_alt || "#000000",
      }}
      className="bg-[color:var(--bg_color_primary_alt)] w-full px-10 py-20"
    > */
  }

  return (
    <footer className="bg-gray-900  w-full px-10 py-20">
      <div className="flex flex-col md:col-4 md:flex-row text-gray-600 mb-20">
        <div className="md:w-2/6 mb-7">
          <p className="text-4xl font-bold text-white mb-7">
            MARS
            <span className="text-4xl text-indigo-500 font-bold">AI</span>
          </p>
          <p className="text-gray-600 mb-7">{t("footer.footer_message")}</p>
          <div className="flex">
            <img
              src={fbLogo}
              className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
            ></img>
            <img
              src={instaLogo}
              className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
            ></img>
            <img
              src={ytLogo}
              className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
            ></img>
            <img
              src={twitterLogo}
              className="p-2 mr-2 rounded-full border border-gray-600 w-10 aspect-square hover:bg-gray-500"
            ></img>
          </div>
        </div>
        <div className="md:w-1/6">
          <h4 className="text-purple-600 mb-7">{t("footer.navigation")}</h4>
          <ul>
            {settings.phase != "1" ? (
              <li className="mb-7 hover:underline">
                <Link to="/">{t("footer.footer_home")}</Link>
              </li>
            ) : null}
            <li className="mb-7 hover:underline">
              <Link to="/event">{t("footer.schedule")}</Link>
            </li>
            {settings.phase != "1" ? (
              <li className="mb-7 hover:underline">
                <Link to="/gallery">{t("footer.gallery")}</Link>
              </li>
            ) : null}
            <li className="mb-7 hover:underline">{t("footer.tickets")}</li>
          </ul>
        </div>
        <div className="md:w-1/6">
          <h4 className="text-pink-600 mb-7">{t("footer.legal")}</h4>
          <ul>
            <li className="mb-7 hover:underline">
              <Link to="/partners">{t("footer.partners")}</Link>
            </li>
            <li className="mb-7 hover:underline">{t("footer.faq")}</li>
            <li className="mb-7 hover:underline">
              <Link to="/contact">{t("footer.contact")}</Link>
            </li>
            <li className="mb-7 hover:underline">
              <Link to="/CguCgv">{t("CguCgv_page.footer.cguCgv")}</Link>
            </li>
          </ul>
        </div>
        <div className="md:w-2/6">
          <form className="rounded-3xl border bg-gray-800 p-10">
            <h3 className="text-white text-3xl font-bold mb-7">
              {t("footer.stay_connected")}
            </h3>
            <input
              type="text"
              className="bg-gray-500 rounded-md h-14 p-2"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Email"
            ></input>
            <input
              type="button"
              value="Ok"
              onClick={(e) => newsletterSubmit(e)}
              className="bg-white rounded-md h-14 w-14 p-2 ml-2 font-bold hover:bg-gray-200"
            ></input>
            <p className={newsletterError ? "bg-red-500" : "hidden"}>
              {newsletterError}
            </p>
            <p className={newsletterSuccess ? "bg-green-500" : "hidden"}>
              {newsletterSuccess}
            </p>
          </form>
        </div>
      </div>
      <div>
        <p>2026 MARS AI PROTOCOL</p>
      </div>
    </footer>
  );
}

export default Footer;
