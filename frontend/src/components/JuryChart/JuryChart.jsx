import { useTranslation } from "react-i18next";

function JuryChart() {
  const { t } = useTranslation();
  return (
    <div className="bg-[radial-gradient(circle,_#5e0166,_transparent_99%)] p-4 md:mx-[10%] border-y pb-10">
      {/* Je n'arrive pas à faire un radial gradient  */}
      <h2 className="text-3xl font-extrabold m-8 font-orbitron">
        {t("jury_page.chart_title")}
      </h2>
      <p className="mb-4 mx-4">{t("jury_page.chart_description")}</p>
      <div className="flex p-2 mx-2 border border-white rounded-2xl mb-2 items-center">
        <div className="flex items-center justify-center w-20 h-20 bg-blue-400 rounded-2xl font-orbitron">
          <p className="font-extrabold text-3xl">1</p>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-bold font-orbitron">
            {t("jury_page.ai_originality")}
          </h4>
          <p>{t("jury_page.ai_originality_detail")}</p>
        </div>
      </div>
      <div className="flex p-2 mx-2 border border-white rounded-2xl mb-2 items-center">
        <div className="flex items-center justify-center min-w-20 min-h-20 bg-blue-400 rounded-2xl aspect-square font-orbitron">
          <p className="font-extrabold text-3xl">2</p>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-bold font-orbitron">
            {t("jury_page.aesthetics")}
          </h4>
          <p>{t("jury_page.aesthetics_detail")}</p>
        </div>
      </div>
      <div className="flex p-2 mx-2 border border-white rounded-2xl mb-2 items-center">
        <div className="flex items-center justify-center min-w-20 min-h-20 bg-blue-400 rounded-2xl font-orbitron">
          <p className="font-extrabold text-3xl">3</p>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-bold font-orbitron">
            {t("jury_page.narrative")}
          </h4>
          <p>{t("jury_page.narrative_detail")}</p>
        </div>
      </div>
      <div className="flex p-2 mx-2 border border-white rounded-2xl mb-2 items-center">
        <div className="flex items-center justify-center min-w-20 min-h-20 bg-blue-400 rounded-2xl font-orbitron">
          <p className="font-extrabold text-3xl">4</p>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-bold font-orbitron">
            {t("jury_page.impact")}
          </h4>
          <p>{t("jury_page.impact_detail")}</p>
        </div>
      </div>
    </div>
  );
}

export default JuryChart;
