import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminVideosDash from "../../components/AdminVideosDash/AdminVideosDash.jsx";

function AdminVideos() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminVideosDash />
    </div>
  );
}

export default AdminVideos;
