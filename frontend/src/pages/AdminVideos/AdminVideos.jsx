import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminVideosDash from "../../components/AdminVideosDash/AdminVideosDash.jsx";

function AdminVideos() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminVideosDash />
    </div>
  );
}

export default AdminVideos;
