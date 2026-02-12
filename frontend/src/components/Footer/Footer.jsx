import fbLogo from "../../assets/fb.svg";
import instaLogo from "../../assets/insta.svg";
import twitterLogo from "../../assets/twitter.svg";
import ytLogo from "../../assets/youtube.svg";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 w-screen px-10 py-20">
      <div className="flex flex-col md:col-4 md:flex-row text-gray-600 mb-20">
        <div className="md:w-2/6 mb-7">
          <p className="text-4xl font-bold text-white mb-7">
            MARS <span className="text-4xl text-indigo-500 font-bold">AI</span>
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
            <li className="mb-7 hover:underline">{t("footer.gallery")}</li>
            <li className="mb-7 hover:underline">{t("footer.schedule")}</li>
            <li className="mb-7 hover:underline">{t("footer.top50")}</li>
            <li className="mb-7 hover:underline">{t("footer.tickets")}</li>
          </ul>
        </div>
        <div className="md:w-1/6">
          <h4 className="text-pink-600 mb-7">{t("footer.legal")}</h4>
          <ul>
            <li className="mb-7 hover:underline">{t("footer.partners")}</li>
            <li className="mb-7 hover:underline">{t("footer.faq")}</li>
            <li className="mb-7 hover:underline">{t("footer.contact")}</li>
            <li className="mb-7 hover:underline">
              {t("footer.legal_notices")}
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
              placeholder="Email"
            ></input>
            <input
              type="button"
              value="Ok"
              className="bg-white rounded-md h-14 w-14 p-2 ml-2 font-bold hover:bg-gray-200"
            ></input>
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
