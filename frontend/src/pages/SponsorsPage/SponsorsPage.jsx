import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OfficialSponsors from "../../components/SponsorComponents/OfficialSponsors";
import MediaSponsors from "../../components/SponsorComponents/MediaSponsors";
import TechnicalSponsors from "../../components/SponsorComponents/TechnicalSponsors";
import OtherSponsors from "../../components/SponsorComponents/OtherSponsors";
import Loading from "../../components/Utils/Loading";

function SponsorsPage() {
  const [sponsors, setSponsors] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/sponsors",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setSponsors(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!sponsors) return <Loading />;

  return (
    <>
      <meta
        name="description"
        content="Retrouvez les Sponsors qui se sont associés avec nous druant le festival Mar AI"
      />
      <Header />
      <div className="bg-gray-900 text-white font-inter">
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
