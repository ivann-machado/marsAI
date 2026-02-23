import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AIList from "../../components/AIList/AIList";
import Loading from "../../components/Utils/Loading";
import "flag-icons/css/flag-icons.min.css";
import { useState, useEffect } from "react";
import AdminVideoPanel from "../../components/AdminVideosDash/AdminVideoPanel";

function AdminVideo() {
  const { t } = useTranslation();
  let params = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/videos/" + params.id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setVideo(res);

        // TODO REVIEW
        /*  response = await fetch(
          import.meta.env.VITE_API_URL + "/api/review/" + params.videoId,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        res = await response.json();
        setReview(res); */
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!video) return <Loading />;
  else
    return (
      <>
        <section
          className="w-full min-h-screen bg-[url('../src/assets/background.jpg')] bg-cover bg-fixed text-white py-8
      md:px-[10%]"
        >
          <div className="m-4 mb-8">
            <a className="text-white hover:text-blue-900 visited:text-white">
              {t("video_page.return_gallery")}
            </a>
          </div>
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx"
            title="YouTube video player"
            loading="lazy"
          ></iframe>

          {/* ADMIN PANEL TO VOTE */}
          <AdminVideoPanel video_data={video} />

          {/* INFOS VIDEOS */}
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
              {/* <span
                className={`fi fi-2x fi-${video.country_iso.toLowerCase()} scale-200`}
              ></span> */}
              <div className="ml-4">
                <p className="text-white">
                  {t("video_page.country_of_origin")}
                </p>
                {/*  <p className="">{video.country_name}</p> */}
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
            <div>
              <AIList type="Scénario" data={video.scenario_ai} />
              <AIList type="Video" data={video.video_gen_ai} />
              <AIList type="Son" data={video.sound_ai} />
              <AIList type="Postprod" data={video.postprod_ai} />
            </div>
          </div>
        </section>
      </>
    );
}

export default AdminVideo;
