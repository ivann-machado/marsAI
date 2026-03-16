import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminReviewsDash from "../../components/AdminVideosDash/AdminReviewsDash.jsx";

function AdminReviewVideos() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminReviewsDash />
    </div>
  );
}

export default AdminReviewVideos;
