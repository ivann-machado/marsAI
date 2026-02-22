import { useState } from "react";

function AdminUserCard({ userData }) {
  const [user, setUser] = useState(userData);

  const updateUser = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
    setModified(true);
  };

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
          (user.role === "admin" ? "bg-amber-500" : "bg-red-700") +
          " text-center"
        }
      >
        <option value="admin" className="text-black">
          Admin
        </option>
        <option value="superadmin" className="text-black">
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
        <p>Supprimer</p>
      </div>
    </div>
  );
}

export default AdminUserCard;
