import { useTranslation } from "react-i18next";

function OfficialSponsors({ sponsors }) {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold text-white">
        {t("sponsors_page.official_sponsors")}
      </h1>
      <div className="p-4">
        {sponsors.map((sponsor) => {
          return sponsor.type === "official" ? (
            <div key={sponsor.id} className="relative group border-b py-4">
              <div className="relative inset-0  group-hover:opacity-100 md:opacity-0 md:absolute md:bg-orange-200">
                <h4 className="font-bold">{sponsor.name}</h4>
                <a href={sponsor.url}>
                  {t("sponsors_page.website")}: {sponsor.url}
                </a>
              </div>
              <img
                src={sponsor.logo}
                className="w-6/10 aspect-auto mx-auto"
              ></img>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default OfficialSponsors;
