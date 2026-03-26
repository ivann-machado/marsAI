import { useState, useEffect } from "react";
import { useauth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../../context/FlashContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useauth();
  const { showFlash } = useFlash();

  /*  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && document.activeElement === document.body) {
        alert("Toujours pas d'entree");
        //submitLogin(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);
 */
  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ login: email, password }),
        },
      );

      if (!response.ok) {
        showFlash("error", "Identifiant ou mot de passe erroné.");
        //throw new Error("Erreur lors de la connexion");
        return;
      }
      const loginResponse = await response.json();
      if (loginResponse) {
        const login_info = jwtDecode(loginResponse.token);
        login(
          login_info.id,
          login_info.login,
          login_info.role,
          login_info.exp,
          loginResponse.token,
        );
        // console.log(login_info);
        if (login_info.role === "super admin")
          navigate("/", { replace: "true" });
        else navigate("/reviews", { replace: "true" });
      }
    } catch (err) {
      showFlash("error", "Erreur de connexion. réesayez plus tard!");
      console.log(err);
    }
  };

  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-700 min-h-screen text-white font-inter">
      <h2 className="text-center font-extrabold text-4xl p-16">
        {t("admin_login.title")}
      </h2>
      <form className="flex flex-col items-center gap-4 p-4">
        <label htmlFor="login">Votre login (email):</label>
        <input
          type="text"
          placeholder="login"
          id="login"
          value={email}
          className="bg-gray-100  text-black p-2 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitLogin(e);
            }
          }}
        ></input>
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          value={password}
          className="bg-gray-100  text-black p-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitLogin(e);
            }
          }}
        ></input>
        <input
          type="submit"
          value={t("admin_login.submit")}
          className="bg-white text-black p-2 rounded-xl hover:bg-gray-300 hover:ring-2 hover:ring-purple-500 transition-colors duration-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitLogin(e);
            }
          }}
        ></input>
      </form>
      <div className="text-center w-full">
        <p>
          Si vous n'avez pas encore de compte, veuillez contacter
          l'administration
        </p>
        <a
          href={
            "mailto:" + (import.meta.env.VITE_ADMIN_MAIL || "contact@marsai.fr")
          }
          className="underline text-blue-500"
        >
          ici
        </a>
      </div>
    </div>
  );
}

export default AdminLogin;
