function AdminOverview() {
  let address = window.location.host.split(".").slice(1);
  let mockedData = {
    videos_total: 456,
    videos_evaluated: 300,
    countries: 56,
    total_event_places: 500,
    event_signups: 45,
    top_videos: [
      {
        id: 1,
        title: "Fara",
        grade: 4.8,
        cover_image: "/vite.svg",
        producer: "J. Li",
      },
      {
        id: 2,
        title: "Zorb",
        grade: 4.7,
        cover_image: "/vite.svg",
        producer: "P. Samson",
      },
      {
        id: 3,
        title: "Demain",
        grade: 4.5,
        cover_image: "/vite.svg",
        producer: "Pierre Claude",
      },
    ],
  };

  return (
    <>
      <div className="text-gray-200 bg-gray-950 w-4/5">
        <h1 className="font-bold text-xl m-4">Vue d'ensemble</h1>
        <p className="m-4">
          Informations generales sur le festival et le site web.
        </p>
        <div className="">
          <div className="flex justify-around">
            <div className="p-4 bg-gray-800 border rounded-xl w-48 h-48">
              <p>Statistiques Videos:</p>
              <p>Total: {mockedData.videos_total}</p>
              <p>Evaluées: {mockedData.videos_evaluated}</p>
              <p>
                {(
                  mockedData.videos_evaluated / mockedData.videos_total
                ).toPrecision(2) * 100}
                %
              </p>
            </div>
            <div className="p-4 bg-gray-800 border rounded-xl w-48 h-48">
              <p>Evenements:</p>
              <p>Places: {mockedData.total_event_places}</p>
              <p>Inscrits: {mockedData.event_signups}</p>
              <p>
                {(
                  mockedData.event_signups / mockedData.total_event_places
                ).toPrecision(2) * 100}
                %
              </p>
            </div>
            <div className="p-4 bg-gray-800 border rounded-xl w-48 h-48">
              <p>Pays:</p>
              <p>{mockedData.countries}</p>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold m-4">Top Films:</h4>
            {mockedData.top_videos.map((video) => (
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
        </div>
      </div>
    </>
  );
}

export default AdminOverview;
