import { useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function AdminSettingCard({ name, value }) {
  const [setting, setSetting] = useState({
    name,
    value,
  });
  const [modified, setModified] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useauth();

  const updateSetting = (key, value) => {
    setSetting((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  const saveSetting = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/settings/",
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + authToken.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: setting.name,
            value: setting.value,
          }),
        },
      );

      if (!response.ok) throw new Error("Erreur fetch JSON");
      // const json = await response.json();
      showFlash("success", "Settings mis a jour");
    } catch (err) {
      showFlash("error", "Erreur de mise à jour du settings");
      console.error(err);
    }

    setModified(false);
  };

  return (
    <div className="grid grid-cols-3 p-2 bg-gray-900 text-gray-100 gap-2">
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {setting.name}
      </div>
      <input
        value={setting.value}
        onChange={(e) => updateSetting("value", e.target.value)}
        className="text-center col-span-1 rounded-lg border border-gray-400 bg-gray-100 text-black p-1 hover:bg-white hover:border-blue-500"
      ></input>
      {modified ? (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-green-700 text-gray-100 rounded-lg -mr-2 hover:bg-green-500"
          onClick={() => saveSetting()}
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

export default AdminSettingCard;
