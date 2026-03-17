import { useState, useEffect } from "react";
import Loading from "../Utils/Loading.jsx";
import { useauth } from "../../context/AuthContext.jsx";
import Pagination from "../Utils/Pagination.jsx";
import AdminPrizeCard from "./AdminPrizeCard.jsx";
import { useFlash } from "../../context/FlashContext.jsx";

function AdminPrizesDash() {
  const [prizes, setPrizes] = useState([]);
  const [prizesPage, setPrizesPage] = useState(1);
  const [prizesPages, setPrizesPages] = useState(1);
  const [newPrize, setNewPrize] = useState({
    video_id: -1,
    prix: "",
  });
  const [videos, setVideos] = useState(null);
  const authToken = useauth();
  const ITEMS_PER_PAGE = 10;
  const { showFlash } = useFlash();

  /*  console.log(prizes); */

  // RECUPERATION  PRIX
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/prized-videos/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken.token,
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        console.log(json.data);
        setPrizesPages(Math.floor((json.length - 1) / ITEMS_PER_PAGE) + 1);
        setPrizes(json.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [prizesPage]);

  // RECUPERATION VIDEOS POUR SELECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/videos/?limit=0",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken.token,
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        // console.log(json.data);
        setVideos(json.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    //console.log(e.target.name, e.target.value);
    setNewPrize((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addPrize = async () => {
    if (newPrize.prix === "" || newPrize.video_id === "") return;

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/prized-videos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({
            prix: newPrize.prix,
            video_id: Number(newPrize.video_id),
          }),
        },
      );
      if (!response.ok) {
        console.log(response.json());
        throw new Error("Erreur fetch JSON");
      }
      const res = await response.json();

      setPrizes((prev) => [
        ...prev,
        { ...newPrize, id: res.id /* , logo: res.logo */ },
      ]);
      setNewPrize({
        prix: "",
        video_id: -1,
      });

      // setSponsor(res);
      showFlash("success", "Création du prix avec succes");
    } catch (err) {
      console.error(err);
    }
  };

  if (!prizes || !videos) return <Loading />;

  return (
    <div className="flex flex-col w-full ml-64 min-h-screen bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 relative">
      <div className="flex flex-col mx-2 mb-8">
        <h2 className="text-4xl text-white font-extrabold m-8">Prizes</h2>
        <div className="grid grid-cols-4 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
          <p className="text-center text-xl font-bold">ID</p>
          <p className="text-center text-xl font-bold">Prize</p>
          <p className="text-center text-xl font-bold">Title</p>
          <p className="text-center text-xl font-bold">Producer</p>
        </div>
        {prizes
          //.slice((prizesPage - 1) * ITEMS_PER_PAGE, prizesPage * ITEMS_PER_PAGE)
          .map((prize) => (
            <AdminPrizeCard key={prize.id} prize_data={prize} />
          ))}
      </div>
      <Pagination
        currentPage={prizesPage}
        totalPages={prizesPages}
        setPage={setPrizesPage}
      />
      <form className="flex flex-col mx-auto bg-gray-800 text-white p-4">
        <p>Ajouter prix:</p>
        <label htmlFor="prix">Nom du prix</label>
        <input
          id="prix"
          value={newPrize.prix}
          name="prix"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="video_id">Vidéo</label>
        <select
          id="video_id"
          name="video_id"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        >
          <option value={-1}>Selectionnez un film pour decerner le prix</option>
          {videos.map((video) => (
            <option value={video.id} key={video.id}>
              {video.id}. {video.title} | Auteur
              {": "}
              {video.producer}
            </option>
          ))}
        </select>

        <input
          type="button"
          value="Ajouter"
          className="bg-white text-black mt-4"
          onClick={() => addPrize()}
        ></input>
      </form>
    </div>
  );
}

export default AdminPrizesDash;
