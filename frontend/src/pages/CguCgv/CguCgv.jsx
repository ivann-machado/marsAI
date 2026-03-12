import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function CguCgv() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />

      <main className="w-full bg-[#050508] text-white overflow-hidden">
        {/* Background */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          {/* Gradient moving background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(168,85,247,0.35) 0%, transparent 50%), linear-gradient(225deg, rgba(236,72,153,0.30) 0%, transparent 50%)",
              transform: `translateY(${scrollY * 0.25}px)`,
            }}
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f80] via-[#0a0a0fcc] to-[#050508]" />

          {/* glow lights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.15)_0%,transparent_50%)] animate-pulse" />

          <div className="relative z-10 w-full max-w-5xl mx-auto">
            {/* HERO */}
            <div className="text-center mb-16">
              <p className="text-xs md:text-sm font-semibold text-pink-400 tracking-[0.3em] mb-3 uppercase">
                {t("CguCgv_page.hero_badge")}
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  {t("CguCgv_page.hero_title")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                  {t("CguCgv_page.hero_title_highlight")}
                </span>
              </h1>

              <p className="text-gray-300 mt-6 text-base md:text-lg max-w-2xl mx-auto">
                {t("CguCgv_page.hero_description")}
              </p>
            </div>

            {/* CGU */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-8 md:p-10 mb-10 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                {t("CguCgv_page.cgu_title")}
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{t("CguCgv_page.cgu_intro")}</p>

                <p className="font-semibold text-white">
                  {t("CguCgv_page.cgu_section1_title")}
                </p>

                <p>{t("CguCgv_page.cgu_section1_content")}</p>

                <p className="font-semibold text-white pt-2">
                  {t("CguCgv_page.cgu_section2_title")}
                </p>

                <p>{t("CguCgv_page.cgu_section2_content")}</p>
              </div>
            </div>

            {/* CGV */}
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-8 md:p-10 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                {t("CguCgv_page.cgv_title")}
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>{t("CguCgv_page.cgv_intro")}</p>

                <p className="font-semibold text-white">
                  {t("CguCgv_page.cgv_section1_title")}
                </p>

                <p>{t("CguCgv_page.cgv_section1_content")}</p>

                <p className="font-semibold text-white pt-2">
                  {t("CguCgv_page.cgv_section2_title")}
                </p>

                <p>{t("CguCgv_page.cgv_section2_content")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CguCgv;
