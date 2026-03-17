import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminSettingsDash from "../../components/AdminSettingsDash/AdminSettingtDash.jsx";

function AdminPrizes() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminPrizesDash />
    </div>
  );
}

export default AdminPrizes;
