import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PHASES = [
  {
    num: 1, to: "/", numLabel: "01",
    c: "#06b6d4", c2: "#3b82f6",
    statusStyle: "bg-[#10b981]/20 border-[#10b981]/50 text-[#10b981]",
  },
  {
    num: 2, to: "/phase2", numLabel: "02",
    c: "#a855f7", c2: "#ec4899",
    statusStyle: "bg-red-500/20 border-red-400/50 text-red-400",
  },
  {
    num: 3, to: "/phase3", numLabel: "03",
    c: "#fbbf24", c2: "#f59e0b",
    statusStyle: "bg-[#fbbf24]/15 border-[#fbbf24]/40 text-[#fbbf24]",
  },
];

const dotPos = { 1: "left-0", 2: "left-1/2", 3: "left-full" };
const barW   = { 1: "w-0",   2: "w-1/2",    3: "w-full"      };

export default function PhaseNavigation({ currentPhase }) {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 bg-[#050508] border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_15%_60%,rgba(6,182,212,0.06)_0%,transparent_55%),radial-gradient(ellipse_at_50%_40%,rgba(168,85,247,0.06)_0%,transparent_55%),radial-gradient(ellipse_at_85%_60%,rgba(251,191,36,0.06)_0%,transparent_55%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-white/30 font-inter text-[10px] tracking-[5px] uppercase">MARS.AI 2026</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
          </div>
          <h2 className="font-orbitron font-black text-2xl md:text-3xl text-white tracking-[3px] uppercase">
            {t("phases.nav_title")}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline bar */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] via-[#a855f7] to-[#fbbf24] opacity-25" />
            <div className={`absolute left-0 top-0 h-full opacity-70 bg-gradient-to-r from-[#06b6d4] via-[#a855f7] to-[#fbbf24] transition-all duration-1000 ${barW[currentPhase]}`} />
            <div
              className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full animate-pulse z-10 transition-all duration-[800ms] ${dotPos[currentPhase]}`}
              style={{ background: PHASES[currentPhase - 1].c, boxShadow: `0 0 16px 4px ${PHASES[currentPhase - 1].c}88` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
            {PHASES.map((p) => {
              const isActive = p.num === currentPhase;
              const isPast   = p.num < currentPhase;

              const inner = (
                <>
                  <div className="flex items-center justify-between mb-7">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-orbitron font-black text-base text-white shrink-0"
                      style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c2})`, boxShadow: isActive ? `0 0 24px ${p.c}99` : "none" }}
                    >
                      {p.numLabel}
                    </div>
                    <span className={`text-[10px] font-inter font-bold tracking-[2px] uppercase px-3 py-1 rounded-full border ${p.statusStyle}`}>
                      {t(`phases.nav_phase${p.num}_status`)}
                    </span>
                  </div>

                  <h3 className="font-orbitron font-black text-2xl mb-2" style={{ color: p.c }}>
                    {t(`phases.nav_phase${p.num}_title`)}
                  </h3>
                  <p className="text-[#6b6b85] text-sm leading-relaxed mb-5 min-h-[40px]">
                    {t(`phases.nav_phase${p.num}_desc`)}
                  </p>
                  <div className="flex items-center gap-2 mb-7">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.c }} />
                    <span className="text-[11px] font-inter text-white/40 tracking-wider uppercase">
                      {t(`phases.nav_phase${p.num}_date`)}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 text-xs font-inter font-semibold tracking-[2px] uppercase transition-colors duration-300 ${isActive ? "" : "text-white/30 group-hover:text-white/70"}`}
                    style={{ color: isActive ? p.c : undefined }}
                  >
                    {isActive
                      ? <><span className="w-2 h-2 rounded-full animate-pulse" style={{ background: p.c }} />{t("phases.nav_current")}</>
                      : <>{isPast ? t("phases.nav_revisit") : t("phases.nav_discover")}<svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></>
                    }
                  </div>
                </>
              );

              const cls = `group relative rounded-3xl p-8 border-2 transition-all duration-500 overflow-hidden
                ${isActive ? "bg-[#0d0d14]" : "bg-[#0a0a12] hover:-translate-y-2"}
                ${p.num > currentPhase ? "opacity-50 hover:opacity-90" : ""}`;

              const sty = {
                borderColor: isActive ? p.c : `${p.c}4d`,
                boxShadow: isActive ? `0 0 60px ${p.c}55, inset 0 0 60px ${p.c}08` : undefined,
              };

              return isActive
                ? <div key={p.num} className={cls} style={sty}>{inner}</div>
                : <Link key={p.num} to={p.to} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={cls} style={sty}>{inner}</Link>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
