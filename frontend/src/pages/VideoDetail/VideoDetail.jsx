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

  const icons = {
    facebook: "/src/assets/fb.svg",
    linkedin: "/src/assets/linkedin.svg",
    instagram: "/src/assets/insta.svg",
    youtube: "/src/assets/youtube.svg",
    twitter: "/src/assets/twitter.svg",
    tiktok: "/src/assets/tiktok.svg",
    other: "/src/assets/other.svg",
  };

  const labels = {
    facebook: "Facebook",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    youtube: "YouTube",
    twitter: "Twitter/X",
    tiktok: "TikTok",
    other: t("video_page.other_socials"),
  };

  const getTypeFromUrl = (url) => {
    if (url.includes("facebook")) return "facebook";
    if (url.includes("linkedin")) return "linkedin";
    if (url.includes("instagram")) return "instagram";
    if (url.includes("youtube")) return "youtube";
    if (url.includes("youtu.be")) return "youtube";
    if (url.includes("twitter") || url.includes("x.com")) return "twitter";
    if (url.includes("tiktok")) return "tiktok";
    if (url.startsWith("http")) return "other";
    return null;
  };

  return (
    <>
      <meta
        name="description"
        content="Le film vous intéresse ? Alors ses détails vous intéresseront sûrement encore plus !"
      />
      <Header />
      <section
        className="w-full min-h-screen bg-[#050508] text-white py-20
      md:px-[10%] font-inter relative"
      >
        {/* BG EFFECT */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.35) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.25) 0%, transparent 50%)`,
            backgroundSize: "cover",
          }}
        />

        {/* RETURN BUTTON */}
        <div className="m-4 mb-10">
          <a
            href="/gallery"
            className="text-gray-300 hover:text-white transition"
          >
            {t("video_page.return_gallery")}
          </a>
        </div>

        {/* TITLE */}
        <h2 className="text-white font-extrabold text-4xl md:text-5xl text-center mb-10 mt-4 md:mx-8 font-orbitron drop-shadow-xl/60 drop-shadow-purple-600">
          {video.title}
        </h2>

        {/* VIDEO FRAME */}
        <iframe
          className="w-full aspect-video rounded-2xl shadow-2xl border border-purple-500/20 mb-12"
          src={"https://www.youtube.com/embed/" + video.url}
          title="YouTube video player"
        ></iframe>

        {/* PRODUCER + COUNTRY */}
        <div className="md:flex md:items-center md:flex-between bg-[#0c0c14] rounded-xl border border-purple-500/20 shadow-lg p-4">
          <div className="flex md:mx-16">
            <img
              className="w-32 h-32 object-cover rounded-full m-4 shadow-lg"
              alt={t("video_page.producer_image_alt")}
              src={video.producer_image}
            ></img>

            <div className="my-auto">
              <p className="text-2xl text-white ml-2 font-orbitron drop-shadow-xl/60 drop-shadow-purple-600 font-bold">
                {t("video_page.producer")}
              </p>

              <p className="text-xl text-gray-300 ml-2">{video.producer}</p>
            </div>
          </div>

          <div className="flex mb-4 ml-8 md:justify-between">
            <div className="mr-20">
              <p className="text-white drop-shadow-xl/60 drop-shadow-purple-600 font-bold font-orbitron">
                {t("video_page.country_of_origin")}
              </p>

              <p className="text-gray-300">
                {country_list[video.country_id - 1].label}
              </p>
            </div>

            <span
              className={`fi fi-2x fi-${country_list[
                video.country_id - 1
              ].iso.toLowerCase()} scale-150 drop-shadow-xl/40 drop-shadow-purple-600`}
            ></span>
          </div>
        </div>

        {/* SYNOPSIS */}
        <div className="mb-8 mt-12">
          <h3 className="text-3xl mb-6 text-center font-bold font-orbitron drop-shadow-xl/60 drop-shadow-purple-600">
            {t("video_page.synopsis")}
          </h3>

          <p className="m-4 indent-4 text-center text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {video.description}
          </p>
        </div>

        {/* TOOLS USED */}
        <div className="mb-10">
          <h4 className="m-4 text-2xl drop-shadow-xl/60 drop-shadow-purple-600 font-bold font-orbitron text-center">
            {t("video_page.ai_used")}
          </h4>

          <div className="flex flex-wrap justify-around gap-6">
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

        {/* SOCIALS */}
        {Array.isArray(video.socials) && video.socials.length > 0 && (
          <div className="mb-10">
            <h4 className="text-3xl font-bold m-4 drop-shadow-xl/60 drop-shadow-purple-600 font-orbitron text-center">
              {t("video_page.media_links")}
            </h4>

            <div className="flex flex-wrap justify-center gap-8">
              {video.socials
                .filter(
                  (url) => typeof url === "string" && url.startsWith("http"),
                )
                .slice(0, 4)
                .map((url, index) => {
                  const type = getTypeFromUrl(url);

                  if (!type || !icons[type]) return null;

                  return (
                    <div
                      key={index}
                      className="w-20 md:w-24 group hover:scale-110 transition duration-300"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                      >
                        <div className="p-3 rounded-xl bg-gray-900 border border-purple-500/20 group-hover:border-pink-500/40 transition">
                          <img
                            src={icons[type]}
                            className="w-10 h-10"
                            alt={labels[type]}
                          />
                        </div>

                        <p className="text-gray-300 mt-2 text-sm group-hover:text-white transition text-center">
                          {labels[type]}
                        </p>
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default VideoDetail;
