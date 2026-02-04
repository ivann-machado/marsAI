import { useTranslation } from "react-i18next";

function AdminLogin() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-1/4 items-center bg-gray-400 m-auto mt-20">
      <h2 className="text-white font-bold ">{t("admin_login.title")}</h2>
      <input
        type="text"
        placeholder="login"
        className="bg-white m-2 p-2"
      ></input>
      <input
        type="password"
        placeholder="password"
        className="bg-white m-2 p-2"
      ></input>
      <input
        type="button"
        value={t("admin_login.submit")}
        className="bg-white m-2 p-2 hover:bg-gray-300"
      ></input>
    </div>
  );
}

export default AdminLogin;
