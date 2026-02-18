import Loading from "../Utils/Loading";
import { useState, useEffect } from "react";

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
          <div
            key={user.id}
            className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1"
          >
            <p>{user.id}</p>
            <p>{user.login}</p>
            <p
              className={user.role === "Admin" ? "bg-amber-500" : "bg-red-700"}
            >
              {user.role}
            </p>
            <div className={"w-8 h-4 bg-red-700 m-auto"}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsersDash;
