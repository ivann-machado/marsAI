import { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from "react-i18next";
function Gallery() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: t("gallery.gallery_filter_all") },
    { id: "selection", name: t("gallery.gallery_filter_selection") },
    { id: "hors-competition", name: t("gallery.gallery_filter_hors") },
  ];

  const films = [
    {
      id: 1,
      title: "PROTOCOL ALPHA",
      director: "Jean Dupont",
      duration: "00:58",
      category: "selection",
      thumbnail: "gradient-purple",
      year: 2026,
      country: "France",
      description:
        "Une exploration visuelle des protocoles d'intelligence artificielle dans un futur dystopique.",
    },
    {
      id: 2,
      title: "NEURAL DREAM",
      director: "Marie Laurent",
      duration: "00:45",
      category: "selection",
      thumbnail: "gradient-pink",
      year: 2026,
      country: "Belgique",
      description:
        "Un voyage onirique à travers les réseaux neuronaux d'une IA consciente.",
    },
    {
      id: 3,
      title: "CYBER MARSEILLE",
      director: "Ahmed Karim",
      duration: "00:52",
      category: "hors-competition",
      thumbnail: "gradient-rainbow",
      year: 2026,
      country: "France",
      description:
        "Marseille reimaginée dans un futur où l'IA transforme la ville portuaire.",
    },
    {
      id: 4,
      title: "DIGITAL HORIZON",
      director: "Sofia Chen",
      duration: "00:48",
      category: "selection",
      thumbnail: "gradient-blue",
      year: 2026,
      country: "Chine",
      description:
        "Les frontières entre réalité et simulation s'estompent dans cette œuvre contemplative.",
    },
    {
      id: 5,
      title: "QUANTUM SOULS",
      director: "Marcus Brown",
      duration: "00:55",
      category: "selection",
      thumbnail: "gradient-green",
      year: 2026,
      country: "USA",
      description:
        "Une méditation sur la conscience artificielle et l'âme humaine.",
    },
    {
      id: 6,
      title: "NEON GENESIS",
      director: "Yuki Tanaka",
      duration: "00:50",
      category: "selection",
      thumbnail: "gradient-orange",
      year: 2026,
      country: "Japon",
      description:
        "La naissance d'une nouvelle ère à travers les yeux d'une IA créative.",
    },
    {
      id: 7,
      title: "SYNTHETIC LOVE",
      director: "Emma Wilson",
      duration: "00:47",
      category: "hors-competition",
      thumbnail: "gradient-rose",
      year: 2026,
      country: "UK",
      description:
        "Une histoire d'amour impossible entre humain et intelligence artificielle.",
    },
    {
      id: 8,
      title: "CODE POETRY",
      director: "Lars Schmidt",
      duration: "00:43",
      category: "hors-competition",
      thumbnail: "gradient-teal",
      year: 2026,
      country: "Allemagne",
      description:
        "Le code informatique devient poésie visuelle dans cette expérience unique.",
    },
    {
      id: 9,
      title: "FUTURE MEMORIES",
      director: "Isabella Rodriguez",
      duration: "00:59",
      category: "hors-competition",
      thumbnail: "gradient-violet",
      year: 2026,
      country: "Espagne",
      description: "Des souvenirs du futur générés par une IA nostalgique.",
    },
  ];

  const filteredFilms = films.filter((film) => {
    const matchesCategory =
      selectedCategory === "all" || film.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <div className="w-full overflow-hidden bg-[#050508] min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 px-10 bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#050508] overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(236,72,153,0.15)_0%,transparent_70%)] blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-5">
            <div className="text-center">
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
              <p className="text-lg text-[#a0a0b8] max-w-2xl mx-auto leading-relaxed">
                {t("gallery.gallery_description")}
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              {[
                {
                  number: t("gallery.gallery_stat_1"),
                  label: t("gallery.gallery_stat_1_label"),
                },
                {
                  number: t("gallery.gallery_stat_2"),
                  label: t("gallery.gallery_stat_2_label"),
                },
                {
                  number: t("gallery.gallery_stat_3"),
                  label: t("gallery.gallery_stat_3_label"),
                },
                {
                  number: t("gallery.gallery_stat_4"),
                  label: t("gallery.gallery_stat_4_label"),
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <div className="font-orbitron font-black text-3xl text-[#ec4899] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-12 bg-[#0a0a0f] sticky top-0 z-7 border-b border-white/5 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-10">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    t("gallery.gallery_search_placeholder") ||
                    "Rechercher un film, réalisateur..."
                  }
                  className="w-full pl-14 pr-5 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder-[#6b6b85] font-inter focus:outline-none focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/20 transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[#6b6b85] hover:text-white transition-colors duration-200"
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
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-inter font-semibold text-sm tracking-wider uppercase transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_10px_30px_rgba(168,85,247,0.3)]"
                      : "bg-transparent text-[#a0a0b8] border border-white/20 hover:border-[#a855f7] hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="text-center mt-6">
              <span className="text-sm text-[#6b6b85] font-inter">
                {filteredFilms.length} {t("gallery.gallery_films_found")}
              </span>
            </div>
          </div>
        </section>

        {/* Films Grid */}
        <section className="py-20 bg-[#050508]">
          <div className="max-w-7xl mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFilms.map((film, index) => (
                <div
                  key={film.id}
                  className="group cursor-pointer"
                  onClick={() => setSelectedFilm(film)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative w-full aspect-video rounded-3xl mb-6 ${film.thumbnail} overflow-hidden group-hover:shadow-[0_20px_60px_rgba(168,85,247,0.4)] transition-all duration-500 group-hover:scale-[1.02]`}
                  >
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-inter font-semibold">
                      {film.duration}
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#a855f7]/80 backdrop-blur-sm rounded-full text-white text-xs font-inter font-semibold uppercase">
                      {
                        categories
                          .find((c) => c.id === film.category)
                          ?.name.split(" ")[0]
                      }
                    </div>
                  </div>

                  {/* Film Info */}
                  <div className="space-y-3">
                    <h3 className="font-orbitron font-bold text-2xl group-hover:text-[#a855f7] transition-colors duration-300">
                      {film.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-[#a0a0b8]">
                      <span className="flex items-center gap-2">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {film.director}
                      </span>
                      <span>•</span>
                      <span>{film.country}</span>
                      <span>•</span>
                      <span>{film.year}</span>
                    </div>
                    <p className="text-sm text-[#6b6b85] leading-relaxed line-clamp-2 group-hover:text-[#a0a0b8] transition-colors duration-300">
                      {film.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredFilms.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-6">🎬</div>
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

        {/* Load More Button */}
        <section className="py-12 bg-[#050508]">
          <div className="text-center">
            <button className="px-12 py-4 bg-transparent border-2 border-[#a855f7] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-[#a855f7] hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)] transition-all duration-300 group">
              <span className="flex items-center gap-3">
                {t("gallery.gallery_load_more")}
                <svg
                  className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* Film Modal */}
      {selectedFilm && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFilm(null)}
        >
          <div
            className="bg-[#1a1a24] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div
                className={`w-full aspect-video ${selectedFilm.thumbnail} rounded-t-3xl`}
              ></div>
              <button
                onClick={() => setSelectedFilm(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
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
            </div>

            {/* Modal Content */}
            <div className="p-10">
              <h2 className="font-orbitron font-black text-4xl mb-4">
                {selectedFilm.title}
              </h2>

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-[#a0a0b8]">
                <span className="flex items-center gap-2">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {selectedFilm.director}
                </span>
                <span>•</span>
                <span>{selectedFilm.country}</span>
                <span>•</span>
                <span>{selectedFilm.year}</span>
                <span>•</span>
                <span>{selectedFilm.duration}</span>
              </div>

              <p className="text-[#a0a0b8] leading-relaxed mb-8">
                {selectedFilm.description}
              </p>

              <div className="flex gap-4">
                <button className="flex-1 px-8 py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all duration-300">
                  {t("gallery.gallery_watch")}
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:border-[#a855f7] hover:bg-[#a855f7]/10 transition-all duration-300">
                  {t("gallery.gallery_share")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Gallery;
