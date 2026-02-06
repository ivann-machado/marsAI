import { useState, useEffect } from "react";

function AdminOverview() {
  const [data, setData] = useState(null);
  let address = window.location.host.split(".").slice(1);

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
  }, []);

  function changePhase() {
    if (data.phase < 3) {
      setData((prev) => ({ ...prev, phase: prev.phase + 1 }));
      //fetch pour modifier phase en DB}
    }
  }

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <div className="text-gray-200 bg-gray-950 w-4/5">
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
              <p>{data.phase}</p>
              {data.phase < 3 ? (
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
