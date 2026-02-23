import { useState, useEffect } from "react";
import VideoList from "./VideoList.jsx";
import Loading from "../Utils/Loading.jsx";

function AdminVideosDash() {
  const [videoQueue, setVideoQueue] = useState(null);
  const [otherVideo, setOtherVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* Recuperation videos à review */
        let response = await fetch(
          import.meta.env.VITE_API_URL + "/api/videos",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setVideoQueue(res);

        /* Recuperation des autres videos */
        response = await fetch(import.meta.env.VITE_API_URL + "/api/videos", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Erreur fetch JSON");
        res = await response.json();
        setOtherVideo(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!videoQueue || !otherVideo) return <Loading />;

  return (
    <div className="w-4/5 bg-gray-950 px-4">
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
        ></input>
        <input
          type="text"
          placeholder="realisateur..."
          className="bg-gray-200 p-1 mr-1"
        ></input>
        <select>
          <option>Unverified</option>
          <option>Verified</option>
          <option>Selected</option>
          <option>Denied</option>
        </select>
        <select>
          <option>Selection</option>
          <option>Pas en selection</option>
        </select>
        <input
          type="button"
          value="Filtrer"
          className="ml-5 bg-gray-300 text-black p-1"
        ></input>
      </div>

      {/* OTHER MOVIES */}
      <VideoList videoList={otherVideo} />
    </div>
  );
}

export default AdminVideosDash;
