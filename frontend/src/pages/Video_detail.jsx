import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AIList from "../components/AIList/AIList";

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
    country_id: "France",
    linkedin_link: "",
    youtube_link: "",
    scenario_ai: "ChatGPT, Claude",
    video_gen_ai: "Sona",
    sound_ai: "",
    postprod_ai: "",
  };

  return (
    <>
      <section className="w-screen bg-[url('../src/assets/background.jpg')] bg-cover bg-fixed text-white">
        <div>
          <a>{t("return_gallery")}</a>
        </div>
        <iframe
          className="w-screen aspect-video"
          src="https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx"
          title="YouTube video player"
        ></iframe>
        <h2 className="text-white font-bold text-4xl text-center mb-4">
          {mockedVideo.title}
        </h2>
        <div className="flex">
          <img
            className="w-1/3 aspect-auto rounded-full"
            src={mockedVideo.producer_image}
          ></img>
          <div>
            <p className="text-2xl text-white ml-2">{t("producer")}</p>
            <p className="text-xl text-gray-100 ml-2">{mockedVideo.producer}</p>
          </div>
        </div>
        <div className="flex mb-4">
          <img src="/vite.svg"></img>
          <div>
            <p className="text-white">{t("country_of_origin")}</p>
            <p className="">{mockedVideo.country_id}</p>
          </div>
        </div>
        <div className="mb-4">
          <h4>{t("media_links")}</h4>
          <div className="flex flex-wrap justify-around w-100%">
            <div className="w-1/3">
              <img src="../src/assets/fb.svg"></img>
              <p>Facebook</p>
            </div>
            <div className="w-1/3">
              <img src="../src/assets/fb.svg"></img>
              <p>Linkedin</p>
            </div>
            <div className="w-1/3">
              <img src="../src/assets/insta.svg"></img>
              <p>Instagram</p>
            </div>
            <div className="w-1/3">
              <img src="../src/assets/youtube.svg"></img>
              <p>Youtube</p>
            </div>
            <div className="w-1/3">
              <img src="../src/assets/twitter.svg"></img>
              <p>Twitter/X</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-3xl mb-4 text-center">{t("synopsis")}</h3>
          <p className="m-4">{mockedVideo.description}</p>
          <h4>{t("ai_used")}</h4>
          <div>
            <AIList type="Scénario" data={mockedVideo.scenario_ai} />
            <AIList type="Video" data={mockedVideo.video_gen_ai} />
            <AIList type="Son" data={mockedVideo.sound_ai} />
            <AIList type="Postprod" data={mockedVideo.postprod_ai} />
          </div>
        </div>
      </section>
    </>
  );
}

export default VideoDetail;
