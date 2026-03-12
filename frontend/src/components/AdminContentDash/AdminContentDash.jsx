import AdminContentCard from "./AdminContentCard";
import { useState, useEffect } from "react";
import Loading from "../../components/Utils/Loading.jsx";
import Pagination from "../Utils/Pagination.jsx";

function AdminSettingsDash() {
  const [content, setContent] = useState(null);
  const [contentPage, setContentPage] = useState(1);
  const [contentPages, setContentPages] = useState(1);
  const ITEMS_PER_PAGE = 15;

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
        setContentPages(Math.floor((json.length - 1) / ITEMS_PER_PAGE) + 1);
        setContent(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [contentPage]);

  if (!content) return <Loading />;

  return (
    <div className="flex flex-col w-4/5  bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 relative">
      <div className="flex flex-col mx-2 mb-8">
        <h2 className="text-4xl font-extrabold m-8 text-white">
          Content Items
        </h2>
        <div className="grid grid-cols-4 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
          <p className="text-center text-xl font-bold">Content</p>
          <p className="text-center text-xl font-bold">Value</p>
        </div>
        {content
          .slice(
            (contentPage - 1) * ITEMS_PER_PAGE,
            contentPage * ITEMS_PER_PAGE,
          )
          .map((content_item) => (
            <AdminContentCard
              key={content_item.name}
              name={content_item.name}
              value={content_item.value}
            />
          ))}
      </div>
      <Pagination
        currentPage={contentPage}
        totalPages={contentPages}
        setPage={setContentPage}
      />
    </div>
  );
}

export default AdminSettingsDash;
