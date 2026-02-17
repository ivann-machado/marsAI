import AdminJuryList from "./AdminJuryList";
import { useEffect, useState } from "react";

function AdminJuryDash() {
  const [jury, setJury] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setJury(json.mockedJury);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!jury) return <p>Loading...</p>;

  return (
    <div className="flex flex-col w-4/5">
      <AdminJuryList jury_list={jury} />
      <form>
        <p>Ajouter membre jury:</p>
        <label htmlFor="jury_name">Nom et prénom</label>
        <input id="jury_name"></input>
        <label htmlFor="jury_name">Nom et prénom</label>
        <input id="jury_name"></input>
        <input type="button" value="Ajouter"></input>
      </form>
    </div>
  );
}

export default AdminJuryDash;
