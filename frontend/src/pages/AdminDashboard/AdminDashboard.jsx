import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminOverview from "../../components/AdminOverview/AdminOverview";

function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminOverview />
    </div>
  );
}

export default AdminDashboard;
