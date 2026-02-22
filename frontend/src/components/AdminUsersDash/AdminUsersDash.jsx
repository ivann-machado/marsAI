import Loading from "../Utils/Loading";
import { useState, useEffect } from "react";
import AdminUserCard from "./AdminUserCard.jsx";

function AdminUsersDash() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setUsers(json.mockedUsers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!users) return <Loading />;

  return (
    <div className="w-4/5 bg-gray-950">
      <h1 className="py-2 font-bold text-3xl text-white text-center">
        Gestion Utilisateurs
      </h1>

      <div className="bg-gray-900 text-white">
        <div className="grid grid-cols-6 w-full mx-4 my-2 text-center">
          <p>ID</p>
          <p>Login</p>
          <p>Role</p>
          <p>Contacter</p>
          <p>Supprimer</p>
        </div>
        {users.map((user) => (
          <AdminUserCard userData={user} />
        ))}
      </div>
    </div>
  );
}

export default AdminUsersDash;
