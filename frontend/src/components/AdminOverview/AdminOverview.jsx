import Loading from "../Utils/Loading";
import { useState, useEffect } from "react";
import { useauth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import { useFlash } from "../../context/FlashContext";

function AdminOverview() {
  const [data, setData] = useState(null);
  const [content, setContent] = useState(null);
  let address = window.location.host.split(".").slice(1);
  const authToken = useauth();
  const settings = useSettings();
  const { showFlash } = useFlash();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setData(json.mockedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    /*   console.log(data);
    setData((prev) => ({ ...prev, phase: settings.phase })); */
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/content",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setContent(
          json.reduce((a, i) => {
            a[i.name] = i.value;
            return a;
          }, {}),
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const changePhase = async () => {
    if (content.phase < 3) {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/content/",
          {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + authToken.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "phase",
              value: String(Number(content.phase) + 1),
            }),
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        // const json = await response.json();
        setContent((prev) => ({
          ...prev,
          phase: Number(prev.phase) + 1,
        }));

        showFlash("success", "La phase a été changée");
      } catch (err) {
        showFlash("error", "Erreur de mise à jour de la phase");
        console.error(err);
      }

      // setModified(false);
    }
  };

  if (!data || !content) return <Loading />;

  return (
    <>
      <div className="bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 px-4 font-inter w-4/5 text-white">
        <h1 className="font-bold text-2xl m-4">Vue d'ensemble</h1>
        <p className="m-4 text-lg border-b">
          Informations generales sur le festival et le site web.
        </p>
        <div className="">
          <div className="flex justify-around border-b py-8">
            <div className="p-4 bg-gray-800 border rounded-xl min-w-48 w-1/5 min-h-48">
              <p>Statistiques Videos:</p>
              <p>Total: {data.videos_total}</p>
              <p>Evaluées: {data.videos_evaluated}</p>
              <p>
                {(data.videos_evaluated / data.videos_total).toPrecision(2) *
                  100}
                %
              </p>
            </div>
            <div className="p-4 bg-gray-800 border rounded-xl min-w-48 w-1/5 min-h-48">
              <p>Evenements:</p>
              <p>Places: {data.total_event_places}</p>
              <p>Inscrits: {data.event_signups}</p>
              <p>
                {(data.event_signups / data.total_event_places).toPrecision(2) *
                  100}
                %
              </p>
            </div>
            <div className="p-4 bg-gray-800 border rounded-xl min-w-48 w-1/5 min-h-48">
              <p>Pays:</p>
              <p>{data.countries}</p>
            </div>
            <div className="p-4 bg-gray-800 border rounded-xl min-w-48 w-1/5 min-h-48">
              <p>Phase:</p>
              <p>{content.phase}</p>
              {content.phase < 3 ? (
                <button
                  className="p-2 border bg-gray-400 hover:bg-amber-400"
                  onClick={() => {
                    if (window.confirm("Passer à la phase suivante?"))
                      changePhase();
                  }}
                >
                  Passer à la phase suivante
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold m-4">Top Films:</h4>
            {data.top_videos.map((video) => (
              <a
                key={video.id}
                href={"http://" + address + "/video/" + video.title}
              >
                <div className="border rounded-lg flex gap-4 min-w-20 mb-4 mx-2 items-center">
                  <img
                    src={video.cover_image}
                    className="rounded-full w-10 h-16 "
                  ></img>
                  <p className="font-bold">{video.title}</p>
                  <p className="text-amber-200">{video.producer}</p>
                  <p className="text-red-300">{video.grade}/5</p>
                </div>
              </a>
            ))}
          </div>
          <a href="/videos">Acceder à la liste des films</a>
        </div>
      </div>
    </>
  );
}

export default AdminOverview;
