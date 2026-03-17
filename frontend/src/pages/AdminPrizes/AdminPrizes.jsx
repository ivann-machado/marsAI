import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminPrizesDash from "../../components/AdminPrizesDash/AdminPrizesDash.jsx";

function AdminPrizes() {
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminPrizesDash />
    </div>
  );
}

export default AdminPrizes;
