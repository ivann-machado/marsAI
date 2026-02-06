import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminEventDash from "../../components/AdminEventDash/AdminEventDash.jsx";

function AdminEvents() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminEventDash />
    </div>
  );
}

export default AdminEvents;
