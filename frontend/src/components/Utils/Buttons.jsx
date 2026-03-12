import { useTranslation } from "react-i18next";

export function BackButton({ onClick }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
    >
      ← {t("buttonsComponents.back")}
    </button>
  );
}

export function NextButton({ onClick }) {
  const { t } = useTranslation();
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-8 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300 text-white"
    >
      {t("buttonsComponents.next")} →
    </button>
  );
}
