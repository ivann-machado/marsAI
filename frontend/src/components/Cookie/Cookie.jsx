import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const COOKIE_STORAGE_KEY = "marsai_cookie_consent_status";

function Cookie() {
  const { t } = useTranslation();
  const [consentStatus, setConsentStatus] = useState(null);
  const [showRefuseConfirm, setShowRefuseConfirm] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (storedStatus) {
      setConsentStatus(storedStatus);
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
    setConsentStatus("accepted");
    setVisible(false);
    setShowRefuseConfirm(false);
  };

  const refuseCookies = () => {
    setShowRefuseConfirm(true);
  };

  const confirmRefusal = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, "refused");
    setConsentStatus("refused");
    setVisible(false);
    setShowRefuseConfirm(false);
  };

  if (!visible && !showRefuseConfirm) return null;

  return (
    <>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="w-full max-w-xl rounded-2xl bg-gray-800 text-gray-100 p-6 shadow-2xl border border-indigo-500/30">
            <h2 className="text-xl font-bold mb-2">{t("cookie.title")}</h2>
            <p className="text-sm text-gray-300 mb-4">
              {t("cookie.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptCookies}
                className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                {t("cookie.accept")}
              </button>
              <button
                onClick={refuseCookies}
                className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                {t("cookie.decline")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRefuseConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 mt-10">
          <div className="w-full max-w-md rounded-2xl bg-gray-800 text-gray-100 p-6 shadow-2xl border border-indigo-500/30">
            <h3 className="text-lg font-bold mb-3">
              {t("cookie.refuse_confirm_title")}
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              {t("cookie.refuse_confirm_description")}
            </p>
            <button
              onClick={confirmRefusal}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {t("cookie.refuse_confirm_button")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cookie;
