import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import Editable from "../../components/Utils/Editable";

function HomepagePhase3() {
  const { t, i18n } = useTranslation();
  const settings = useSettings();
  const [winners, setWinners] = useState([
    {
      title: "NEURAL DREAM",
      producer: "Marie Laurent",
      country: t("phase3.country_belgium"),
      cover_image: "/src/assets/neural.png",
      prize: t("phase3.prize_grand_prix"),
    },
    {
      title: "PROTOCOL ALPHA",
      producer: "Jean Dupont",
      country: t("phase3.country_france"),
      cover_image: "/src/assets/robot.png",
      prize: t("phase3.prize_jury"),
    },
    {
      title: "CYBER MARSEILLE",
      producer: "Ahmed Karim",
      country: t("phase3.country_france"),
      cover_image: "/src/assets/cyber.png",
      prize: t("phase3.prize_direction"),
    },
    {
      title: "QUANTUM SOULS",
      producer: "Marcus Brown",
      country: t("phase3.country_usa"),
      cover_image: "/src/assets/robot2.png",
      prize: t("phase3.prize_innovation"),
    },
    {
      title: "CODE POETRY",
      producer: "Lars Schmidt",
      country: t("phase3.country_germany"),
      cover_image: "/src/assets/cyber2.png",
      prize: t("phase3.prize_scenario"),
    },
    {
      title: "FUTURE MEMORIES",
      producer: "Isabella Rodriguez",
      country: t("phase3.country_spain"),
      cover_image: "/src/assets/planete.png",
      prize: t("phase3.prize_artistic"),
    },
  ]);

  useEffect(() => {
    /* FETCH LES FILMS GAGNANTS */
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/prized-videos/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch rest videos");
        const res = await response.json();
        setWinners(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <meta
        name="description"
        content="Bienvenue sur notre page d'accueil, ici vous pourrez commencer l'exploration de notre site présentant le festival MarsAi"
      />
      <Header />

      <div className="w-full overflow-hidden bg-[#050508]">
        {/* Hero Section */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236, 72, 153, 0.3) 0%, transparent 50%), url('/src/assets/mars-background.png')`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f80] via-[#0a0a0fcc] to-[#050508]"></div>
          <div className="relative z-10 text-center px-4">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="px-8 py-3 bg-gradient-to-r from-[#10b981]/20 to-[#059669]/20 backdrop-blur-sm border border-[#10b981]/50 rounded-full">
                <span className="text-[#10b981] font-inter font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                  <span className="text-xl">✓</span>
                  {settings.homepage_phase3_festival_completed ? (
                    <Editable
                      initialValue={settings.homepage_phase3_festival_completed}
                      contentKey={"homepage_phase3_festival_completed"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.festival_completed")
                  )}
                </span>
              </div>
            </div>
            <h1 className="font-orbitron font-black text-[clamp(60px,12vw,140px)] leading-[0.9] mb-5 tracking-[-2px] uppercase">
              <span className="bg-gradient-to-br from-white to-[#e0e0ff] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                MARS
              </span>
              <span className="bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.8)]">
                AI
              </span>
              <br />
              <span className="text-[clamp(32px,6vw,64px)] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
                {settings.homepage_phase3_awards_2026 ? (
                  <Editable
                    initialValue={settings.homepage_phase3_awards_2026}
                    contentKey={"homepage_phase3_awards_2026"}
                    language={i18n.language}
                  />
                ) : (
                  t("phase3.awards_2026")
                )}
              </span>
            </h1>
            <p className="font-orbitron font-semibold text-[clamp(20px,3vw,36px)] mb-6 text-white">
              {settings.homepage_phase3_discover_winners ? (
                <Editable
                  initialValue={settings.homepage_phase3_discover_winners}
                  contentKey={"homepage_phase3_discover_winners"}
                  language={i18n.language}
                />
              ) : (
                t("phase3.discover_winners")
              )}
            </p>
            <p className="text-[clamp(14px,2vw,18px)] text-[#a0a0b8] mb-3 max-w-3xl mx-auto">
              {settings.homepage_phase3_hero_description ? (
                <Editable
                  initialValue={settings.homepage_phase3_hero_description}
                  contentKey={"homepage_phase3_hero_description"}
                  language={i18n.language}
                />
              ) : (
                t("phase3.hero_description")
              )}
              <br />
              {settings.homepage_phase3_hero_description_2 ? (
                <Editable
                  initialValue={settings.homepage_phase3_hero_description_2}
                  contentKey={"homepage_phase3_hero_description_2"}
                  language={i18n.language}
                />
              ) : (
                t("phase3.hero_description_2")
              )}
            </p>
            <div className="flex gap-5 justify-center flex-wrap mt-12">
              <a
                href="#palmares"
                className="px-10 py-4 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-white font-inter font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(251,191,36,0.4)] hover:translate-y-[-3px] transition-all"
              >
                {t("phase3.see_palmares")}
              </a>
              {/*   <a
                href="#highlights"
                className="px-10 py-4 bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:translate-y-[-3px] transition-all"
              >
                {t("phase3.watch_highlights")}
              </a> */}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-[#1a0a2e] via-[#0a0a0f] to-[#1a0a2e] border-y border-[#fbbf24]/30">
          <div className="max-w-7xl mx-auto px-10">
            <div className="text-center mb-8">
              <h3 className="font-orbitron font-bold text-2xl text-[#fbbf24] mb-2">
                {settings.homepage_phase3_final_results ? (
                  <Editable
                    initialValue={settings.homepage_phase3_final_results}
                    contentKey={"homepage_phase3_final_results"}
                    language={i18n.language}
                  />
                ) : (
                  t("phase3.final_results")
                )}
              </h3>
              <p className="text-sm text-[#a0a0b8]">
                {settings.homepage_phase3_festival_dates ? (
                  <Editable
                    initialValue={settings.homepage_phase3_festival_dates}
                    contentKey={"homepage_phase3_festival_dates"}
                    language={i18n.language}
                  />
                ) : (
                  t("phase3.festival_dates")
                )}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {/*  {stats.map((stat, i) => (
                <div key={i}>
                  <div
                    className={`font-orbitron font-black text-4xl mb-2 ${stat.color}`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))} */}

              <div>
                <div
                  className={`font-orbitron font-black text-4xl mb-2 ${t("phase3.stat_1_color")}`}
                >
                  {settings.phase3_stat_1_number ? (
                    <Editable
                      initialValue={settings.phase3_stat_1_number}
                      contentKey={"phase3_stat_1_number"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_1_number")
                  )}
                </div>
                <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                  {settings.phase3_stat_1_label ? (
                    <Editable
                      initialValue={settings.phase3_stat_1_label}
                      contentKey={"phase3_stat_1_label"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_1_label")
                  )}
                </div>
              </div>

              <div>
                <div
                  className={`font-orbitron font-black text-4xl mb-2 ${t("phase3.stat_2_color")}`}
                >
                  {settings.phase3_stat_2_number ? (
                    <Editable
                      initialValue={settings.phase3_stat_2_number}
                      contentKey={"phase3_stat_2_number"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_2_number")
                  )}
                </div>
                <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                  {settings.phase3_stat_2_label ? (
                    <Editable
                      initialValue={settings.phase3_stat_2_label}
                      contentKey={"phase3_stat_2_label"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_2_label")
                  )}
                </div>
              </div>

              <div>
                <div
                  className={`font-orbitron font-black text-4xl mb-2 ${t("phase3.stat_3_color")}`}
                >
                  {settings.phase3_stat_3_number ? (
                    <Editable
                      initialValue={settings.phase3_stat_3_number}
                      contentKey={"phase3_stat_3_number"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_3_number")
                  )}
                </div>
                <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                  {settings.phase3_stat_3_label ? (
                    <Editable
                      initialValue={settings.phase3_stat_3_label}
                      contentKey={"phase3_stat_3_label"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_3_label")
                  )}
                </div>
              </div>

              <div>
                <div
                  className={`font-orbitron font-black text-4xl mb-2 ${t("phase3.stat_4_color")}`}
                >
                  {settings.phase3_stat_4_number ? (
                    <Editable
                      initialValue={settings.phase3_stat_4_number}
                      contentKey={"phase3_stat_4_number"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_4_number")
                  )}
                </div>
                <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                  {settings.phase3_stat_4_label ? (
                    <Editable
                      initialValue={settings.phase3_stat_4_label}
                      contentKey={"phase3_stat_4_label"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.stat_4_label")
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grand Winner */}
        <section className="py-32 bg-gradient-to-br from-[#050508] to-[#1a0a2e] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)] blur-3xl"></div>
          <div className="max-w-6xl mx-auto px-10 relative z-10 text-center">
            <div className="text-[#fbbf24] font-inter font-bold text-sm tracking-[3px] uppercase mb-6">
              {settings.homepage_phase3_grand_prize ? (
                <Editable
                  initialValue={settings.homepage_phase3_grand_prize}
                  contentKey={"homepage_phase3_grand_prize"}
                  language={i18n.language}
                />
              ) : (
                t("phase3.grand_prize")
              )}
            </div>
            <h2 className="font-orbitron font-black text-[clamp(40px,8vw,80px)] mb-8">
              <span className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
                NEURAL DREAM
              </span>
            </h2>
            <div className="flex items-center justify-center gap-6 text-[#a0a0b8] mb-12 text-lg">
              <span>Marie Laurent</span>
              <span>•</span>
              <span>Belgique</span>
            </div>
            <Link
              to="/video/1"
              className="group cursor-pointer max-w-4xl mx-auto block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(251,191,36,0.4)] border-4 border-[#fbbf24]/50 hover:border-[#fbbf24] transition-all">
                <div className="w-full aspect-video relative bg-[#2a1a34]">
                  <img
                    src="/src/assets/neural.png"
                    alt="NEURAL DREAM"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-[#fbbf24] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-10 h-10 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center gap-2">
                    <span className="text-white font-inter font-bold text-sm uppercase">
                      {t("phase3.grand_winner")}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-lg text-[#a0a0b8] max-w-2xl mx-auto">
                "{t("phase3.winner_quote")}"
              </p>
            </Link>
          </div>
        </section>

        {/* Winners List */}
        <section id="palmares" className="py-32 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-10">
            <div className="text-center mb-20">
              <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] mb-6 text-white">
                {t("phase3.complete_palmares")}
                <br />
                <span className="text-[#fbbf24]">{t("phase3.2026")}</span>
              </h2>
              <p className="text-[#a0a0b8] text-lg">
                {t("phase3.palmares_description")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {winners.map((winner, i) => (
                <Link
                  to={`/video/${i + 1}`}
                  key={i}
                  className="group relative block"
                >
                  {/* {i < 3 && (
                    <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center font-orbitron font-black text-white text-lg shadow-[0_0_20px_rgba(251,191,36,0.6)]">
                      {i + 1}
                    </div>
                  )} */}
                  <div className="bg-[#1a1a24] rounded-3xl border border-white/5 hover:border-[#fbbf24]/50 transition-all overflow-hidden group-hover:translate-y-[-10px]">
                    <div className="w-full aspect-video relative bg-[#2a1a34]">
                      <img
                        src={winner.thumbnail}
                        alt={winner.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                          <svg
                            className="w-6 h-6 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-[#fbbf24] font-inter font-semibold uppercase tracking-wider mb-3">
                        {winner.prize}
                      </div>
                      <h3 className="font-orbitron font-bold text-2xl mb-3 text-white group-hover:text-[#fbbf24] transition-colors">
                        {winner.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-[#a0a0b8]">
                        <span>{winner.director}</span>
                        <span>•</span>
                        <span>{winner.country}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-[#0a0a0f]">
          <div className="max-w-6xl mx-auto px-10">
            <div className="text-center mb-20">
              <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] mb-6 text-white">
                {settings.phase3_testimonials ? (
                  <Editable
                    initialValue={settings.phase3_testimonials}
                    contentKey={"phase3_testimonials"}
                    language={i18n.language}
                  />
                ) : (
                  t("phase3.testimonials")
                )}
                <br />
                <span className="text-[#06b6d4]">
                  {settings.phase3_reactions ? (
                    <Editable
                      initialValue={settings.phase3_reactions}
                      contentKey={"phase3_reactions"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.reactions")
                  )}
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#1a1a24] to-[#2a1a34] p-8 rounded-3xl border border-white/5 hover:border-[#06b6d4]/50 transition-all">
                <p className="text-[#a0a0b8] mb-6 text-lg italic">
                  "
                  {settings.phase3_testimonial_1_quote ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_1_quote}
                      contentKey={"phase3_testimonial_1_quote"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_1_quote")
                  )}
                  "
                </p>
                <div className="font-orbitron font-bold text-white">
                  {settings.phase3_testimonial_1_author ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_1_author}
                      contentKey={"phase3_testimonial_1_author"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_1_author")
                  )}
                </div>
                <div className="text-sm text-[#6b6b85]">
                  {settings.phase3_testimonial_1_role ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_1_role}
                      contentKey={"phase3_testimonial_1_role"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_1_role")
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a24] to-[#2a1a34] p-8 rounded-3xl border border-white/5 hover:border-[#06b6d4]/50 transition-all">
                <p className="text-[#a0a0b8] mb-6 text-lg italic">
                  "
                  {settings.phase3_testimonial_2_quote ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_2_quote}
                      contentKey={"phase3_testimonial_2_quote"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_2_quote")
                  )}
                  "
                </p>
                <div className="font-orbitron font-bold text-white">
                  {settings.phase3_testimonial_2_author ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_2_author}
                      contentKey={"phase3_testimonial_2_author"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_2_author")
                  )}
                </div>
                <div className="text-sm text-[#6b6b85]">
                  {settings.phase3_testimonial_2_role ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_2_role}
                      contentKey={"phase3_testimonial_2_role"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_2_role")
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#1a1a24] to-[#2a1a34] p-8 rounded-3xl border border-white/5 hover:border-[#06b6d4]/50 transition-all">
                <p className="text-[#a0a0b8] mb-6 text-lg italic">
                  "
                  {settings.phase3_testimonial_3_quote ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_3_quote}
                      contentKey={"phase3_testimonial_3_quote"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_3_quote")
                  )}
                  "
                </p>
                <div className="font-orbitron font-bold text-white">
                  {settings.phase3_testimonial_3_author ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_3_author}
                      contentKey={"phase3_testimonial_3_author"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_3_author")
                  )}
                </div>
                <div className="text-sm text-[#6b6b85]">
                  {settings.phase3_testimonial_3_role ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_3_role}
                      contentKey={"phase3_testimonial_3_role"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_3_role")
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a1a24] to-[#2a1a34] p-8 rounded-3xl border border-white/5 hover:border-[#06b6d4]/50 transition-all">
                <p className="text-[#a0a0b8] mb-6 text-lg italic">
                  "
                  {settings.phase3_testimonial_4_quote ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_4_quote}
                      contentKey={"phase3_testimonial_4_quote"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_4_quote")
                  )}
                  "
                </p>
                <div className="font-orbitron font-bold text-white">
                  {settings.phase3_testimonial_4_author ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_4_author}
                      contentKey={"phase3_testimonial_4_author"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_4_author")
                  )}
                </div>
                <div className="text-sm text-[#6b6b85]">
                  {settings.phase3_testimonial_4_role ? (
                    <Editable
                      initialValue={settings.phase3_testimonial_4_role}
                      contentKey={"phase3_testimonial_4_role"}
                      language={i18n.language}
                    />
                  ) : (
                    t("phase3.testimonial_4_role")
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default HomepagePhase3;
