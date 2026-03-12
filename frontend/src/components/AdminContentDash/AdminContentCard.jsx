import { useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function AdminContentCard({ name, value }) {
  const [content, setContent] = useState({
    name,
    value,
  });
  const [modified, setModified] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useauth();

  const updateContent = (key, value) => {
    setContent((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  const saveContent = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/content/",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + authToken.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: content.name,
            value: content.value,
          }),
        },
      );

      if (!response.ok) throw new Error("Erreur fetch JSON");
      // const json = await response.json();
      showFlash("success", "Content mis a jour");
    } catch (err) {
      showFlash("error", "Erreur de mise à jour du content");
      console.error(err);
    }

    setModified(false);
  };

  return (
    <div className="grid grid-cols-3 p-2 bg-gray-900 text-gray-100 gap-2">
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {content.name}
      </div>
      <input
        value={content.value}
        onChange={(e) => updateContent("value", e.target.value)}
        className="text-center col-span-1 rounded-lg border border-gray-400 bg-gray-100 text-black p-1 hover:bg-white hover:border-blue-500"
      ></input>
      {modified ? (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-green-700 text-gray-100 rounded-lg -mr-2 hover:bg-green-500"
          onClick={() => saveContent()}
        ></input>
      ) : (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-gray-100 text-black rounded-lg"
        ></input>
      )}
    </div>
  );
}

export default AdminContentCard;
