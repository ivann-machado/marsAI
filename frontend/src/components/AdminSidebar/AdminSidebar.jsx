import SidebarButton from "./SidebarButton";
import { useTranslation } from "react-i18next";

function AdminSidebar() {
  const { t } = useTranslation();
  return (
    <div className="w-1/5 min-w-20 bg-gray-800 min-h-screen">
      <p className="text-white mb-8 p-3 text-center font-bold">Pages admin:</p>
      <div className="flex flex-col text-gray-100">
        <SidebarButton link="/" name={t("admin_sidebar.overview")} />
        <SidebarButton link="/videos" name={t("admin_sidebar.videos")} />
        <SidebarButton link="/users" name={t("admin_sidebar.users")} />
        <SidebarButton link="/events" name={t("admin_sidebar.events")} />
        <SidebarButton link="/settings" name={t("admin_sidebar.settings")} />
        <SidebarButton link="/content" name={t("admin_sidebar.content")} />
        <SidebarButton link="/jury" name={t("admin_sidebar.jury")} />
        <SidebarButton link="/partners" name={t("admin_sidebar.partners")} />
      </div>
    </div>
  );
}

export default AdminSidebar;
