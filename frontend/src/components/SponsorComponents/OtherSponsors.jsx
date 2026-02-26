import { useTranslation } from "react-i18next";

function OtherSponsors({ sponsors }) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 md:mx-auto pt-6">
      <h1 className="text-center text-3xl font-extrabold text-white my-6 font-orbitron">
        {t("sponsors_page.other_sponsors")}
      </h1>
      <div className="p-4 flex flex-wrap gap-8 justify-around md:max-w-300 md:mx-auto">
        {sponsors.map((sponsor) => {
          return sponsor.type === "other" ? (
            <div key={sponsor.id} className="relative group py-4">
              <div className="relative inset-0 group-hover:opacity-100 ">
                <h4 className="font-bold">{sponsor.name}</h4>
                <a href={sponsor.url} className="break-all">
                  {t("sponsors_page.website")}:{" "}
                  <span className="text-blue-700">{sponsor.url}</span>
                </a>
              </div>
              <img
                src={sponsor.logo}
                className="w-4/10 aspect-auto mx-auto md:w-25"
              ></img>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default OtherSponsors;
