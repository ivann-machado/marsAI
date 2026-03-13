import { useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function AdminUserCard({ userData }) {
  const [user, setUser] = useState(userData);
  const [confirm, setConfirm] = useState(false);
  const { showFlash } = useFlash();
  const authToken = useauth();

  /* const updateUser = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  }; */

  const updateRole = async (value) => {
    if (user.id === authToken.id) {
      showFlash("error", "On ne peut pas changer son propre role");
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/admins/" + user.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({ role: value }),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      setUser((prev) => ({ ...prev, role: value }));
      showFlash(
        "success",
        "Utilisateur " + user.id + " a maintenant le role de " + value,
      );
    } catch (err) {
      showFlash("error", "Erreur lors de la mise à jour");
      console.error(err);
    }
  };

  const deleteUser = () => {
    if (user.id === authToken.id) {
      showFlash("error", "On ne peut pas supprimer son propre compte");
      return;
    }
    if (!confirm) setConfirm(true);
    else setConfirm(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/admins/" + user.id,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      showFlash("success", "Admin supprimé avec succes.");
    } catch (err) {
      showFlash("error", "Erreur lors de la suppression");
      console.error(err);
    }

    setUser(null);
  };

  if (!user) return null;

  return (
    <div className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1">
      <p className="col-span-1">{user.id}</p>
      <p className="col-span-1">{user.login}</p>

      <select
        value={user.role}
        onChange={(e) => updateRole(e.target.value)}
        className={
          (user.role === "admin" ? "bg-amber-500" : "bg-red-700") +
          " text-center"
        }
      >
        <option value="admin" className="text-black">
          Admin
        </option>
        <option value="super_admin" className="text-black">
          SuperAdmin
        </option>
      </select>

      <div className={"bg-red-700 m-auto px-2 hover:bg-red-500"}>
        <a href={"mailto:" + user.login}>Contactez</a>
      </div>
      <div
        className={
          "bg-red-700 m-auto px-2 hover:bg-red-500 hover:cursor-pointer"
        }
      >
        {confirm ? (
          <button onClick={() => deleteUser()}>Annuler</button>
        ) : (
          <button onClick={() => deleteUser()}>Supprimer</button>
        )}
      </div>
      {confirm ? (
        <div
          className={
            "bg-green-700 m-auto px-2 hover:bg-green-500 hover:cursor-pointer "
          }
        >
          <button onClick={() => confirmDelete()}>Confirmer Suppression</button>
        </div>
      ) : null}
    </div>
  );
}

export default AdminUserCard;
