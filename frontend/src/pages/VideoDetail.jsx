import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AIList from "../components/AIList/AIList";
import "flag-icons/css/flag-icons.min.css";
//import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

function VideoDetail(props) {
  const { t } = useTranslation();
  let params = useParams();

  let mockedVideo = {
    src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
    title: "Test Video",
    producer: "John Doe",
    producer_image: "../src/assets/producer_image.png",
    description:
      "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
    cover_image: "",
    country_name: "France",
    country_iso: "FR",
    linkedin_link: "",
    youtube_link: "",
    scenario_ai: "ChatGPT, Claude",
    video_gen_ai: "Sona",
    sound_ai: "",
    postprod_ai: "",
  };

  return (
    <>
      <section className="w-full min-h-screen bg-[url('../src/assets/background.jpg')] bg-cover bg-fixed text-white py-8">
        <div className="m-4 mb-8">
          <a className="text-white hover:text-blue-900 visited:text-white">
            {t("return_gallery")}
          </a>
        </div>
        <iframe
          className="w-screen aspect-video"
          src="https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx"
          title="YouTube video player"
        ></iframe>
        <h2 className="text-white font-bold text-4xl text-center mb-4 mt-4 md:mx-8">
          {mockedVideo.title}
        </h2>
        <div className="md:flex md:items-center md:space-between">
          <div className="flex md:mx-16">
            <img
              className="w-32 h-32 object-cover rounded-full m-4"
              src={mockedVideo.producer_image}
            ></img>
            <div className="my-auto">
              <p className="text-2xl text-white ml-2">{t("producer")}</p>
              <p className="text-xl text-gray-100 ml-2">
                {mockedVideo.producer}
              </p>
            </div>
          </div>
          <div className="flex mb-4 ml-8">
            <span
              className={`fi fi-2x fi-${mockedVideo.country_iso.toLowerCase()} scale-200`}
            ></span>
            <div className="ml-4">
              <p className="text-white">{t("country_of_origin")}</p>
              <p className="">{mockedVideo.country_name}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-3xl font-bold m-4">{t("media_links")}</h4>
          <div className="flex flex-wrap justify-around w-100%">
            <div className="w-1/3 md:w-1/6">
              <img
                src="../src/assets/fb.svg"
                className="w-12 h-12 mx-auto"
              ></img>
              <p className="text-center">Facebook</p>
            </div>
            <div className="w-1/3 md:w-1/6">
              <img
                src="../src/assets/linkedin.svg"
                className="w-12 h-12 mx-auto"
              ></img>
              <p className="text-center">Linkedin</p>
            </div>
            <div className="w-1/3 md:w-1/6">
              <img
                src="../src/assets/insta.svg"
                className="w-12 h-12 mx-auto"
              ></img>
              <p className="text-center">Instagram</p>
            </div>
            <div className="w-1/3 md:w-1/6">
              <img
                src="../src/assets/youtube.svg"
                className="w-12 h-12 mx-auto"
              ></img>
              <p className="text-center">Youtube</p>
            </div>
            <div className="w-1/3 md:w-1/6">
              <img
                src="../src/assets/twitter.svg"
                className="w-12 h-12 mx-auto"
              ></img>
              <p className="text-center">Twitter/X</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-3xl mb-4 text-center font-bold">
            {t("synopsis")}
          </h3>
          <p className="m-4 indent-4">{mockedVideo.description}</p>
          <h4 className="m-4 text-2xl">{t("ai_used")}</h4>
          <div>
            <AIList type="Scénario" data={mockedVideo.scenario_ai} />
            <AIList type="Video" data={mockedVideo.video_gen_ai} />
            <AIList type="Son" data={mockedVideo.sound_ai} />
            <AIList type="Postprod" data={mockedVideo.postprod_ai} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default VideoDetail;
