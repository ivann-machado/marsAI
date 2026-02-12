import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AIList from "../../components/AIList/AIList";
import "flag-icons/css/flag-icons.min.css";
import { useState, useEffect } from "react";

function AdminVideo(props) {
  const { t } = useTranslation();
  let params = useParams();

  const [review, setReview] = useState(null);
  const [video, setVideo] = useState(null);

  const handleGrade = (value) => {
    setReview((prev) => ({ ...prev, grade: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/reviews/" + review.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      const updatedReview = await response.json();
      setReview(updatedReview);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setReview(json.mockedReview);
        setVideo(json.mockedVideo);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!video || !review) return <p>Loading...</p>;
  else
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
            loading="lazy"
          ></iframe>

          {/* ADMIN PANEL TO VOTE */}
          <div className="bg-gray-400 min-h-20 items-center p-4">
            <h3>Menu notation:</h3>
            <div className="mx-8 flex gap-8 mb-4">
              <div>
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleGrade(value)}
                    className={
                      "w-4 h-4 rounded-full transition text-4xl mr-2 " +
                      (review.grade >= value
                        ? "text-amber-300"
                        : "text-amber-50")
                    }
                  >
                    ★
                  </button>
                ))}
                <p>Note: {review.grade}/5</p>
              </div>
              <input
                className="bg-white text-gray-700 p-2"
                placeholder="commentaire..."
                type="text"
                value={review.note}
                onChange={(e) =>
                  setReview((prev) => ({ ...prev, note: e.target.value }))
                }
              ></input>
              <input
                className="bg-white p-2 text-black hover:bg-gray-600"
                type="button"
                value="Sauvegarder"
                onClick={handleSave}
              ></input>
            </div>
          </div>

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
                <p className="text-2xl text-white ml-2">{t("producer")}</p>
                <p className="text-xl text-gray-100 ml-2">{video.producer}</p>
              </div>
            </div>
            <div className="flex mb-4 ml-8">
              <span
                className={`fi fi-2x fi-${video.country_iso.toLowerCase()} scale-200`}
              ></span>
              <div className="ml-4">
                <p className="text-white">{t("country_of_origin")}</p>
                <p className="">{video.country_name}</p>
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
            <p className="m-4 indent-4">{video.description}</p>
            <h4 className="m-4 text-2xl">{t("ai_used")}</h4>
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
