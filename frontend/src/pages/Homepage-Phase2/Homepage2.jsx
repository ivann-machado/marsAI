import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const btn =
  "font-inter font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-300";
const btnHover = "hover:translate-y-[-3px]";
const card = "bg-[#1a1a24] rounded-3xl border border-white/5";
const badge =
  "inline-block px-6 py-2 rounded-full font-inter font-semibold text-sm tracking-wider uppercase";
const container = "max-w-7xl mx-auto px-10";
const h2Style =
  "font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight mb-6 text-white";

const stats = [
  { number: "3,247", labelKey: "phase2_visitors", color: "text-[#10b981]" },
  { number: "50", labelKey: "phase2_films_selection", color: "text-[#ec4899]" },
  { number: "120", labelKey: "phase2_countries", color: "text-[#06b6d4]" },
  { number: "60+", labelKey: "phase2_experts", color: "text-[#a855f7]" },
];

const films = [
  { title: "PROTOCOL\nALPHA", country: "France" },
  { title: "NEURAL\nDREAM", country: "Belgique" },
  { title: "CYBER\nMARSEILLE", country: "France" },
];

const socials = [
  {
    name: "Instagram",
    handle: "@marsai.festival",
    color: "from-[#e4405f] to-[#a855f7]",
  },
  {
    name: "Twitter/X",
    handle: "@marsai_fest",
    color: "from-[#1da1f2] to-[#0d8bd9]",
  },
  {
    name: "LinkedIn",
    handle: "MARS.AI Festival",
    color: "from-[#0077b5] to-[#00a0dc]",
  },
];

const MAPS_URL =
  "https://www.google.com/maps/place/École+La+Plateforme_+Marseille+-+Entrée+Sud/@43.3141763,5.3662017,17z";

function HomepagePhase2() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const target = new Date("2026-06-13T20:00:00").getTime();
    const interval = setInterval(() => {
      const d = target - Date.now();
      if (d > 0)
        setTimeLeft({
          days: Math.floor(d / 86400000),
          hours: Math.floor((d % 86400000) / 3600000),
          minutes: Math.floor((d % 3600000) / 60000),
          seconds: Math.floor((d % 60000) / 1000),
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className="w-full overflow-hidden bg-[#050508]">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%), url('/src/assets/mars-background.png')`,
              backgroundSize: "cover",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f80] via-[#0a0a0fcc] to-[#050508]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)] animate-pulse" />

          <div className="relative z-10 text-center px-4">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-sm border border-red-500/50 rounded-full">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-inter font-bold text-sm tracking-wider uppercase">
                  {t("homepage.phase2_live_badge")}
                </span>
              </div>
              <div className="text-[#06b6d4] text-xs tracking-[2px] uppercase font-inter">
                {t("homepage.phase2_location")}
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
              <span className="text-[clamp(32px,6vw,64px)] bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                FESTIVAL 2026
              </span>
            </h1>

            <p className="font-orbitron font-semibold text-[clamp(20px,3vw,36px)] mb-6 text-white">
              {t("homepage.phase2_event_ongoing")}{" "}
              <span className="text-[#10b981]">
                {t("homepage.phase2_event_ongoing_status")}
              </span>
            </p>
            <p className="text-[clamp(14px,2vw,18px)] text-[#a0a0b8] mb-3 max-w-3xl mx-auto">
              {t("homepage.phase2_hero_description")}
              <br />
              {t("homepage.phase2_hero_description_2")}
            </p>

            <div className="flex gap-5 justify-center flex-wrap mt-12">
              <button
                className={`px-9 py-4 bg-gradient-to-br from-[#10b981] to-[#059669] text-white ${btn} ${btnHover} shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)]`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  {t("homepage.phase2_live_program")}
                </span>
              </button>
              <button
                className={`px-9 py-4 bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-white ${btn} ${btnHover} shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)]`}
              >
                {t("homepage.phase2_official_selection_btn")}
              </button>
              <button
                className={`px-9 py-4 bg-transparent text-white ${btn} ${btnHover} border-2 border-[#06b6d4] hover:bg-[#06b6d4] hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)]`}
              >
                {t("homepage.phase2_practical_info_btn")}
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-gradient-to-r from-[#1a0a2e] via-[#0a0a0f] to-[#1a0a2e] border-y border-[#a855f7]/30">
          <div className={container}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    className={`font-orbitron font-black text-3xl mb-1 ${s.color}`}
                  >
                    {s.number}
                  </div>
                  <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                    {t(s.labelKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="py-20 bg-gradient-to-br from-[#050508] to-[#1a0a2e] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
          <div className="max-w-5xl mx-auto px-10 text-center relative z-10">
            <div
              className={`${badge} bg-[#ec4899]/20 border border-[#ec4899]/50 text-[#ec4899] mb-8`}
            >
              {t("homepage.phase2_closing_ceremony")}
            </div>
            <h2 className="font-orbitron font-black text-[clamp(32px,6vw,56px)] leading-tight mb-6 text-white">
              {t("homepage.night_title")}{" "}
              <span className="text-[#ec4899]">
                {t("homepage.night_title_highlight")}
              </span>
            </h2>
            <p className="text-[#a0a0b8] text-lg mb-12 max-w-2xl mx-auto">
              {t("homepage.phase2_night_description")}
              <br />
              <span className="text-white font-semibold">
                {t("homepage.phase2_night_date")}
              </span>
            </p>

            <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
              {[
                { v: timeLeft.days, l: "phase2_days" },
                { v: timeLeft.hours, l: "phase2_hours" },
                { v: timeLeft.minutes, l: "phase2_minutes" },
                { v: timeLeft.seconds, l: "phase2_seconds" },
              ].map((x, i) => (
                <div key={i} className={`${card} p-8 border-[#ec4899]/30`}>
                  <div className="font-orbitron font-black text-6xl text-[#ec4899] mb-2">
                    {String(x.v).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                    {t(x.l)}
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`px-12 py-4 bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white ${btn} text-base ${btnHover} hover:shadow-[0_20px_50px_rgba(236,72,153,0.6)]`}
            >
              {t("homepage.phase2_book_seat")}
            </button>
          </div>
        </section>

        {/* Films */}
        <section className="py-32 bg-[#0a0a0f]">
          <div className={container}>
            <div className="text-center mb-16">
              <div
                className={`${badge} bg-[#a855f7]/20 border border-[#a855f7]/50 text-[#a855f7] mb-6`}
              >
                {t("homepage.phase2_finalists")}
              </div>
              <h2 className={h2Style}>
                {t("homepage.phase2_official_selection")}
                <br />
                <span className="text-[#a855f7] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  {t("homepage.phase2_official_selection_year")}
                </span>
              </h2>
              <p className="text-[#a0a0b8] text-lg max-w-3xl mx-auto">
                {t("homepage.phase2_selection_description")}
                <br />
                {t("homepage.phase2_selection_description_2")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {films.map((f, i) => (
                <div key={i} className="group">
                  <div className="w-full aspect-video rounded-3xl mb-4 relative overflow-hidden group-hover:shadow-[0_30px_80px_rgba(168,85,247,0.4)] transition-all duration-300 group-hover:scale-[1.02]">
                    <iframe
                      className="w-full h-full rounded-3xl"
                      src="https://www.youtube.com/embed/GwaRztMaoY0?si=lEsL-3XSi3un1keN"
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-[#10b981]/90 backdrop-blur-sm rounded-full text-white text-xs font-inter font-semibold pointer-events-none">
                      {t("homepage.phase2_official_badge")}
                    </div>
                  </div>
                  <h3 className="font-orbitron font-bold text-xl leading-tight whitespace-pre-line mb-2 text-white">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#a0a0b8]">{f.country}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                className={`px-10 py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white ${btn} ${btnHover} hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)]`}
              >
                {t("homepage.phase2_view_50_films")}
              </button>
            </div>
          </div>
        </section>

        {/* Practical Info */}
        <section className="py-32 bg-[#0a0a0f]">
          <div className={container}>
            <h2 className={`${h2Style} text-center mb-16`}>
              {t("homepage.phase2_practical_info")}
              <br />
              <span className="text-[#3b82f6] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                {t("homepage.phase2_practical_info_2")}
              </span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className={`${card} p-10 border-white/5`}>
                <h3 className="font-orbitron font-bold text-2xl mb-6 text-[#3b82f6]">
                  {t("homepage.phase2_platform")}
                </h3>
                <div className="space-y-4 text-[#a0a0b8]">
                  {[
                    "phase2_address",
                    "phase2_tram",
                    "phase2_parking",
                    "phase2_accessibility",
                  ].map((k) => (
                    <p key={k}>{t(k)}</p>
                  ))}
                </div>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 w-full px-6 py-3 bg-[#3b82f6]/20 border border-[#3b82f6]/50 text-[#3b82f6] ${btn} hover:bg-[#3b82f6] hover:text-white block text-center`}
                >
                  {t("homepage.phase2_view_map")}
                </a>
              </div>
              <div className="space-y-6">
                {[
                  {
                    titleKey: "venue_room_1_title",
                    descKey: "phase2_sugar_hall_desc",
                    capKey: "phase2_sugar_hall_capacity",
                    color: "text-[#10b981]",
                    bg: `${card} border-white/5`,
                  },
                  {
                    titleKey: "venue_room_2_title",
                    descKey: "phase2_plaza_hall_desc",
                    capKey: "phase2_plaza_hall_capacity",
                    color: "text-[#ec4899]",
                    bg: `${card} border-white/5`,
                  },
                  {
                    titleKey: "phase2_free_entry",
                    descKey: "phase2_free_entry_desc",
                    capKey: "phase2_free_entry_desc_2",
                    color: "text-white",
                    bg: "bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 rounded-3xl border border-[#a855f7]/30",
                  },
                ].map((r, i) => (
                  <div key={i} className={`${r.bg} p-8`}>
                    <h4
                      className={`font-orbitron font-bold text-xl mb-3 ${r.color}`}
                    >
                      {t(r.titleKey)}
                    </h4>
                    <p className="text-sm text-[#a0a0b8] leading-relaxed">
                      {t(r.descKey)}
                      <br />
                      {t(r.capKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social */}
        <section className="py-20 bg-gradient-to-br from-[#1a0a2e] to-[#050508]">
          <div className={container}>
            <div className="text-center mb-12">
              <h2 className="font-orbitron font-black text-4xl mb-4 text-white">
                {t("homepage.phase2_follow_live")}{" "}
                <span className="text-[#ec4899]">
                  {t("homepage.phase2_follow_live_2")}
                </span>
              </h2>
              <p className="text-[#a0a0b8]">
                {t("homepage.phase2_join_conversation")}
              </p>
            </div>
            <div className="flex justify-center gap-6 flex-wrap">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className={`px-8 py-4 bg-gradient-to-r ${s.color} text-white ${btn} tracking-wider ${btnHover} hover:shadow-[0_15px_40px_rgba(168,85,247,0.3)]`}
                >
                  <div className="text-xs opacity-80">{s.name}</div>
                  <div className="font-bold">{s.handle}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default HomepagePhase2;
