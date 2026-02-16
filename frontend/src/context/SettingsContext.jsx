import { useEffect, useState, createContext, useContext } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // console.log("API URL " + import.meta.env.VITE_API_URL);
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

        // console.log(res);
        const settingsObject = res.reduce((acc, item) => {
          acc[item.name] = item.value;
          return acc;
        }, {});

        setSettings(settingsObject);
      } catch (err) {
        return {}; // TO REMOVE
        //console.error(err);
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
