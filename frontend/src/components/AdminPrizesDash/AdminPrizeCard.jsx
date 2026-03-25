import { useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function AdminPrizeCard({ prize_data }) {
  const [prize, setPrize] = useState(prize_data);
  const [confirm, setConfirm] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useauth();

  // console.log(prize);

  const deletePrize = () => {
    setConfirm(!confirm);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/prized-videos/" + prize.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      showFlash("success", "Prix supprimé avec succes.");
      setPrize(null);
    } catch (err) {
      showFlash("error", "Erreur lors de la suppression");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-5 p-2 bg-gray-900 text-gray-100 gap-2">
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.id}
      </div>
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.prix}
      </div>
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.title}
      </div>
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.producer}
      </div>
      <div>
        <div
          className={
            "bg-red-700 m-auto px-2 hover:bg-red-500 hover:cursor-pointer"
          }
        >
          {confirm ? (
            <button onClick={() => deletePrize()}>Annuler</button>
          ) : (
            <button onClick={() => deletePrize()}>Supprimer</button>
          )}
        </div>
        {confirm ? (
          <div
            className={
              "bg-green-700 m-auto px-2 hover:bg-green-500 hover:cursor-pointer "
            }
          >
            <button onClick={() => confirmDelete()}>
              Confirmer Suppression
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminPrizeCard;
