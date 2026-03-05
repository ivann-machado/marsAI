import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSettings } from "../../context/SettingsContext";
import i18n from "../../config/i18n";

function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const settings = useSettings();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  let navLinks = [];
  if (settings.phase === "1")
    navLinks = [
      { to: "/", label: t("header.home") },
      { to: "/participate", label: t("header.participate") },
      { to: "/jury", label: t("header.board") },
      { to: "/partners", label: t("header.partners") },
      { to: "/contact", label: t("header.contact") },
      { to: "/event", label: t("header.event") },
    ];
  else
    navLinks = [
      { to: "/", label: t("header.home") },
      { to: "/gallery", label: t("header.gallery") },
      { to: "/jury", label: t("header.board") },
      { to: "/partners", label: t("header.partners") },
      { to: "/contact", label: t("header.contact") },
      { to: "/event", label: t("header.event") },
    ];

  const isActive = (path) => location.pathname === path;

  const [currentLang, setCurrentLang] = useState(i18n.language);

  useEffect(() => {
    const onChange = (lng) => setCurrentLang(lng);
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, []);

  const toggleLanguage = () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  if (!settings) return <Loading />;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050508]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(168,85,247,0.15)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <span className="font-orbitron font-black text-2xl md:text-3xl tracking-tight">
            <span className="bg-gradient-to-br from-white to-[#e0e0ff] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all">
              MARS
            </span>
            <span className="bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(236,72,153,0.6)] group-hover:drop-shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all">
              AI
            </span>
          </span>
        </Link>
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative px-4 py-2 font-inter font-medium text-sm tracking-wide transition-all duration-300 rounded-full ${
                  isActive(link.to)
                    ? "text-white bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20"
                    : "text-[#a0a0b8] hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            aria-label="Toggle language"
          >
            <span
              className={`font-inter font-semibold text-sm transition-all ${
                currentLang === "fr" ? "text-white" : "text-[#a0a0b8]"
              }`}
            >
              FR
            </span>
            <span className="text-[#a0a0b8] text-xs">/</span>
            <span
              className={`font-inter font-semibold text-sm transition-all ${
                currentLang === "en" ? "text-white" : "text-[#a0a0b8]"
              }`}
            >
              EN
            </span>
          </button>

          <Link
            to="/participate"
            className="px-6 py-2.5 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
          >
            {t("header.participate")}
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-gradient-to-r from-[#a855f7] to-[#ec4899] rounded-full transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#050508]/95 backdrop-blur-xl"
          onClick={toggleMenu}
        />

        <div
          className={`relative h-full flex flex-col items-center justify-center transition-all duration-500 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          {isOpen && (
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors lg:hidden"
              aria-label="Close menu"
            >
              <span className="text-white text-xl font-bold leading-none">
                ×
              </span>
            </button>
          )}
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-[#a855f7]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-[#ec4899]/20 rounded-full blur-3xl" />

          <ul className="flex flex-col items-center gap-6 relative z-10">
            {navLinks.map((link, index) => (
              <li
                key={link.to}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`transition-all duration-300 ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                <Link
                  to={link.to}
                  onClick={toggleMenu}
                  className={`font-orbitron font-bold text-2xl md:text-3xl transition-all duration-300 ${
                    isActive(link.to)
                      ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
                      : "text-white hover:text-[#a855f7]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleLanguage}
            className={`mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 transition-all duration-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: `${navLinks.length * 50}ms` }}
          >
            <span
              className={`font-inter font-bold text-lg transition-all ${
                currentLang === "fr" ? "text-white" : "text-[#a0a0b8]"
              }`}
            >
              FR
            </span>
            <span className="text-[#a0a0b8]">/</span>
            <span
              className={`font-inter font-bold text-lg transition-all ${
                currentLang === "en" ? "text-white" : "text-[#a0a0b8]"
              }`}
            >
              EN
            </span>
          </button>

          <Link
            to="/participate"
            onClick={toggleMenu}
            className={`mt-4 px-8 py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-inter font-bold text-base tracking-wide rounded-full transition-all duration-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]`}
            style={{ transitionDelay: `${(navLinks.length + 1) * 50}ms` }}
          >
            {t("header.participate")}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
