import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminSettingsDash from "../../components/AdminSettingsDash/AdminSettingtDash.jsx";

function AdminSettings() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminSettingsDash />
    </div>
  );
}

export default AdminSettings;
