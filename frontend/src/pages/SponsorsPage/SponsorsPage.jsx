import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OfficialSponsors from "../../components/SponsorComponents/OfficialSponsors";
import MediaSponsors from "../../components/SponsorComponents/MediaSponsors";
import TechnicalSponsors from "../../components/SponsorComponents/TechnicalSponsors";
import OtherSponsors from "../../components/SponsorComponents/OtherSponsors";
import Loading from "../../components/Utils/Loading";
const mockedSponsors = [
  {
    id: 39,
    edition_id: 1,
    type: "technical",
    name: "SONY",
    url: "www.sony.fr",
    logo: "https://s3.fr-par.scw.cloud/paris/grp1/a844ab90080595c521fb840167d1752c8967ad7b.webp",
  },
  {
    id: 38,
    edition_id: 1,
    type: "media",
    name: "Le Figaro",
    url: "www.lefigaro.fr",
    logo: "https://s3.fr-par.scw.cloud/paris/grp1/fe2133081e4d44180291034f3d46b41596503e70.webp",
  },
  {
    id: 37,
    edition_id: 1,
    type: "official",
    name: "La Plateforme",
    url: "www.laplateforme.io",
    logo: "https://s3.fr-par.scw.cloud/paris/grp1/11e4f8a60c1d562185ff1ada3d759fb9a9daddea.webp",
  },
  {
    id: 35,
    edition_id: 1,
    type: "media",
    name: "Le Monde",
    url: "www.lemonde.fr",
    logo: "https://s3.fr-par.scw.cloud/paris/grp1/68e1db043475d2495337721f9f94fdb18db83820.webp",
  },
  {
    id: 34,
    edition_id: 1,
    type: "other",
    name: "Mairie de Marseille",
    url: "www.marseille.fr",
    logo: "https://s3.fr-par.scw.cloud/paris/grp1/4ab8d2903fdd51cf5a148849b4780ceaad714f09.webp",
  },
  {
    id: 33,
    edition_id: 1,
    type: "official",
    name: "Mobile Film Festival",
    url: "www.mobilefilmfestival.com",
    logo: "https://s3.fr-par.scw.cloud/paris/grp1/948f25d3ddfd478e8af216d904052f19cf019164.webp",
  },
];
function SponsorsPage() {
  const [sponsors, setSponsors] = useState(mockedSponsors);

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
  console.log(sponsors);
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
