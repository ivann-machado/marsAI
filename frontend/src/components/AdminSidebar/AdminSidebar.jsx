import { useTranslation } from "react-i18next";

function AdminSidebar() {
  const { t } = useTranslation();
  return (
    <div className="w-1/5 min-w-20 bg-gray-800 min-h-screen">
      <p className="text-white mb-8 p-3 text-center font-bold">Pages admin:</p>
      <div className="flex flex-col text-gray-100">
        <a href="/">
          <div className="p-3 text-center hover:bg-amber-500">
            {t("admin_sidebar.overview")}
          </div>
        </a>
        <a href="/videos">
          <div className="p-3 text-center hover:bg-amber-500">
            {t("admin_sidebar.videos")}
          </div>
        </a>
        <a href="/users">
          <div className="p-3 text-center hover:bg-amber-500">
            {t("admin_sidebar.users")}
          </div>
        </a>
        <a href="/events">
          <div className="p-3 text-center hover:bg-amber-500">
            {t("admin_sidebar.events")}
          </div>
        </a>
        <a href="/settings">
          <div className="p-3 text-center hover:bg-amber-500">
            {t("admin_sidebar.website")}
          </div>
        </a>
      </div>
    </div>
  );
}

export default AdminSidebar;
