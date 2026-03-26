import { useEffect, useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";
const languages = { fr: 0, en: 1 };

function Editable({ initialValue, content_key, language }) {
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);
  const authToken = useauth();
  const { showFlash } = useFlash();

  const isAdmin = window.location.host.split(".")[0] == "admin";

  const getValue = (values, language) => {
    // console.log(languages, language);
    if (languages.hasOwnProperty(language))
      return values[languages[language]] ?? "";
    return "";
  };

  const onSave = async (value) => {
    // console.log(content_key, value);
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
            name: content_key,
            value: value,
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
    // console.log(initialValue);
    // console.log(JSON.parse(initialValue));
    console.log("lang", language);

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
    <span onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
      {value || "Click to edit"}
    </span>
  ) : (
    <span>{value}</span>
  );
}

export default Editable;
