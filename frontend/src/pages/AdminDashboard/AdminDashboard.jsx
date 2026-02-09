import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminOverview from "../../components/AdminOverview/AdminOverview";

function AdminDashboard() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminOverview />
    </div>
  );
}

export default AdminDashboard;
