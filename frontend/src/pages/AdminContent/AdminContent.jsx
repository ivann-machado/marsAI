import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminContentDash from "../../components/AdminContentDash/AdminContentDash.jsx";

function AdminContent() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminContentDash />
    </div>
  );
}

export default AdminContent;
