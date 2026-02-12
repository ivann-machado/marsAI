import { useTranslation } from "react-i18next";

function OfficialSponsors({ sponsors }) {
  const { t } = useTranslation();

  return (
    <div className="pt-10">
      <h1 className="text-center text-6xl font-extrabold text-white my-10">
        {t("sponsors_page.official_sponsors")}
      </h1>
      <div className="p-4 md:flex md:flex-wrap md:gap-20 md:justify-around md:max-w-300 md:mx-auto">
        {sponsors.map((sponsor) => {
          return sponsor.type === "official" ? (
            <div
              key={sponsor.id}
              className="relative group border-b py-4 md:border-none"
            >
              <div className="relative inset-0 group-hover:opacity-100 md:opacity-0 md:absolute md:bg-white md:w-50 md:h-50 md:inset-15 md:bottom-15 md:group-hover:opacity-70  md:text-black md:flex md:justify-center md:items-center md:flex-col md:rounded-full transition delay-200 duration-500 ">
                <h4 className="font-bold">{sponsor.name}</h4>
                <a href={sponsor.url}>
                  {t("sponsors_page.website")}:{" "}
                  <span className="text-blue-700 md:text-black md:hover:text-blue-700">
                    {sponsor.url}
                  </span>
                </a>
              </div>
              <img
                src={sponsor.logo}
                className="w-6/10 aspect-auto mx-auto md:w-80"
              ></img>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default OfficialSponsors;
