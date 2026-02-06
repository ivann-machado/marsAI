import { useTranslation } from "react-i18next";
import { useState } from "react";

function AdminLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    try {
      const response = await fetch("/api/login/" + login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      const loginResponse = await response.json();
      if (loginResponse) console.log("mettre en useContext");
    } catch (err) {
      console.error(err);
    }
  };

  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-1/4 items-center bg-gray-400 m-auto mt-20">
      <h2 className="text-white font-bold ">{t("admin_login.title")}</h2>
      <input
        type="text"
        placeholder="login"
        value={login}
        className="bg-white m-2 p-2"
        onChange={(e) => setLogin(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="password"
        value={password}
        className="bg-white m-2 p-2"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <input
        type="button"
        value={t("admin_login.submit")}
        className="bg-white m-2 p-2 hover:bg-gray-300"
        onClick={submitLogin}
      ></input>
    </div>
  );
}

export default AdminLogin;
