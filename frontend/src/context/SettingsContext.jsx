import { useEffect, useState, createContext, useContext } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // console.log("API URL " + import.meta.env.VITE_API_URL);
    // const stored = localStorage.getItem("settings");
    const stored = null; // forcer le chargement de la DB

    if (stored) {
      const { storedSetting, storedExpiration } = JSON.parse(stored);
      if (Date.now() < storedExpiration) {
        setSettings(storedSetting);
        return;
      } else {
        localStorage.removeItem("settings");
      }
    }
    const fetchData = async () => {
      //   console.log(import.meta.env.VITE_API_URL + "/api/content");
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/content",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (!response.ok) throw new Error("Erreur fetch content");

        const res = await response.json();

        const settingsObject = res.reduce((acc, item) => {
          acc[item.name] = item.value;
          return acc;
        }, {});

        localStorage.setItem(
          "settings",
          JSON.stringify({
            storedExpiration: Date.now() + 100000000,
            storedSetting: settingsObject,
          }),
        );
        setSettings(settingsObject);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  /* useEffect(() => {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => setSettings(data));
    }, []); */

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
