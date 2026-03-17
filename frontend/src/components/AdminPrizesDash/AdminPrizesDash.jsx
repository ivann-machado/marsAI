import { useState, useEffect } from "react";
import Loading from "../Utils/Loading.jsx";
import { useauth } from "../../context/AuthContext.jsx";
import Pagination from "../Utils/Pagination.jsx";
import AdminPrizeCard from "./AdminPrizeCard.jsx";

function AdminPrizesDash() {
  const [prizes, setPrizes] = useState(null);
  const [prizesPage, setPrizesPage] = useState(1);
  const [prizesPages, setPrizesPages] = useState(1);
  const authToken = useauth();
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/prizes/",
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
        //console.log(json);
        setPrizesPages(Math.floor((json.length - 1) / ITEMS_PER_PAGE) + 1);
        setPrizes(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [prizesPage]);

  if (!prizes) return <Loading />;

  return (
    <div className="flex flex-col w-full ml-64 min-h-screen bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 relative">
      <div className="flex flex-col mx-2 mb-8">
        <h2 className="text-4xl text-white font-extrabold m-8">Prizes</h2>
        <div className="grid grid-cols-5 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
          <p className="text-center text-xl font-bold">Prize</p>
          <p className="text-center text-xl font-bold">Video Id</p>
          <p className="text-center text-xl font-bold">Producer</p>
        </div>
        {prizes
          .slice((prizesPage - 1) * ITEMS_PER_PAGE, prizesPage * ITEMS_PER_PAGE)
          .map((prize) => (
            <AdminPrizeCard key={prize.id} prize={prize} />
          ))}
      </div>
      <Pagination
        currentPage={prizesPage}
        totalPages={prizesPages}
        setPage={setPrizesPage}
      />
    </div>
  );
}

export default AdminPrizesDash;
