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

  // console.log(video);

  return (
    <>
      <Header />
      <section
        className="w-full min-h-screen bg-[#050508] text-white py-18
      md:px-[10%] font-inter"
      >
        {/* BG EFFECT */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%)`,
            backgroundSize: "cover",
          }}
        />

        {/* RETURN BUTTON */}
        <div className="m-4 mb-8">
          <a
            href="/gallery"
            className="text-white hover:text-blue-900 visited:text-white drop-shadow-xl/60 drop-shadow-purple-600"
          >
            {t("video_page.return_gallery")}
          </a>
        </div>

        {/* TITLE */}
        <h2 className="text-white font-extrabold text-4xl text-center mb-4 mt-4 md:mx-8 font-orbitron drop-shadow-xl/60 drop-shadow-purple-600">
          {video.title}
        </h2>

        {/* VIDEO FRAME */}
        <iframe
          className="w-full aspect-video rounded-xl "
          src={"https://www.youtube.com/embed/" + video.url}
          title="YouTube video player"
        ></iframe>

        {/* PRODUCER + COUNTRY */}
        <div className="md:flex md:items-center md:flex-between">
          <div className="flex md:mx-16">
            <img
              className="w-32 h-32 object-cover rounded-full m-4 drop-shadow-xl/60 drop-shadow-amber-600"
              src={video.producer_image}
            ></img>
            <div className="my-auto">
              <p className="text-2xl text-white ml-2 font-orbitron drop-shadow-xl/60 drop-shadow-purple-600 font-bold">
                {t("video_page.producer")}
              </p>
              <p className="text-xl text-gray-100 ml-2 drop-shadow-xl/60 drop-shadow-amber-600">
                {video.producer}
              </p>
            </div>
          </div>
          <div className="flex mb-4 ml-8 md:justify-between">
            <div className="mr-20">
              <p className="text-white drop-shadow-xl/60 drop-shadow-purple-600 font-bold font-orbitron">
                {t("video_page.country_of_origin")}
              </p>
              <p className="drop-shadow-xl/60 drop-shadow-amber-600">
                {country_list[video.country_id - 1].label}
              </p>
            </div>
            <span
              className={`fi fi-2x fi-${country_list[video.country_id - 1].iso.toLowerCase()} scale-400 drop-shadow-xl/40 drop-shadow-purple-600`}
            ></span>
          </div>
        </div>

        {/* SYNOPSIS */}
        <div className="mb-4">
          <h3 className="text-3xl mb-4 text-center font-bold font-orbitron drop-shadow-xl/60 drop-shadow-purple-600">
            {t("video_page.synopsis")}
          </h3>
          <p className="m-4 indent-4 text-center">{video.description}</p>
        </div>

        {/* TOOLS USED */}
        <div className="mb-4">
          <h4 className="m-4 text-2xl drop-shadow-xl/60 drop-shadow-purple-600 font-bold font-orbitron text-center">
            {t("video_page.ai_used")}
          </h4>
          <div className="flex flew-wrap justify-around">
            {video.scenario_ai ? (
              <AIList type="Scénario" data={video.scenario_ai} />
            ) : null}
            {video.video_gen_ai ? (
              <AIList type="Video" data={video.video_gen_ai} />
            ) : null}
            {video.sound_ai ? (
              <AIList type="Son" data={video.sound_ai} />
            ) : null}
            {video.postprod_ai ? (
              <AIList type="Postprod" data={video.postprod_ai} />
            ) : null}
          </div>
        </div>

        {/* MEDIA SECTION */}
        {video.facebook_link ||
        video.linkedin_link ||
        video.instagram_link ||
        video.youtube_link ||
        video.twitter_link ? (
          <div className="mb-4">
            <h4 className="text-3xl font-bold m-4 drop-shadow-xl/60 drop-shadow-purple-600 font-orbitron text-center">
              {t("video_page.media_links")}
            </h4>
            <div className="flex flex-wrap justify-around w-100%">
              {/* FB */}
              {video.facebook_link ? (
                <div className="w-1/3 md:w-1/6">
                  <a href={video.facebook_link ?? "http://facebook.com"}>
                    <img
                      src="../src/assets/fb.svg"
                      className="w-12 h-12 mx-auto"
                    ></img>
                    <p className="text-center">Facebook</p>
                  </a>
                </div>
              ) : null}

              {/* LINKEDIN */}
              {video.linkedin_link ? (
                <div className="w-1/3 md:w-1/6 drop-shadow-xl/60 drop-shadow-amber-600 hover:scale-110 hover:underline transition">
                  <a href={video.linkedin_link ?? "http://linkedin.com"}>
                    <img
                      src="../src/assets/linkedin.svg"
                      className="w-12 h-12 mx-auto"
                    ></img>
                    <p className="text-center">Linkedin</p>
                  </a>
                </div>
              ) : null}

              {/* INSTA */}
              {video.instagram_link ? (
                <div className="w-1/3 md:w-1/6 drop-shadow-xl/60 drop-shadow-amber-600 hover:scale-110 hover:underline transition">
                  <a href={video.instagram_link ?? "http://instagram.com"}>
                    <img
                      src="../src/assets/insta.svg"
                      className="w-12 h-12 mx-auto"
                    ></img>
                    <p className="text-center">Instagram</p>
                  </a>
                </div>
              ) : null}

              {/* YT */}
              {video.youtube_link ? (
                <div className="w-1/3 md:w-1/6 drop-shadow-xl/60 drop-shadow-amber-600 hover:scale-110 hover:underline transition">
                  <a href={video.youtube_link ?? "http://youtube.com"}>
                    <img
                      src="../src/assets/youtube.svg"
                      className="w-12 h-12 mx-auto"
                    ></img>
                    <p className="text-center">Youtube</p>
                  </a>
                </div>
              ) : null}

              {/* TWITTER */}
              {video.twitter_link ? (
                <div className="w-1/3 md:w-1/6 drop-shadow-xl/60 drop-shadow-amber-600 hover:scale-110 hover:underline transition">
                  <a href={video.twitter_link ?? "http://x.com"}>
                    <img
                      src="../src/assets/twitter.svg"
                      className="w-12 h-12 mx-auto"
                    ></img>
                    <p className="text-center">Twitter/X</p>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
      <Footer />
    </>
  );
}

export default VideoDetail;
