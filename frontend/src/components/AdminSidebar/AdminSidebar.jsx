import SidebarButton from "./SidebarButton";
import { useTranslation } from "react-i18next";
import { useauth } from "../../context/AuthContext";

function AdminSidebar() {
  const { t } = useTranslation();
  const { user, userRole, logout } = useauth();

  return (
    <div className="w-64 bg-linear-to-br from-gray-800 to-gray-900 min-h-screen fixed">
      <div className="bg-linear-to-tr from-gray-900 to-gray-800">
        <p className="text-white p-3 text-center font-bold">
          Bienvenue <span className="text-amber-600">{user}</span>
        </p>
        <p className="text-white mb-8 p-3 text-center font-bold">
          Role: <span className="text-amber-600">{userRole}</span>
        </p>
      </div>
      <p className="text-white mb-8 p-3 text-center font-bold">
        Pages {userRole}:
      </p>

      <div className="flex flex-col text-gray-100">
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/" name={t("admin_sidebar.overview")} />
        ) : null}
        {userRole && ["super_admin", "admin"].includes(userRole) ? (
          <SidebarButton link="/videos" name={t("admin_sidebar.videos")} />
        ) : null}
        {userRole && ["super_admin", "admin"].includes(userRole) ? (
          <SidebarButton link="/reviews" name={t("admin_sidebar.reviews")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/users" name={t("admin_sidebar.users")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/events" name={t("admin_sidebar.events")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/settings" name={t("admin_sidebar.settings")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/content" name={t("admin_sidebar.content")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/jury" name={t("admin_sidebar.jury")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/partners" name={t("admin_sidebar.partners")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/prizes" name={t("admin_sidebar.prizes")} />
        ) : null}
        {userRole && userRole === "super_admin" ? (
          <SidebarButton link="/edit/default" name="Edit Pages" />
        ) : null}
        {userRole ? (
          <SidebarButton
            name={t("Logout")}
            clickAction={logout}
            type={"logout"}
          />
        ) : null}
      </div>
    </div>
  );
}

export default AdminSidebar;
