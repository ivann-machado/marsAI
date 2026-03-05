import AdminSettingCard from "./AdminSettingCard.jsx";
import { useState, useEffect } from "react";
import Loading from "../../components/Utils/Loading.jsx";
import { useauth } from "../../context/AuthContext.jsx";

function AdminSettingsDash() {
  const [settings, setSettings] = useState(null);
  const authToken = useauth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/settings/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authToken.token,
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setSettings(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!settings) return <Loading />;

  return (
    <div className="flex flex-col w-4/5 bg-gray-600 relative">
      <div className="flex flex-col mx-2 mb-8">
        <h2 className="text-4xl font-extrabold m-8">Settings</h2>
        <div className="grid grid-cols-4 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
          <p className="text-center text-xl font-bold">Setting</p>
          <p className="text-center text-xl font-bold">Value</p>
        </div>
        {settings.map((setting) => (
          <AdminSettingCard name={setting.name} value={setting.value} />
        ))}
      </div>
    </div>
  );
}

export default AdminSettingsDash;
