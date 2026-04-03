import { useEffect, useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useAuth } from "../../context/AuthContext";
const languages = { fr: 0, en: 1 };

function Editable({ initialValue, contentKey, language }) {
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);
  const authToken = useAuth();
  const { showFlash } = useFlash();

  const isAdmin = window.location.host.split(".")[0] == "admin";

  const getValue = (values, language) => {
    if (language in languages) return values[languages[language]] ?? "";
    return "";
  };

  const onSave = async (value) => {
    let newValues = JSON.parse(initialValue);
    newValues[languages[language]] = value;
    newValues = JSON.stringify(newValues);
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
            name: contentKey,
            value: newValues,
          }),
        },
      );

      if (!response.ok) throw new Error("Erreur fetch JSON");
      // const json = await response.json();
      //showFlash("success", "Settings mis a jour");
    } catch (err) {
      showFlash("error", "Erreur de mise à jour de la valeur.");
      console.error(err);
    }
  };

  useEffect(() => {
    initialValue
      ? setValue(getValue(JSON.parse(initialValue), language))
      : null;
  }, [initialValue, language]);

  const handleBlur = () => {
    setEditing(false);
    onSave(value);
  };

  return editing && isAdmin ? (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleBlur();
        if (e.key === "Escape") setEditing(false);
      }}
      autoFocus
    />
  ) : isAdmin ? (
    <span onClick={() => setEditing(true)} className="cursor-zoom-in">
      {value || "Click to edit"}
    </span>
  ) : (
    <span>{value}</span>
  );
}

export default Editable;
