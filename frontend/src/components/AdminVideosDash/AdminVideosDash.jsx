import { useState, useEffect } from "react";
import VideoList from "./VideoList.jsx";
import Loading from "../Utils/Loading.jsx";
import { useauth } from "../../context/AuthContext";

function AdminVideosDash() {
  const [videoQueue, setVideoQueue] = useState(null);
  const [otherVideo, setOtherVideo] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    producer: "",
    status: "",
    selected: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(null);
  const authToken = useauth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* Recuperation des vidéos assignées à l'admin (via reviews) */
        let response = await fetch(
          import.meta.env.VITE_API_URL + "/api/reviews/assigned",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken.token,
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch assigned videos");
        let res = await response.json();
        setVideoQueue(res.data ?? res);

        /* Recuperation de toutes les videos non assignées à cet admin*/
        response = await fetch(import.meta.env.VITE_API_URL + "/api/reviews/rest", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
        });
        if (!response.ok) throw new Error("Erreur fetch rest videos");
        res = await response.json();
        setOtherVideo(res.data ?? res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const updateAppliedFilters = () => {
    console.log("updates");
    setAppliedFilters(filters);
  };

  if (!videoQueue || !otherVideo) return <Loading />;

  return (
    <div className="w-4/5 bg-gray-950 px-4 font-inter">
      <h1 className="py-2 font-bold text-3xl text-white text-center">
        Gestion des films
      </h1>

      {/* MOVIE QUEUE */}
      <h2 className="text-2xl font-bold ml-8 text-white">Films attribuées:</h2>
      <VideoList videoList={videoQueue} type="queue" />

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
      <VideoList videoList={otherVideo} filters={appliedFilters} />
    </div>
  );
}

export default AdminVideosDash;
