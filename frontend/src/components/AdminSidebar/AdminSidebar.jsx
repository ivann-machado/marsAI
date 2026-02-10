import SidebarButton from "./SidebarButton";
import { useTranslation } from "react-i18next";
import { useauth } from "../../context/AuthContext";

function AdminSidebar() {
  const { t } = useTranslation();
  const { user, userRole, logout } = useauth();

  const logoutRoutine = () => {
    logout();
  };

  return (
    <div className="w-1/5 min-w-20 bg-gray-800 min-h-screen">
      <p className="text-white mb-8 p-3 text-center font-bold">Pages admin:</p>
      <div className="flex flex-col text-gray-100">
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/" name={t("admin_sidebar.overview")} />
        ) : null}
        {userRole && ["super admin", "admin"].includes(userRole) ? (
          <SidebarButton link="/videos" name={t("admin_sidebar.videos")} />
        ) : null}
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/users" name={t("admin_sidebar.users")} />
        ) : null}
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/events" name={t("admin_sidebar.events")} />
        ) : null}
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/settings" name={t("admin_sidebar.settings")} />
        ) : null}
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/content" name={t("admin_sidebar.content")} />
        ) : null}
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/jury" name={t("admin_sidebar.jury")} />
        ) : null}
        {userRole && userRole === "super admin" ? (
          <SidebarButton link="/partners" name={t("admin_sidebar.partners")} />
        ) : null}
        {userRole ? (
          <SidebarButton name={t("Logout")} clickAction={logout} />
        ) : null}
      </div>
    </div>
  );
}

export default AdminSidebar;
