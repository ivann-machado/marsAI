import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFlash } from "../../context/FlashContext";

function AdminSponsorCard({ id, edition_id, type, name, url, logo }) {
  const [sponsor, setSponsor] = useState({
    id,
    edition_id,
    type,
    name,
    url,
    logo,
  });
  const [modified, setModified] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useAuth();

  //console.log(authToken.token);

  const updateSponsor = (key, value) => {
    setSponsor((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  const saveSponsor = async () => {
    const formData = new FormData();
    formData.append("edition_id", sponsor.edition_id);
    formData.append("name", sponsor.name);
    formData.append("logo", sponsor.logo);
    formData.append("type", sponsor.type);
    formData.append("url", sponsor.url);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/sponsors/" + sponsor.id,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      //const json = await response.json();
      showFlash("success", "Sponsor mis a jour");
    } catch (err) {
      showFlash("error", "Erreur de mise à jour du sponsor");
      console.error(err);
    }

    setModified(false);
  };

  const deleteSponsor = async () => {
    /* Suppresion dans la DB ici */
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/sponsors/" + sponsor.id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");

      setSponsor(null);
      setModified(false);
      showFlash("success", "Sponsor supprimé");
    } catch (err) {
      console.error(err);
      showFlash("error", "Erreur de suppresion du sponsor");
    }

    setModified(false);
  };

  if (!sponsor) return <></>;

  return (
    <div
      key={sponsor.id}
      className="grid grid-cols-7 p-2 bg-gray-900 text-gray-100 gap-2"
    >
      <input
        className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500"
        value={sponsor.edition_id}
        onChange={(e) => updateSponsor("edition_id", e.target.value)}
      ></input>
      <div className="col-span-1 flex flex-col items-center">
        <img src={sponsor.logo} className="p-2 max-w-10 max-h-10"></img>
        <input
          type="file"
          id="sponsor_logo"
          name="logo"
          className="bg-white text-black w-full"
          onChange={(e) => updateSponsor("logo", e.target.value)}
        ></input>
      </div>
      <input
        value={sponsor.name}
        className="col-span-1 p-2 bg-gray-700 text-center rounded-lg hover:bg-gray-500"
        onChange={(e) => updateSponsor("name", e.target.value)}
      ></input>
      <select
        className="col-span-1 p-2 max-h-15 overflow-scroll bg-gray-700 text-center rounded-lg hover:bg-gray-500"
        onChange={(e) => updateSponsor("type", e.target.value)}
        value={sponsor.type}
      >
        <option value="official">Official</option>
        <option value="media">Media</option>
        <option value="technical">Technical</option>
        <option value="other">Other</option>
      </select>
      <input
        value={sponsor.url}
        className="col-span-1 p-2 bg-gray-700 text-center rounded-lg hover:bg-gray-500"
        onChange={(e) => updateSponsor("url", e.target.value)}
      ></input>
      {modified ? (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-green-700 text-gray-100 rounded-l-lg -mr-2 hover:bg-green-500"
          onClick={() => saveSponsor()}
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
        onClick={() => deleteSponsor()}
      ></input>
    </div>
  );
}

export default AdminSponsorCard;
