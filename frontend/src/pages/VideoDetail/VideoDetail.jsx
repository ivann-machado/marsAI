import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AIList from "../../components/AIList/AIList";
import "flag-icons/css/flag-icons.min.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import Loading from "../../components/Utils/Loading";
import {
  countryListFr,
  countryListEn,
} from "../../components/Utils/CountryList.jsx";

function VideoDetail() {
  const { t, i18n } = useTranslation();
  const [video, setVideo] = useState(null);
  let params = useParams();

  let country_list = [];
  if (i18n.language === "fr") country_list = countryListFr;
  else country_list = countryListEn;

  //console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/videos/" + params.videoId,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setVideo(res);
        setVideo((prev) => ({
          ...prev,
          url: prev.url.replace("watch?v=", "embed/"),
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!video) return <Loading />;

  console.log(video);

  return (
    <>
      <Header />
      <section
        className="w-full min-h-screen bg-[#050508] text-white py-18
      md:px-[10%]"
      >
        <div className="m-4 mb-8">
          <a
            href="/gallery"
            className="text-white hover:text-blue-900 visited:text-white"
          >
            {t("video_page.return_gallery")}
          </a>
        </div>
        <iframe
          className="w-full aspect-video"
          src={"https://www.youtube.com/embed/" + video.url}
          title="YouTube video player"
        ></iframe>
        <h2 className="text-white font-bold text-4xl text-center mb-4 mt-4 md:mx-8">
          {video.title}
        </h2>
        <div className="md:flex md:items-center md:space-between">
          <div className="flex md:mx-16">
            <img
              className="w-32 h-32 object-cover rounded-full m-4"
              src={video.producer_image}
            ></img>
            <div className="my-auto">
              <p className="text-2xl text-white ml-2">
                {t("video_page.producer")}
              </p>
              <p className="text-xl text-gray-100 ml-2">{video.producer}</p>
            </div>
          </div>
          <div className="flex mb-4 ml-8">
            <span
              className={`fi fi-2x fi-${country_list[video.country_id - 1].iso.toLowerCase()} scale-200`}
            ></span>
            <div className="ml-4">
              <p className="text-white">{t("video_page.country_of_origin")}</p>
              <p className="">{country_list[video.country_id - 1].label}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="text-3xl font-bold m-4">
            {t("video_page.media_links")}
          </h4>
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
            {t("video_page.synopsis")}
          </h3>
          <p className="m-4 indent-4">{video.description}</p>
          <h4 className="m-4 text-2xl">{t("video_page.ai_used")}</h4>
          <div className="flex flew-wrap justify-around">
            <AIList type="Scénario" data={video.scenario_ai} />
            <AIList type="Video" data={video.video_gen_ai} />
            <AIList type="Son" data={video.sound_ai} />
            <AIList type="Postprod" data={video.postprod_ai} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default VideoDetail;
