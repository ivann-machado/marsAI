import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OfficialSponsors from "../../components/SponsorComponents/OfficialSponsors";
import MediaSponsors from "../../components/SponsorComponents/MediaSponsors";
import TechnicalSponsors from "../../components/SponsorComponents/TechnicalSponsors";
import OtherSponsors from "../../components/SponsorComponents/OtherSponsors";

function SponsorsPage() {
  const [sponsors, setSponsors] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setSponsors(json.mockedSponsors);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!sponsors) return <p>Loading..</p>;

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-white">
        <OfficialSponsors sponsors={sponsors} />
        <MediaSponsors sponsors={sponsors} />
        <TechnicalSponsors sponsors={sponsors} />
        <OtherSponsors sponsors={sponsors} />
      </div>
      <Footer />
    </>
  );
}

export default SponsorsPage;
