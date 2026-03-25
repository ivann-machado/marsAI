import { useState, useEffect } from "react";
import VideoList from "./VideoList.jsx";
import Loading from "../Utils/Loading.jsx";
import Pagination from "../Utils/Pagination.jsx";
import { useauth } from "../../context/AuthContext";

function AdminVideosDash() {
  // VIDEOS
  const [videos, setVideos] = useState(null);
  const [videosPage, setVideosPage] = useState(1);
  const [videosPages, setVideosPages] = useState(1);

  // FILTRES
  const [filters, setFilters] = useState({
    title: "",
    producer: "",
    status: "",
    selected: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(null);

  // MISC
  const authToken = useauth();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      const pageQuery = "?page=" + videosPage;
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/videos/" + pageQuery,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken.token,
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch rest videos");
        const res = await response.json();
        setVideosPages(res.meta.totalPages);
        setVideos(res.data ?? res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [videosPage]);

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateAppliedFilters = () => {
    //console.log("updates");
    // TODO make filters fetch data agains
    setAppliedFilters(filters);
  };

  if (!videos) return <Loading />;

  return (
    <div className="w-full bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 px-4 font-inter ml-64">
      <h1 className="py-2 font-bold text-3xl text-white text-center">
        Gestion des films
      </h1>

      {/* MOVIE QUEUE */}
      {/* <h2 className="text-2xl font-bold ml-8 text-white">Films attribuées:</h2>
      <VideoList
        videoList={videoQueue}
        type="queue"
        page={videoQueuePage}
        items_per_page={ITEMS_PER_PAGE}
      />
      <Pagination
        currentPage={videoQueuePage}
        totalPages={videoQueuePages}
        setPage={setVideoQueuePage}
      /> */}

      {/* SEARCH BAR */}
      <div className="w-full bg-gray-500 grid grid-cols-6">
        <input
          type="text"
          placeholder="titre..."
          className="bg-gray-200 p-1 col-span-2 mr-1"
          value={filters.title}
          onChange={(e) => updateFilters("title", e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="realisateur..."
          className="bg-gray-200 p-1 mr-1"
          value={filters.producer}
          onChange={(e) => updateFilters("producer", e.target.value)}
        ></input>
        <select
          value={filters.state}
          onChange={(e) => updateFilters("status", e.target.value)}
        >
          <option value="">-- STATUS --</option>
          <option value="unverified">Unverified</option>
          <option value="verified">Verified</option>
          <option value="selected">Selected</option>
          <option value="denied">Denied</option>
        </select>
        <select
          value={filters.selecetd}
          onChange={(e) => updateFilters("selected", e.target.value)}
        >
          <option value="">-- STATUS SELECTION--</option>
          <option value="selected">Selection</option>
          <option value="">Pas en selection</option>
        </select>
        <input
          type="button"
          value="Filtrer"
          className="ml-5 bg-gray-300 text-black p-1 hover:ring-2 hover:ring-purple-600 hover:bg-gray-200 cursor-pointer"
          onClick={() => updateAppliedFilters()}
        ></input>
      </div>

      {/* OTHER MOVIES */}
      <VideoList
        videoList={videos}
        filters={appliedFilters}
        page={videosPage}
        items_per_page={ITEMS_PER_PAGE}
      />
      <Pagination
        currentPage={videosPage}
        totalPages={videosPages}
        setPage={setVideosPage}
      />
    </div>
  );
}

export default AdminVideosDash;
