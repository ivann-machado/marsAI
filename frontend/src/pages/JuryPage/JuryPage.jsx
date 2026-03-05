import { useEffect, useState } from "react";
import JuryCard from "../../components/JuryCard/JuryCard";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import JuryChart from "../../components/JuryChart/JuryChart";
import Loading from "../../components/Utils/Loading";

function JuryPage() {
  const [jury, setJury] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/jury",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setJury(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!jury) return <Loading />;

  return (
    <>
      <Header />
      <div className="w-full min-h-screen text-white py-8 bg-[#050508] pt-30 font-inter">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%)`,
            backgroundSize: "cover",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <h1 className="text-5xl text-violet-700 font-extrabold text-center mb-8 font-orbitron">
          {t("jury_page.title")}
        </h1>
        <p className="text-lg mb-8 text-white text-center font-orbitron">
          {t("jury_page.description")}
        </p>
        <div className="md:flex md:flex-wrap md:max-w-300 md:mx-auto md:gap-8 md:p-8">
          {jury.map((member) => {
            return (
              <JuryCard
                key={member.id}
                image_url={member.photo}
                name={member.name}
                profession={member.profession}
                bio={member.bio}
              />
            );
          })}
        </div>
        <JuryChart />
      </div>
      <Footer />
    </>
  );
}

export default JuryPage;
