import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";

const btn =
  "font-inter font-semibold text-sm tracking-wider uppercase rounded-full transition-all duration-300";
const btnHover = "hover:translate-y-[-3px]";
const card = "bg-[#1a1a24] rounded-3xl border border-white/5";
const badge =
  "inline-block px-6 py-2 rounded-full font-inter font-semibold text-sm tracking-wider uppercase";
const container = "max-w-7xl mx-auto px-10";
const h2Style =
  "font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight mb-6 text-white";

function Homepage() {
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
    const festivalDate = new Date("2026-06-12T09:00:00");
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = festivalDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="w-full overflow-hidden bg-[#050508]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(168,85,247,0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.3) 0%, transparent 50%)`,
              backgroundSize: "cover",
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f80] via-[#0a0a0fcc] to-[#050508]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)] animate-pulse" />

          <div className="relative z-10 text-center px-4">
            {/* Countdown Timer */}
            <div className="mb-10">
              <p className="text-[#ec4899] font-inter font-semibold text-sm tracking-[3px] uppercase mb-4">
                {t("homepage.countdown_label")}
              </p>
              <div className="flex justify-center gap-4 md:gap-6">
                {[
                  { value: timeLeft.days, label: t("homepage.countdown_days") },
                  {
                    value: timeLeft.hours,
                    label: t("homepage.countdown_hours"),
                  },
                  {
                    value: timeLeft.minutes,
                    label: t("homepage.countdown_minutes"),
                  },
                  {
                    value: timeLeft.seconds,
                    label: t("homepage.countdown_seconds"),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-orbitron font-black text-2xl md:text-3xl text-white">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[#d1d5db] text-xs mt-2 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${badge} bg-white/10 border border-white/20 text-white mb-8`}
            >
              {t("homepage.hero_badge")}
            </div>
            <h1 className="font-orbitron font-black text-[clamp(60px,12vw,140px)] leading-[0.9] mb-5 tracking-[-2px] uppercase">
              <span className="bg-gradient-to-br from-white to-[#e0e0ff] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                MARS
              </span>
              <span className="bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.8)]">
                AI
              </span>
            </h1>
            <p className="font-orbitron font-semibold text-[clamp(20px,3vw,36px)] mb-6 text-white">
              {t("homepage.hero_tagline")}{" "}
              <span className="text-[#10b981]">
                {t("homepage.hero_tagline_highlight")}
              </span>{" "}
              {t("homepage.hero_tagline_end")}
            </p>
            <p className="text-[clamp(14px,2vw,18px)] text-[#d1d5db] mb-3 max-w-3xl mx-auto">
              {t("homepage.hero_description")}
            </p>
            <p className="text-[#b8b8d0] mb-8">
              {t("homepage.hero_subdescription")}
            </p>
          </div>
        </section>

        {/* Features Cards */}
        <section className="py-8 bg-gradient-to-r from-[#1a0a2e] via-[#0a0a0f] to-[#1a0a2e] border-y border-[#a855f7]/30">
          <div className={container}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <h3 className="font-orbitron font-black text-2xl mb-1 text-white">
                  {t("homepage.feature_1_title")}
                </h3>
                <p className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.feature_1_desc")}
                </p>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-2xl mb-1 text-[#10b981]">
                  {t("homepage.feature_2_title")}
                </h3>
                <p className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.feature_2_desc")}
                </p>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-2xl mb-1 text-[#ec4899]">
                  {t("homepage.feature_3_title")}
                </h3>
                <p className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.feature_3_desc")}
                </p>
              </div>
              <div>
                <h3 className="font-orbitron font-black text-2xl mb-1 text-[#06b6d4]">
                  {t("homepage.feature_4_title")}
                </h3>
                <p className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.feature_4_desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-32 bg-gradient-to-br from-[#050508] to-[#1a0a2e] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]" />
          <div className={`${container} relative z-10`}>
            <h2 className={`${h2Style} text-center mb-16`}>
              {t("homepage.objectives_title")}{" "}
              <span className="text-[#ec4899] drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                {t("homepage.objectives_title_highlight")}
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={`${card} p-10 text-center border-[#10b981]/30 hover:border-[#10b981]/50 transition-all duration-300 hover:translate-y-[-5px]`}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#10b981]/20 text-[#10b981]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl mb-4 text-[#10b981] whitespace-pre-line">
                  {t("homepage.objective_1_title")}
                </h3>
                <p className="text-[#d1d5db] text-sm leading-relaxed">
                  {t("homepage.objective_1_desc")}
                </p>
              </div>

              <div
                className={`${card} p-10 text-center border-[#3b82f6]/30 hover:border-[#3b82f6]/50 transition-all duration-300 hover:translate-y-[-5px]`}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#3b82f6]/20 text-[#3b82f6]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl mb-4 text-[#3b82f6] whitespace-pre-line">
                  {t("homepage.objective_2_title")}
                </h3>
                <p className="text-[#d1d5db] text-sm leading-relaxed">
                  {t("homepage.objective_2_desc")}
                </p>
              </div>

              <div
                className={`${card} p-10 text-center border-[#a855f7]/30 hover:border-[#a855f7]/50 transition-all duration-300 hover:translate-y-[-5px]`}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#a855f7]/20 text-[#a855f7]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="font-orbitron font-bold text-xl mb-4 text-[#a855f7] whitespace-pre-line">
                  {t("homepage.objective_3_title")}
                </h3>
                <p className="text-[#d1d5db] text-sm leading-relaxed">
                  {t("homepage.objective_3_desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call for Films Section */}
        <section className="py-32 bg-gradient-to-br from-[#0a0a0f] to-[#1a0a2e] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1)_0%,transparent_50%)]" />
          <div className={`${container} relative z-10`}>
            <div className="text-center mb-16">
              <div
                className={`${badge} bg-[#f97316]/20 border border-[#f97316]/50 text-[#f97316] mb-8`}
              >
                {t("homepage.callforfilms_badge")}
              </div>
              <h2 className={h2Style}>
                {t("homepage.callforfilms_title")}{" "}
                <span className="text-[#f97316] drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                  {t("homepage.callforfilms_title_highlight")}
                </span>
              </h2>
              <p className="text-[#d1d5db] text-lg max-w-3xl mx-auto">
                {t("homepage.callforfilms_description")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div
                className={`${card} p-8 text-center border-[#f97316]/30 hover:border-[#f97316]/50 transition-all duration-300`}
              >
                <div className="font-orbitron font-black text-5xl text-[#f97316] mb-4">
                  60s
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2 text-white">
                  {t("homepage.callforfilms_constraint_1_title")}
                </h3>
                <p className="text-[#d1d5db] text-sm">
                  {t("homepage.callforfilms_constraint_1_desc")}
                </p>
              </div>
              <div
                className={`${card} p-8 text-center border-[#10b981]/30 hover:border-[#10b981]/50 transition-all duration-300`}
              >
                <div className="font-orbitron font-black text-5xl text-[#10b981] mb-4">
                  IA
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2 text-white">
                  {t("homepage.callforfilms_constraint_2_title")}
                </h3>
                <p className="text-[#d1d5db] text-sm">
                  {t("homepage.callforfilms_constraint_2_desc")}
                </p>
              </div>
              <div
                className={`${card} p-8 text-center border-[#3b82f6]/30 hover:border-[#3b82f6]/50 transition-all duration-300`}
              >
                <div className="font-orbitron font-black text-5xl text-[#3b82f6] mb-4">
                  2
                </div>
                <h3 className="font-orbitron font-bold text-lg mb-2 text-white">
                  {t("homepage.callforfilms_constraint_3_title")}
                </h3>
                <p className="text-[#d1d5db] text-sm">
                  {t("homepage.callforfilms_constraint_3_desc")}
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/participate"
                className={`px-10 py-4 bg-gradient-to-r from-[#f97316] to-[#ec4899] text-white ${btn} ${btnHover} hover:shadow-[0_15px_40px_rgba(249,115,22,0.4)]`}
              >
                {t("homepage.callforfilms_cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* AI Tools Section */}
        <section className="py-32 bg-[#0a0a0f]">
          <div className={container}>
            <div className="text-center mb-16">
              <div
                className={`${badge} bg-[#a855f7]/20 border border-[#a855f7]/50 text-[#a855f7] mb-8`}
              >
                {t("homepage.aitools_badge")}
              </div>
              <h2 className={h2Style}>
                {t("homepage.aitools_title")}{" "}
                <span className="text-[#a855f7] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  {t("homepage.aitools_title_highlight")}
                </span>
              </h2>
              <p className="text-[#d1d5db] text-lg max-w-3xl mx-auto">
                {t("homepage.aitools_description")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { icon: "📝", key: "scenario", color: "#ec4899" },
                { icon: "🎨", key: "image", color: "#a855f7" },
                { icon: "🎬", key: "video", color: "#3b82f6" },
                { icon: "🎵", key: "sound", color: "#10b981" },
                { icon: "✨", key: "postprod", color: "#06b6d4" },
              ].map((tool, index) => (
                <div
                  key={index}
                  className={`${card} p-6 text-center border-white/10 hover:border-[${tool.color}]/50 transition-all duration-300 hover:translate-y-[-5px]`}
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="font-orbitron font-bold text-sm text-white">
                    {t(`homepage.aitools_${tool.key}`)}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Protocol Section */}
        <section className="py-32 bg-[#0a0a0f]">
          <div className="max-w-5xl mx-auto px-10 text-center">
            <div className="mb-12">
              <div
                className={`${badge} bg-[#ec4899]/20 border border-[#ec4899]/50 text-[#ec4899] mb-8`}
              >
                {t("homepage.protocol_badge")}
              </div>
              <h2 className="font-orbitron font-black text-[clamp(32px,6vw,56px)] leading-tight mb-6 text-white whitespace-pre-line">
                {t("homepage.protocol_title")}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className={`${card} p-8 border-[#ec4899]/30`}>
                <div className="font-orbitron font-black text-4xl text-[#ec4899] mb-2">
                  {t("homepage.protocol_stat_1")}
                </div>
                <div className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.protocol_stat_1_label")}
                </div>
              </div>
              <div className={`${card} p-8 border-[#10b981]/30`}>
                <div className="font-orbitron font-black text-4xl text-[#10b981] mb-2">
                  {t("homepage.protocol_stat_2")}
                </div>
                <div className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.protocol_stat_2_label")}
                </div>
              </div>
              <div className={`${card} p-8 border-[#06b6d4]/30`}>
                <div className="font-orbitron font-black text-4xl text-[#06b6d4] mb-2">
                  {t("homepage.protocol_stat_4")}
                </div>
                <div className="text-xs text-[#d1d5db] tracking-wider uppercase">
                  {t("homepage.protocol_stat_4_label")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Section */}
        <section className="py-32 bg-[#0a0a0f]">
          <div className={container}>
            <div className="mb-16">
              <div
                className={`${badge} bg-[#3b82f6]/20 border border-[#3b82f6]/50 text-[#3b82f6] mb-8`}
              >
                {t("homepage.venue_badge")}
              </div>
              <h2 className={h2Style}>
                {t("homepage.venue_title")}
                <span className="text-[#3b82f6] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  {t("homepage.venue_title_highlight")}
                </span>
              </h2>
              <div className="flex flex-col md:flex-row gap-8 text-[#d1d5db]">
                <div className="whitespace-pre-line">
                  {t("homepage.venue_location_1")}
                </div>
                <div className="whitespace-pre-line">
                  {t("homepage.venue_location_2")}
                </div>
                <div>{t("homepage.venue_location_3")}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div
                  className={`${card} p-10 border-[#10b981]/30 hover:border-[#10b981]/50 transition-all duration-300 hover:translate-y-[-5px]`}
                >
                  <h3 className="font-orbitron font-bold text-2xl mb-4 text-[#10b981]">
                    {t("homepage.venue_room_1_title")}
                  </h3>
                  <p className="text-[#d1d5db] leading-relaxed">
                    {t("homepage.venue_room_1_desc")}
                  </p>
                </div>

                <div
                  className={`${card} p-10 border-[#ec4899]/30 hover:border-[#ec4899]/50 transition-all duration-300 hover:translate-y-[-5px]`}
                >
                  <h3 className="font-orbitron font-bold text-2xl mb-4 text-[#ec4899]">
                    {t("homepage.venue_room_2_title")}
                  </h3>
                  <p className="text-[#d1d5db] leading-relaxed">
                    {t("homepage.venue_room_2_desc")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-full min-h-[400px] rounded-3xl overflow-hidden border border-[#3b82f6]/30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.1234567890123!2d5.3662017!3d43.3141763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0c6c8c8c8c8%3A0x123456789abcdef!2s%C3%89cole%20La%20Plateforme_%20Marseille%20-%20Entr%C3%A9e%20Sud!5e0!3m2!1sfr!2sfr!4v1234567890123!5m2!1sfr!2sfr"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="La Plateforme Marseille"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/place/École+La+Plateforme_+Marseille+-+Entrée+Sud/@43.3141763,5.3662017,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center px-6 py-4 bg-[#3b82f6]/20 border border-[#3b82f6]/50 text-[#3b82f6] ${btn} hover:bg-[#3b82f6] hover:text-white transition-all duration-300`}
                >
                  {t("homepage.venue_view_map")}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="relative z-10 py-32 bg-gradient-to-br from-[#050508] via-[#0a0a0f] to-[#1a0a2e] overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,transparent_70%)] blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-10 relative z-10">
            <div className="mb-20">
              <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight mb-3 text-white">
                {t("homepage.stats_title")}
                <br />
                <span className="text-[#ec4899] drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                  {t("homepage.stats_title_highlight")}
                </span>
              </h2>
              <p className="text-sm text-[#d1d5db] tracking-[2px] uppercase">
                {t("homepage.stats_subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl">
              {[
                {
                  number: t("homepage.stats_countries"),
                  label: t("homepage.stats_countries_label"),
                  borderGlow:
                    "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]",
                  colors: "from-[#a855f7] to-[#ec4899]",
                },
                {
                  number: t("homepage.stats_films"),
                  label: t("homepage.stats_films_label"),
                  borderGlow:
                    "group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]",
                  colors: "from-[#ec4899] to-[#f97316]",
                },
                {
                  number: t("homepage.stats_visitors"),
                  label: t("homepage.stats_visitors_label"),
                  borderGlow:
                    "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
                  colors: "from-[#10b981] to-[#06b6d4]",
                },
                {
                  number: t("homepage.stats_experts"),
                  label: t("homepage.stats_experts_label"),
                  borderGlow:
                    "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]",
                  colors: "from-[#3b82f6] to-[#a855f7]",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all duration-500 hover:translate-y-[-8px]"
                  style={{
                    background: `linear-gradient(135deg, #1a1a24 0%, #2a1a34 100%)`,
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.borderGlow}`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`font-orbitron font-black text-[clamp(40px,6vw,70px)] mb-2 bg-gradient-to-br ${stat.colors} bg-clip-text text-transparent`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-xs text-[#d1d5db] tracking-[2px] uppercase font-inter font-semibold">
                      {stat.label}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl"></div>
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Link Section */}
        <section className="py-20 bg-[#0a0a0f]">
          <div className={container}>
            <div className="text-center">
              <p className="text-[#d1d5db] text-lg mb-6">
                {t("homepage.partners_link_text")}
              </p>
              <Link
                to="/partners"
                className={`px-10 py-4 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white ${btn} ${btnHover} hover:shadow-[0_15px_40px_rgba(6,182,212,0.4)]`}
              >
                {t("homepage.partners_link_cta")}
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
