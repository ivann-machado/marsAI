import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
import {
  countryListEn,
  countryListFr,
} from "../../components/Utils/CountryList";

const PlayIcon = ({ size = 5, className = "" }) => (
  <svg
    className={`w-${size} h-${size} ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
  );

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-64 animate-pulse">
    <div className="aspect-video rounded-2xl bg-white/10 mb-3" />
    <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
    <div className="h-3 bg-white/10 rounded w-1/2" />
  </div>
  );

function Gallery() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [filmIndex, setFilmIndex] = useState(0);
  const [sortBy, setSortBy] = useState("title");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(50);
  const sliderRef = useRef(null);
  const loaderRef = useRef(null);
  const [FILMS, setFilms] = useState([]);
  // const [filmsPage, setFilmsPage] = useState(1);
  // const [filmsPages, setFilmsPages] = useState(1);
  // const [filmsTotal, setFilmsTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/videos/?limit=50",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
          );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setFilms(res.data);
        // setFilmsPages(res.meta.totalPages);
        // setFilmsTotal(res.meta.totalCount);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  const categories = [
    { id: "all", name: t("gallery.gallery_filter_all") },
    { id: "selection", name: t("gallery.gallery_filter_selection") },
    { id: "hors-competition", name: t("gallery.gallery_filter_hors") },
  ];

  const sortOptions = [
    { id: "title", name: t("gallery.gallery_filter_title") },
    { id: "title-desc", name: t("gallery.gallery_filter_title_desc") },
    /*    { id: "duration", name: t("gallery.gallery_filter_duration_asc") },
    { id: "duration-desc", name: t("gallery.gallery_filter_duration_desc") }, */
    { id: "year", name: t("gallery.gallery_filter_year") },
    { id: "country", name: t("gallery.gallery_filter_country") },
  ];

  const stats = [1, 2, 3, 4].map((i) => ({
    num: t(`gallery.gallery_stat_${i}`),
    label: t(`gallery.gallery_stat_${i}_label`),
  }));

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [category, search, sortBy]);

  // Infinite scroll observer
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && visibleCount < FILMS.length) {
        setVisibleCount((prev) => Math.min(prev + 3, FILMS.length));
      }
    },
    [visibleCount],
    );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  // Filter and sort films
  const films = FILMS.filter((f) => {
    const q = search.toLowerCase();
    return (
      (category === "all" || f.category === category) &&
      (!search ||
        [f.title, f.director, f.country, f.description].some((s) =>
          (s || "").toLowerCase().includes(q),
          ))
      );
  }).sort((a, b) => {
    switch (sortBy) {
    case "title":
      return a.title.localeCompare(b.title);
    case "title-desc":
      return b.title.localeCompare(a.title);
      /* case "duration":
        return a.duration.localeCompare(b.duration);
      case "duration-desc":
        return b.duration.localeCompare(a.duration); */
    case "year":
      return a.year - b.year;
    case "country":
      return a.country_id - b.country_id;
    default:
      return 0;
    }
  });

  const visibleFilms = films.slice(0, visibleCount);
  const film = films[filmIndex] || films[0];
  const scroll = (dir) =>
  sliderRef.current?.scrollBy({
    left: dir === "left" ? -300 : 300,
    behavior: "smooth",
  });

  // if (FILMS) console.log(FILMS);
  return (
    <>
    <meta
      name="description"
      content="Dans notre gallerie vous pourrez regarder tous les films qui ont été sélectionnés durant le festival aisément grâce à un système de filtrage et de recherche efficace"
    />
    <Header />
    <div className="w-full overflow-hidden bg-[#050508] min-h-screen">
        {/* Hero */}
      <section className="relative py-32 px-10 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#050508] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(236,72,153,0.15)_0%,transparent_70%)] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative z-5 text-center">
          <div className="text-[#06b6d4] text-xs tracking-[3px] uppercase mb-6 font-inter">
            {t("gallery.gallery_badge")}
          </div>
          <h1 className="font-orbitron font-black text-[clamp(48px,10vw,120px)] leading-[0.9] mb-6">
            <span className="bg-gradient-to-br from-white to-[#e0e0ff] bg-clip-text text-transparent">
              {t("gallery.gallery_title")}
            </span>
            <br />
            <span className="bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.8)]">
              {t("gallery.gallery_title_highlight")}
            </span>
          </h1>
          <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto">
            {t("gallery.gallery_description")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <div className="font-orbitron font-black text-3xl text-[#ec4899] mb-2">
                  {s.num}
                </div>
                <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                  {s.label}
                </div>
              </div>
              ))}
          </div>
        </div>
      </section>

        {/* Filtres */}
      <section className="py-12 bg-[#0a0a0f] sticky top-0 z-7 border-b border-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-10">
          <div className="max-w-2xl mx-auto mb-8 relative">
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b85]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                t("gallery.gallery_search_placeholder") || "Rechercher..."
              }
              className="w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-[#6b6b85] font-inter focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#6b6b85] hover:text-white"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              )}
          </div>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-6 py-3 rounded-full font-inter font-semibold text-sm tracking-wider uppercase transition-all ${category === c.id ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_30px_rgba(168,85,247,0.3)]" : "text-[#a0a0b8] border border-white/20 hover:border-[#a855f7] hover:text-white"}`}
              >
                {c.name}
              </button>
              ))}
            <div className="h-8 w-px bg-white/20 mx-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/20 rounded-full text-white text-sm font-inter focus:outline-none focus:border-[#a855f7] cursor-pointer"
            >
              {sortOptions.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#0a0a0f]">
                  {s.name}
                </option>
                ))}
            </select>
          </div>
          <p className="text-center mt-6 text-sm text-[#6b6b85] font-inter">
            {films.length} {t("gallery.gallery_films_found")}
          </p>
        </div>
      </section>

        {/* Carrousel */}
      <section className="py-12 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-10">
            {/* Film principal */}
          {film && (
            <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
              <Link
                to={`/video/${film.id}`}
                className="w-full lg:w-2/3 group"
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#1a1a24] shadow-[0_20px_60px_rgba(168,85,247,0.3)]">
                  <img
                    src={film.cover_image}
                    alt={film.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 group-hover:scale-110 group-hover:bg-[#a855f7]/50 transition-all">
                      <PlayIcon size={10} className="ml-1" />
                    </div>
                  </div>
                    {/*  <div className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-inter font-semibold">
                      {film.duration}
                    </div> */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-[#a855f7]/80 backdrop-blur-sm rounded-full text-white text-sm font-inter font-semibold uppercase">
                    {
                      categories
                      .find((c) => c.id === film.category)
                      ?.name.split(" ")[0]
                    }
                  </div>
                </div>
              </Link>
              <div className="w-full lg:w-1/3 space-y-6">
                <span className="text-[#a855f7] text-sm font-inter font-semibold uppercase tracking-wider">
                  Film sélectionné • {filmIndex + 1}/{films.length}
                </span>
                <h2 className="font-orbitron font-black text-4xl lg:text-5xl text-white leading-tight">
                  {film.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-[#a0a0b8]">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {film.producer}
                  </span>
                  <span>•</span>
                  <span
                    className={`fi fi-2x fi-${
                      language === "fr"
                      ? countryListFr[film.country_id - 1].iso.toLowerCase()
                      : countryListEn[film.country_id - 1].iso.toLowerCase()
                    }`}
                  ></span>
                    <span>•</span>
                    <span>
                      {" "}
                      {language === "fr"
                      ? countryListFr[film.country_id - 1].label
                      : countryListEn[film.country_id - 1].label}
                    </span>
                  </div>
                  <p className="text-[#a0a0b8] text-lg leading-relaxed">
                    {film.description}
                  </p>
                  <Link
                    to={`/video/${film.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all"
                  >
                    <PlayIcon /> {t("gallery.gallery_watch_film")}
                  </Link>
                </div>
              </div>
              )}

            {/* Slider */}
<div>
  <div className="flex items-center justify-between mb-6">
    <h3 className="font-orbitron font-bold text-xl text-white">
      {t("gallery.gallery_all_movie")} ({films.length})
    </h3>
    <div className="flex gap-2">
      {["left", "right"].map((dir) => (
        <button
          key={dir}
          onClick={() => scroll(dir)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#a855f7] flex items-center justify-center text-white transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"
              }
            />
          </svg>
        </button>
        ))}
    </div>
  </div>
  <div
    ref={sliderRef}
    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
    style={{ scrollbarWidth: "none" }}
  >
    {loading
    ? [...Array(5)].map((_, i) => <SkeletonCard key={i} />)
    : visibleFilms.map((f, i) => (
      <div
        key={f.id}
        onClick={() => setFilmIndex(i)}
        className={`flex-shrink-0 w-64 cursor-pointer transition-all ${filmIndex === i ? "scale-105 opacity-100" : "opacity-60 hover:opacity-100"}`}
      >
        <div
          className={`relative aspect-video rounded-2xl overflow-hidden mb-3 ${filmIndex === i ? "ring-4 ring-[#a855f7] shadow-[0_0_30px_rgba(168,85,247,0.5)]" : "hover:ring-2 hover:ring-white/30"}`}
        >
          <img
            src={f.cover_image}
            alt={f.title}
            className="w-full h-full object-cover"
          />
          {filmIndex === i && (
            <div className="absolute inset-0 bg-[#a855f7]/20 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <PlayIcon className="text-[#a855f7] ml-0.5" />
              </div>
            </div>
            )}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
            {f.duration}
          </div>
        </div>
        <h4
          className={`font-orbitron font-bold text-sm truncate ${filmIndex === i ? "text-[#a855f7]" : "text-white"}`}
        >
          {f.title}
        </h4>
        <p className="text-xs text-[#6b6b85] truncate">
          {f.director}
        </p>
      </div>
      ))}
  </div>
              {/* Infinite scroll trigger */}
  {visibleCount < films.length && (
    <div ref={loaderRef} className="flex justify-center py-8">
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-[#a855f7] animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
            />
            ))}
      </div>
    </div>
    )}
</div>

            {/* État vide */}
{films.length === 0 && (
  <div className="text-center py-20">
    <div className="text-6xl mb-6"></div>
    <h3 className="font-orbitron font-bold text-2xl text-[#a0a0b8] mb-4">
      {t("gallery.gallery_empty_title")}
    </h3>
    <p className="text-[#6b6b85]">
      {t("gallery.gallery_empty_desc")}
    </p>
  </div>
  )}
</div>
</section>
</div>
<Footer />
</>
);
}

export default Gallery;
