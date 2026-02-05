import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminEventDash from "../../components/AdminEventDash/AdminEventDash.jsx";

function AdminEvents() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminEventDash />
    </div>
  );
}

export default AdminEvents;
