import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlash } from "../../context/FlashContext";

function AdminRegister() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [informationBox, setInformationBox] = useState({});
  const { showFlash } = useFlash();
  let params = useParams();

  useEffect(() => {
    params.token ? setToken(params.token) : null;
  }, []);

  const handlePassword = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setPassword(value);

    if (!regex.test(value)) {
      setInformationBox((prev) => ({
        ...prev,
        password:
          "Le mot de passe doit avoir au moins 6 characteres et contenir au moins une lettre et un chiffre.",
      }));
    } else if (informationBox.password) {
      setInformationBox((prev) => {
        const { password: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != passwordConfirm) {
      showFlash("error", "Les mots de passe ne sont pas les memes");
      return;
    }
    console.log(import.meta.env.VITE_API_URL + "/api/auth/validate/" + token);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/validate/" + params.token,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: password,
            confirmPassword: passwordConfirm,
          }),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      //let res = await response.json();
      showFlash("success", "Utilisateur crée!");
    } catch (err) {
      showFlash("error", "Echec lors de la création de l'utilisateur");
      console.error(err);
    }
  };

  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-700 min-h-screen text-white font-inter">
      <h1 className="text-center font-extrabold text-4xl p-16">
        Création compte admin:
      </h1>
      <form className="flex flex-col items-center gap-4 p-4">
        <label htmlFor="token">Votre token:</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="bg-gray-300 cursor-not-allowed text-center text-black p-2 rounded-md"
          disabled
        ></input>
        <label htmlFor="password">Choisir mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          className="bg-white  text-black p-2 rounded-md"
        ></input>
        <label htmlFor="password_confirm">Confirmer mot de passe</label>
        <input
          type="password"
          id="password_confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="bg-white  text-black p-2 rounded-md"
        ></input>
        <button
          className="bg-white text-black p-2 rounded-xl hover:bg-gray-300 hover:ring-2 hover:ring-purple-500 transition-colors duration-400"
          onClick={(e) => handleSubmit(e)}
        >
          Soumettre
        </button>
      </form>
      {informationBox != {} ? (
        <div className="w-1/3 mx-auto bg-red-700 px-4">
          {Object.values(informationBox).map((info) => (
            <p>{info}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AdminRegister;
