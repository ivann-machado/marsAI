import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminUsersDash from "../../components/AdminUsersDash/AdminUsersDash.jsx";

function AdminUsers() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminUsersDash />
    </div>
  );
}

export default AdminUsers;
