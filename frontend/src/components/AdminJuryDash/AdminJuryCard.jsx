import { useState } from "react";
import { useauth } from "../../context/AuthContext";
import { useFlash } from "../../context/FlashContext";

function AdminJuryCard({ id, edition_id, name, bio, photo, profession }) {
  const [jury, setJury] = useState({
    id,
    edition_id,
    name,
    bio,
    photo,
    profession,
  });
  const [modified, setModified] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useauth();

  //console.log(authToken.token);

  const updateJury = (key, value) => {
    setJury((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  const saveJury = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/jury/" + jury.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({
            edition_id: jury.edition_id,
            name: jury.name,
            photo: jury.photo,
            bio: jury.bio,
            profession: jury.profession,
          }),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const json = await response.json();
      showFlash("success", "Jury updated");
    } catch (err) {
      showFlash("error", "Jury update failed");
      console.error(err);
    }

    setModified(false);
  };

  const deleteJury = async (key) => {
    /* Suppresion dans la DB ici */
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/jury/" + jury.id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");

      setJury(null);
      setModified(false);
      showFlash("success", "Jury deleted");
    } catch (err) {
      console.error(err);
      showFlash("error", "Jury could not be deleted");
    }

    setModified(false);
  };

  if (!jury) return <></>;

  return (
    <div
      key={jury.id}
      className="grid grid-cols-7 p-2 bg-gray-900 text-gray-100 gap-2"
    >
      <input
        className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500"
        value={jury.edition_id}
        onChange={(e) => updateJury("edition_id", e.target.value)}
      ></input>
      <img src={jury.photo} className="col-span-1 p-2 max-w-10 max-h-10"></img>
      <input
        value={jury.name}
        className="col-span-1 p-2 bg-gray-700 text-center rounded-lg hover:bg-gray-500"
        onChange={(e) => updateJury("name", e.target.value)}
      ></input>
      <input
        value={jury.bio}
        className="col-span-1 p-2 max-h-15 overflow-scroll bg-gray-700 text-center rounded-lg hover:bg-gray-500"
        onChange={(e) => updateJury("bio", e.target.value)}
      ></input>
      <input
        value={jury.profession}
        className="col-span-1 p-2 bg-gray-700 text-center rounded-lg hover:bg-gray-500"
        onChange={(e) => updateJury("profession", e.target.value)}
      ></input>
      {modified ? (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-green-700 text-gray-100 rounded-l-lg -mr-2 hover:bg-green-500"
          onClick={() => saveJury()}
        ></input>
      ) : (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-gray-100 text-black rounded-l-lg -mr-2"
        ></input>
      )}
      <input
        type="button"
        value="Supprimer"
        className="col-span-1 p-2 bg-red-700 rounded-r-lg hover:bg-red-500"
        onClick={(e) => deleteJury()}
      ></input>
    </div>
  );
}

export default AdminJuryCard;
