import { useState } from "react";
import { useauth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useauth();
  const navigate = useNavigate();

  const submitLogin = async () => {
    try {
      //console.log(email, password);
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: email, password }),
      });

      if (!response.ok) throw new Error("Erreur lors de la connexion");

      const loginResponse = await response.json();
      if (loginResponse) {
        const login_info = jwtDecode(loginResponse.token);
        //console.log("text", login_info.exp);
        //console.log(loginResponse.token);
        login(
          login_info.login,
          login_info.role,
          login_info.exp,
          loginResponse.token,
        );
        if (login_info.role === "super admin")
          navigate("/", { replace: "true" });
        else navigate("/videos", { replace: "true" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-1/4 items-center bg-gray-400 m-auto mt-20">
      <h2 className="text-white font-bold ">{t("admin_login.title")}</h2>
      <input
        type="text"
        placeholder="login"
        value={email}
        className="bg-white m-2 p-2"
        onChange={(e) => setEmail(e.target.value)}
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
        onClick={() => {
          submitLogin();
        }}
      ></input>
    </div>
  );
}

export default AdminLogin;
