import { useTranslation } from "react-i18next";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import AdminUsersDash from "../../components/AdminUsersDash/AdminUsersDash.jsx";

function AdminUsers() {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <AdminSidebar />
      <AdminUsersDash />
    </div>
  );
}

export default AdminUsers;
