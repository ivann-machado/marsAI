import { useState } from "react";
import { useauth } from "../../context/AuthContext";

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
  const authToken = useauth();

  console.log(authToken.token);

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
        import.meta.env.VITE_API_URL + "/api/content",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {},
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const json = await response.json();
      setJury(json.mockedJury);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div key={jury.id} className="grid grid-cols-7 p-2">
      <div className="col-span-1 p-2">
        Edition{" "}
        <input
          className="inline"
          value={jury.edition_id}
          onChange={(e) => updateJury("edition_id", e.target.value)}
        ></input>
      </div>
      <img src={jury.photo} className="col-span-1 p-2"></img>
      <input
        value={jury.name}
        className="col-span-1 p-2"
        onChange={(e) => updateJury("name", e.target.value)}
      ></input>
      <input
        value={jury.bio}
        className="col-span-1 p-2 max-h-15 overflow-scroll"
        onChange={(e) => updateJury("bio", e.target.value)}
      ></input>
      <input
        value={jury.profession}
        className="col-span-1 p-2"
        onChange={(e) => updateJury("profession", e.target.value)}
      ></input>
      {modified ? (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-green-700"
        ></input>
      ) : (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-gray-100"
        ></input>
      )}
      <input
        type="button"
        value="Supprimer"
        className="col-span-1 p-2 bg-red-700"
      ></input>
    </div>
  );
}

export default AdminJuryCard;
