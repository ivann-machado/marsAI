import { useEffect, useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function Editable({ initialValue, content_key }) {
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState(false);
  const authToken = useauth();
  const { showFlash } = useFlash();

  const onSave = async (value) => {
    console.log(content_key, value);
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
    initialValue ? setValue(initialValue) : null;
  }, [initialValue]);

  const handleBlur = () => {
    setEditing(false);
    onSave(value);
  };

  return editing ? (
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
  ) : (
    <span onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
      {value || "Click to edit"}
    </span>
  );
}

export default Editable;
