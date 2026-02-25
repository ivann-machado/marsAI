import { useTranslation } from "react-i18next";

function MediaSponsors({ sponsors }) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800 pt-8">
      <h1 className="text-center text-4xl font-extrabold text-white my-8 font-orbitron">
        {t("sponsors_page.media_sponsors")}
      </h1>
      <div className="p-4 flex flex-wrap gap-16 justify-around md:max-w-300 md:mx-auto">
        {sponsors.map((sponsor) => {
          return sponsor.type === "media" ? (
            <div key={sponsor.id} className="relative group py-4">
              <div className="relative inset-0 group-hover:opacity-100 md:opacity-0 md:absolute md:bg-white md:w-50 md:h-50 md:group-hover:opacity-70 md:text-black md:flex md:justify-center md:items-center md:flex-col md:rounded-full transition delay-200 duration-500">
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
                className="w-5/10 aspect-auto mx-auto md:w-50"
              ></img>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}

export default MediaSponsors;
