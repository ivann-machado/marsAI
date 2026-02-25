import { useState, useEffect } from "react";
import { useFlash } from "../../context/FlashContext";
import Loading from "../Utils/Loading";
import { useauth } from "../../context/AuthContext";

function AdminVideoPanel({ video_data }) {
  const [review, setReview] = useState(null);
  const [video, setVideo] = useState(video_data);
  const { showFlash } = useFlash();
  const { id } = useauth();

  const handleGrade = (value) => {
    setReview((prev) => ({ ...prev, grade: value }));
  };

  const createReview = async () => {
    console.log("CREATE REVIEW");
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
        console.log("ICI");
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
        console.log(response);
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        console.log(json);
        if (!json) createReview();
        else setReview(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!review) return <Loading />;

  console.log("REview" + review);

  return (
    <div className="bg-gray-600 min-h-20 items-center p-4 rounded-b-xl">
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
    </div>
  );
}

export default AdminVideoPanel;
