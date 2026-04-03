import { useState, useEffect } from "react";
import VideoList from "./VideoList.jsx";
import Loading from "../Utils/Loading.jsx";
import Pagination from "../Utils/Pagination.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function AdminReviewsDash() {
  // VIDEOS
  const [videos, setVideos] = useState(null);
  const [videosPage, setVideosPage] = useState(1);
  const [videosPages, setVideosPages] = useState(1);

  // MISC
  const authToken = useAuth();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      const pageQuery = "?page=" + videosPage;
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/reviews/remaining/" + pageQuery,
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

  if (!videos) return <Loading dashboard={true} />;

  return (
    <div className="w-full bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 px-4 font-inter ml-64">
      <h1 className="py-2 font-bold text-3xl text-white text-center">
        Liste des films pas encore notées
      </h1>
      {/* LISTE REVIEWS */}
      <VideoList
        videoList={videos}
        page={videosPage}
        items_per_page={ITEMS_PER_PAGE}
        type="queue"
      />
      <Pagination
        currentPage={videosPage}
        totalPages={videosPages}
        setPage={setVideosPage}
      />
    </div>
  );
}

export default AdminReviewsDash;
