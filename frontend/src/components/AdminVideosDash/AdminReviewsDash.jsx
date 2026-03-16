import { useState, useEffect } from "react";
import VideoList from "./VideoList.jsx";
import Loading from "../Utils/Loading.jsx";
import Pagination from "../Utils/Pagination.jsx";
s;
import { useauth } from "../../context/AuthContext.jsx";

function AdminReviewsDash() {
  // VIDEOS
  const [videos, setVideos] = useState(null);
  const [videosPage, setVideosPage] = useState(1);
  const [videosPages, setVideosPages] = useState(1);

  // MISC
  const authToken = useauth();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      const pageQuery = "?page=" + videosPage;
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/reviews/rest/" + pageQuery,
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

  if (!videos) return <Loading />;

  return (
    <div className="w-4/5 bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 px-4 font-inter">
      <h1 className="py-2 font-bold text-3xl text-white text-center">
        Liste des films pas encore notées
      </h1>
      {/* LISTE REVIEWS */}
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

export default AdminReviewsDash;
