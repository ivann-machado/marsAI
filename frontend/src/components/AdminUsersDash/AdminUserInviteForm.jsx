import { useState } from "react";
import { useFlash } from "../../context/FlashContext.jsx";
import { useAuth } from "../../context/AuthContext";

function AdminUserInviteForm() {
  const [email, setEmail] = useState("");
  const { showFlash } = useFlash();
  const authToken = useAuth();

  const sendInvite = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({
            login: email,
          }),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      showFlash("success", "Invitation envoyée avec succes.");
      setEmail("");
    } catch (err) {
      showFlash("error", "Echec lors de l'envoi de l'invitation");
      console.error(err);
    }
  };

  return (
    <form className="mx-auto">
      <h5 className="text-gray-100 text-4xl m-4 font-bol">Invite Admin</h5>
      <label htmlFor="login" className="text-gray-100 text-lg font-bold m-2">
        Email
      </label>
      <input
        type="email"
        value={email}
        placeholder="email..."
        className="text-black bg-white p-2"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button
        type="submit"
        className="text-black bg-gray-300 m-2 p-2 hover:ring-2 hover:ring-purple-600"
        onClick={(e) => sendInvite(e)}
      >
        Envoyer Invitation
      </button>
    </form>
  );
}

export default AdminUserInviteForm;
