import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlash } from "../../context/FlashContext";

function AdminRegister() {
  // const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { showFlash } = useFlash();
  let params = useParams();

  useEffect(() => {
    params.token ? setToken(params.token) : null;
  }, []);

  const handleSubmit = async () => {
    if (password != passwordConfirm) {
      showFlash("error", "Les mots de passe ne sont pas les memes");
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/validate/" + token,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: password }),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      let res = await response.json();
      showFlash("success", "Utilisateur crée!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-center">Registration</h1>
      <form className="flex flex-col items-center gap-4 bg-gray-500 p-4">
        {/*  <label for="id">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white"
        ></input> */}
        <label for="token">Token</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="bg-white"
        ></input>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-white"
        ></input>
        <label for="password_confirm">Confirm Password</label>
        <input
          type="password"
          id="password_confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="bg-white"
        ></input>
        <button className="bg-white" onClick={() => handleSubmit()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminRegister;
