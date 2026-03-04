import AdminJuryDash from "../../components/AdminJuryDash/AdminJuryDash.jsx";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";

function AdminJury() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminJuryDash />
    </div>
  );
}

export default AdminJury;
