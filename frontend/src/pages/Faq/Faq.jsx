import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Faq() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqSections = [
    {
      title: t("Faq_page.faq_section_submission"),
      items: [
        { id: 1, question: t("Faq_page.faq_q1"), answer: t("Faq_page.faq_a1") },
        { id: 2, question: t("Faq_page.faq_q2"), answer: t("Faq_page.faq_a2") },
        { id: 3, question: t("Faq_page.faq_q3"), answer: t("Faq_page.faq_a3") },
        { id: 4, question: t("Faq_page.faq_q4"), answer: t("Faq_page.faq_a4") },
      ],
    },
    {
      title: t("Faq_page.faq_section_selection"),
      items: [
        { id: 5, question: t("Faq_page.faq_q5"), answer: t("Faq_page.faq_a5") },
        { id: 6, question: t("Faq_page.faq_q6"), answer: t("Faq_page.faq_a6") },
        { id: 7, question: t("Faq_page.faq_q7"), answer: t("Faq_page.faq_a7") },
      ],
    },
    {
      title: t("Faq_page.faq_section_event"),
      items: [
        { id: 8, question: t("Faq_page.faq_q8"), answer: t("Faq_page.faq_a8") },
        { id: 9, question: t("Faq_page.faq_q9"), answer: t("Faq_page.faq_a9") },
        {
          id: 10,
          question: t("Faq_page.faq_q10"),
          answer: t("Faq_page.faq_a10"),
        },
      ],
    },
    {
      title: t("Faq_page.faq_section_rights"),
      items: [
        {
          id: 11,
          question: t("Faq_page.faq_q11"),
          answer: t("Faq_page.faq_a11"),
        },
        {
          id: 12,
          question: t("Faq_page.faq_q12"),
          answer: t("Faq_page.faq_a12"),
        },
      ],
    },
    {
      title: t("Faq_page.faq_section_technical"),
      items: [
        {
          id: 13,
          question: t("Faq_page.faq_q13"),
          answer: t("Faq_page.faq_a13"),
        },
        {
          id: 14,
          question: t("Faq_page.faq_q14"),
          answer: t("Faq_page.faq_a14"),
        },
      ],
    },
  ];

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <meta
        name="description"
        content="Vous avez une question ou une interrogation ? Alors n'attendez plus, notre Foire aux Questions est là pour ça !"
      />
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
                {t("Faq_page.hero_badge")}
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  {t("Faq_page.hero_title")}
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
                  {t("Faq_page.hero_title_highlight")}
                </span>
              </h1>

              <p className="text-gray-300 mt-6 text-base md:text-lg max-w-2xl mx-auto">
                {t("Faq_page.hero_description")}
              </p>
            </div>

            {/* FAQ Sections */}
            <div className="space-y-12">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                    {section.title}
                  </h2>

                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/60 rounded-xl overflow-hidden hover:border-pink-500/40 transition-colors"
                      >
                        <button
                          onClick={() => toggleExpanded(item.id)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
                        >
                          <span className="font-semibold text-white pr-4">
                            {item.question}
                          </span>
                          <span
                            className={`flex-shrink-0 text-pink-400 transition-transform duration-300 ${
                              expandedId === item.id ? "rotate-180" : ""
                            }`}
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
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                          </span>
                        </button>

                        {expandedId === item.id && (
                          <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-700/60">
                            <p className="text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Faq;
