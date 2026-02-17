import { useState, useEffect } from "react";
import AdminJuryDash from "../../components/AdminJuryDash/AdminJuryDash.jsx";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";

function AdminJury() {
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

  return (
    <div className="flex">
      <AdminSidebar />
      <AdminJuryDash />
    </div>
  );
}

export default AdminJury;
