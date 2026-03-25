import Loading from "../Utils/Loading";
import { useState, useEffect } from "react";
import AdminUserCard from "./AdminUserCard.jsx";
import AdminUserInviteForm from "./AdminUserInviteForm.jsx";
import Pagination from "../Utils/Pagination.jsx";
import { useauth } from "../../context/AuthContext.jsx";

function AdminUsersDash() {
  const [users, setUsers] = useState(null);
  const [userPage, setUserPage] = useState(1);
  const [userPages, setUserPages] = useState(1);
  const authContext = useauth();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/data.json");
  //       if (!response.ok) throw new Error("Erreur fetch JSON");
  //       const json = await response.json();
  //       setUsers(json.mockedUsers);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/admins",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authContext.token,
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setUsers(json.data);
        setUserPages(json.meta.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!users) return <Loading dashboard={true} />;

  return (
    <div className="w-full ml-64 min-h-screen bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950  flex flex-col items-center">
      <h1 className="py-4 font-bold text-3xl text-white text-center">
        Gestion Utilisateurs
      </h1>

      <div className="bg-gray-900 text-white w-9/10">
        <div className="grid grid-cols-6 w-full mx-4 my-2 text-center">
          <p>ID</p>
          <p>Login</p>
          <p>Role</p>
          <p>Contacter</p>
          <p>Supprimer</p>
        </div>
        {users.map((user) => (
          <AdminUserCard key={user.id} userData={user} />
        ))}
      </div>
      <Pagination
        currentPage={userPage}
        totalPages={userPages}
        setPage={setUserPage}
      />
      <AdminUserInviteForm />
    </div>
  );
}

export default AdminUsersDash;
