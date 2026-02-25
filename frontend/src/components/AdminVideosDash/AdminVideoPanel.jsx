import { useState, useEffect } from "react";
import { useFlash } from "../../context/FlashContext";
import Loading from "../Utils/Loading";
import { useauth } from "../../context/AuthContext";

function AdminVideoPanel({ video_data }) {
  const [review, setReview] = useState(null);
  const [video, setVideo] = useState(video_data);
  const { showFlash } = useFlash();
  const { id, authToken } = useauth();

  const handleGrade = (value) => {
    setReview((prev) => ({ ...prev, grade: value }));
  };

  const createReview = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/reviews/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ admin_id: id, video_id: video_data.id }),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la création review");
      const newReview = await response.json();
      setReview(newReview);
      showFlash("success", "Review enregistrée.");
    } catch (err) {
      showFlash("error", "Erreur lors de l'enregistrement du review");
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/reviews/" + review.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      const updatedReview = await response.json();
      setReview(updatedReview);
      showFlash("success", "Review enregistrée.");
    } catch (err) {
      showFlash("error", "Erreur lors de l'enregistrement du review");
      console.error(err);
    }
  };

  const handleStatus = async (new_status) => {
    setVideo((prev) => ({ ...prev, status: new_status }));
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/videos/" + video.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
          },
          body: JSON.stringify({ status: new_status }),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
      showFlash("success", "Status mis à jour");
    } catch (err) {
      showFlash("error", "Erreur lors de l'enregistrement de la video");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("/data.json"); // il faut recuperer le vrai review

        const response = await fetch(
          import.meta.env.VITE_API_URL +
            "/api/reviews?admin_id=" +
            id +
            "&video_id=" +
            video_data.id,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();

        if (!json) createReview();
        else setReview(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!review) return <Loading />;

  return (
    /* <div className="bg-gray-600 min-h-20 items-center p-4 rounded-b-xl">
      <h3 className="text-lg font-bold">Menu notation:</h3>
      <div className="mx-8 flex gap-8 mb-4 justify-around">
        <div>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleGrade(value)}
              className={
                "aspect-square w-8 transition text-4xl mr-2 border-b-2 border-transparent hover:border-amber-300 " +
                (review.grade >= value ? "text-amber-300" : "text-amber-50")
              }
            >
              ★
            </button>
          ))}
          <p>Note: {review.grade}/5</p>
        </div>
        <div>
          <input
            className="bg-white text-gray-700 p-2 rounded-l-xl border-r min-h-20"
            placeholder="commentaire..."
            type="text"
            value={review.note}
            onChange={(e) =>
              setReview((prev) => ({ ...prev, note: e.target.value }))
            }
          ></input>

          <input
            className="bg-white p-2 text-black hover:bg-green-300 rounded-r-xl min-h-20"
            type="button"
            value="Sauvegarder"
            onClick={handleSave}
          ></input>
        </div>
      </div>
      <select
        value={video.status}
        className={
          (video.status === "verified"
            ? "bg-green-700 text-white"
            : video.status === "denied"
              ? "bg-red-700 text-white"
              : "bg-amber-300 text-black ") + " p-2 rounded-md"
        }
        onChange={(e) => handleStatus(e.target.value)}
      >
        <option value="unverified">
          Il faut verifier si la video correspond aux critères de participation
        </option>
        <option value="verified">
          Le video correspond à tous les critères de participation
        </option>
        <option value="denied">
          Le video ne correspond pas à tous les critères de participation
        </option>
      </select>
    </div> */
    <div className="bg-gray-700 rounded-b-xl p-6 shadow-md flex flex-col gap-6">
      <h3 className="text-xl font-semibold">Menu notation:</h3>

      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
        {/* Rating */}
        <div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleGrade(value)}
                aria-label={`${value} star`}
                className={`text-3xl transition-transform duration-200 ${
                  review.grade >= value ? "text-amber-400" : "text-amber-100"
                } hover:text-amber-500 hover:scale-110`}
              >
                ★
              </button>
            ))}
            <span className="ml-4 text-white font-medium">
              Note: {review.grade}/5
            </span>
          </div>
        </div>

        {/* Comment input */}
        <div className="flex w-full max-w-md">
          <input
            type="text"
            placeholder="Commentaire..."
            value={review.note}
            onChange={(e) =>
              setReview((prev) => ({ ...prev, note: e.target.value }))
            }
            className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button
            onClick={handleSave}
            className="bg-amber-400 text-black p-3 rounded-r-lg font-medium hover:bg-amber-500 transition"
          >
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Status select */}
      <select
        value={video.status}
        onChange={(e) => handleStatus(e.target.value)}
        className={`p-3 rounded-md w-full max-w-lg font-medium shadow focus:outline-none focus:ring-2 ${
          video.status === "verified"
            ? "bg-green-700 text-white"
            : video.status === "denied"
              ? "bg-red-700 text-white"
              : "bg-amber-300 text-black"
        }`}
      >
        <option value="unverified">À vérifier</option>
        <option value="verified">Correspond à tous les critères</option>
        <option value="denied">Ne correspond pas aux critères</option>
      </select>
    </div>
  );
}

export default AdminVideoPanel;
