import { useState } from "react";

function AdminUserCard({ userData }) {
  const [user, setUser] = useState(userData);
  // const [modified, setModified] = useState(false);

  const updateUser = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

  /* const saveUser = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/users/" + user.id,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({}),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const json = await response.json();
      showFlash("success", "Sponsor mis a jour");
    } catch (err) {
      showFlash("error", "Erreur de mise à jour du sponsor");
      console.error(err);
    }

    setModified(false);
  }; */

  // const deleteSponsor = async (key) => {
  //   /* Suppresion dans la DB ici */
  //   try {
  //     const response = await fetch(
  //       import.meta.env.VITE_API_URL + "/api/sponsors/" + sponsor.id,
  //       {
  //         method: "DELETE",
  //         headers: { "Content-Type": "application/json" },
  //       },
  //     );
  //     if (!response.ok) throw new Error("Erreur fetch JSON");

  //     setSponsor(null);
  //     setModified(false);
  //     showFlash("success", "Sponsor supprimé");
  //   } catch (err) {
  //     console.error(err);
  //     showFlash("error", "Erreur de suppresion du sponsor");
  //   }

  //   setModified(false);
  // };

  // if (!sponsor) return <></>;

  return (
    <div
      key={user.id}
      className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1"
    >
      <p>{user.id}</p>
      <input
        value={user.login}
        onChange={(e) => updateUser("login", e.target.value)}
        className="hover:bg-gray-800 text-center"
      ></input>

      <select
        value={user.role}
        onChange={(e) => updateUser("role", e.target.value)}
        className={
          (user.role === "Admin" ? "bg-amber-500" : "bg-red-700") +
          " text-center"
        }
      >
        <option value="Admin" className="text-black">
          Admin
        </option>
        <option value="SuperAdmin" className="text-black">
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
        <button>Supprimer</button>
      </div>
      {/*  <div
        className={
          "bg-green-700 m-auto px-2 hover:bg-green-500 hover:cursor-pointer " +
          (modified ? "block" : "hidden")
        }
      >
        <button>Sauvegarder</button>
      </div> */}
    </div>
  );
}

export default AdminUserCard;
