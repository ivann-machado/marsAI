import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import PhaseIndicator from "../../components/PhaseIndicator/PhaseIndicator";
import PhaseNavigation from "../../components/PhaseNavigation/PhaseNavigation";

function HomepagePhase3() {
    const { t } = useTranslation();

    const winners = [
        { category: 'grand_prize', title: 'NEURAL DREAM', director: 'Marie Laurent', country: t('phase3.country_belgium'), thumbnail: '/src/assets/neural.png', prize: t('phase3.prize_grand_prix') },
        { category: 'jury_prize', title: 'PROTOCOL ALPHA', director: 'Jean Dupont', country: t('phase3.country_france'), thumbnail: '/src/assets/robot.png', prize: t('phase3.prize_jury') },
        { category: 'direction', title: 'CYBER MARSEILLE', director: 'Ahmed Karim', country: t('phase3.country_france'), thumbnail: '/src/assets/cyber.png', prize: t('phase3.prize_direction') },
        { category: 'innovation', title: 'QUANTUM SOULS', director: 'Marcus Brown', country: t('phase3.country_usa'), thumbnail: '/src/assets/robot2.png', prize: t('phase3.prize_innovation') },
        { category: 'scenario', title: 'CODE POETRY', director: 'Lars Schmidt', country: t('phase3.country_germany'), thumbnail: '/src/assets/cyber2.png', prize: t('phase3.prize_scenario') },
        { category: 'artistic', title: 'FUTURE MEMORIES', director: 'Isabella Rodriguez', country: t('phase3.country_spain'), thumbnail: '/src/assets/planete.png', prize: t('phase3.prize_artistic') }
    ];

    const stats = [
        { number: '3,892', label: t('phase3.total_visitors'), color: 'text-[#10b981]' },
        { number: '50', label: t('phase3.finalist_films'), color: 'text-[#ec4899]' },
        { number: '120', label: t('phase3.countries'), color: 'text-[#06b6d4]' },
        { number: '15', label: t('phase3.conferences_workshops'), color: 'text-[#a855f7]' }
    ];

    const testimonials = [
        { quote: t('phase3.testimonial_1'), author: 'Dr. Marie Laurent', role: t('phase3.grand_winner') },
        { quote: t('phase3.testimonial_2'), author: 'Prof. Jean Martin', role: t('phase3.jury_president') },
        { quote: t('phase3.testimonial_3'), author: 'Sophie Chen', role: t('phase3.participant') },
        { quote: t('phase3.testimonial_4'), author: 'Marc Dubois', role: t('phase3.visitor') }
    ];

    return (
        <>
            <Header />
            
            <div className="w-full overflow-hidden bg-[#050508]">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236, 72, 153, 0.3) 0%, transparent 50%), url('/src/assets/mars-background.png')`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f80] via-[#0a0a0fcc] to-[#050508]"></div>
                    <div className="relative z-10 text-center px-4">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="px-8 py-3 bg-gradient-to-r from-[#10b981]/20 to-[#059669]/20 backdrop-blur-sm border border-[#10b981]/50 rounded-full">
                                <span className="text-[#10b981] font-inter font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                                    <span className="text-xl">✓</span>{t('phase3.festival_completed')}
                                </span>
                            </div>
                        </div>
                        <h1 className="font-orbitron font-black text-[clamp(60px,12vw,140px)] leading-[0.9] mb-5 tracking-[-2px] uppercase">
                            <span className="bg-gradient-to-br from-white to-[#e0e0ff] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">MARS</span>
                            <span className="bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.8)]">AI</span>
                            <br />
                            <span className="text-[clamp(32px,6vw,64px)] bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">{t('phase3.awards_2026')}</span>
                        </h1>
                        <p className="font-orbitron font-semibold text-[clamp(20px,3vw,36px)] mb-6 text-white">{t('phase3.discover_winners')}</p>
                        <p className="text-[clamp(14px,2vw,18px)] text-[#a0a0b8] mb-3 max-w-3xl mx-auto">{t('phase3.hero_description')}<br />{t('phase3.hero_description_2')}</p>
                        <div className="flex gap-5 justify-center flex-wrap mt-12">
                            <a href="#palmares" className="px-10 py-4 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] text-white font-inter font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(251,191,36,0.4)] hover:translate-y-[-3px] transition-all">{t('phase3.see_palmares')}</a>
                            <a href="#highlights" className="px-10 py-4 bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:translate-y-[-3px] transition-all">{t('phase3.watch_highlights')}</a>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-gradient-to-r from-[#1a0a2e] via-[#0a0a0f] to-[#1a0a2e] border-y border-[#fbbf24]/30">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-8">
                            <h3 className="font-orbitron font-bold text-2xl text-[#fbbf24] mb-2">{t('phase3.final_results')}</h3>
                            <p className="text-sm text-[#a0a0b8]">{t('phase3.festival_dates')}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div className={`font-orbitron font-black text-4xl mb-2 ${stat.color}`}>{stat.number}</div>
                                    <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Grand Winner */}
                <section className="py-32 bg-gradient-to-br from-[#050508] to-[#1a0a2e] relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)] blur-3xl"></div>
                    <div className="max-w-6xl mx-auto px-10 relative z-10 text-center">
                        <div className="text-[#fbbf24] font-inter font-bold text-sm tracking-[3px] uppercase mb-6">{t('phase3.grand_prize')}</div>
                        <h2 className="font-orbitron font-black text-[clamp(40px,8vw,80px)] mb-8">
                            <span className="bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">NEURAL DREAM</span>
                        </h2>
                        <div className="flex items-center justify-center gap-6 text-[#a0a0b8] mb-12 text-lg">
                            <span>Marie Laurent</span><span>•</span><span>Belgique</span>
                        </div>
                        <Link to="/video/1" className="group cursor-pointer max-w-4xl mx-auto block">
                            <div className="relative rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(251,191,36,0.4)] border-4 border-[#fbbf24]/50 hover:border-[#fbbf24] transition-all">
                                <div className="w-full aspect-video relative bg-[#2a1a34]">
                                    <img src="/src/assets/neural.png" alt="NEURAL DREAM" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all flex items-center justify-center">
                                        <div className="w-24 h-24 rounded-full bg-[#fbbf24] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                        </div>
                                    </div>
                                    <div className="absolute top-6 left-6 px-6 py-3 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center gap-2">
                                        <span className="text-white font-inter font-bold text-sm uppercase">{t('phase3.grand_winner')}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-8 text-lg text-[#a0a0b8] max-w-2xl mx-auto">"{t('phase3.winner_quote')}"</p>
                        </Link>
                    </div>
                </section>

                {/* Podium Section */}
                <section className="py-32 bg-gradient-to-b from-[#0a0a0f] to-[#1a0a2e] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.1)_0%,transparent_70%)]"></div>
                    <div className="max-w-6xl mx-auto px-10 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] mb-6 text-white">PODIUM<br /><span className="text-[#fbbf24]">TOP 3</span></h2>
                        </div>
                        
                        {/* Podium */}
                        <div className="flex items-end justify-center gap-4 md:gap-8">
                            {/* 2nd Place */}
                            <div className="flex flex-col items-center">
                                <Link to="/video/2" className="group mb-4">
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-[#c0c0c0] shadow-[0_0_30px_rgba(192,192,192,0.4)] group-hover:scale-105 transition-transform">
                                        <img src={winners[1].thumbnail} alt={winners[1].title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <div className="font-orbitron font-bold text-sm md:text-base text-white group-hover:text-[#c0c0c0] transition-colors">{winners[1].title}</div>
                                        <div className="text-xs text-[#a0a0b8]">{winners[1].director}</div>
                                    </div>
                                </Link>
                                <div className="w-32 md:w-40 h-32 md:h-40 bg-gradient-to-b from-[#e8e8e8] to-[#a0a0a0] rounded-t-xl flex flex-col items-center justify-center relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_-5px_20px_rgba(192,192,192,0.3)]">
                                    <div className="absolute -top-6 w-12 h-12 bg-gradient-to-br from-[#e8e8e8] to-[#a0a0a0] rounded-full flex items-center justify-center shadow-lg">
                                        <span className="font-orbitron font-black text-2xl text-[#333]">2</span>
                                    </div>
                                    <span className="text-xs text-[#333] font-inter font-semibold uppercase tracking-wider mt-4">{t('phase3.prize_jury') || 'Prix du Jury'}</span>
                                </div>
                            </div>
                            
                            {/* 1st Place */}
                            <div className="flex flex-col items-center">
                                <Link to="/video/1" className="group mb-4">
                                    <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-4 border-[#fbbf24] shadow-[0_0_50px_rgba(251,191,36,0.5)] group-hover:scale-105 transition-transform">
                                        <img src={winners[0].thumbnail} alt={winners[0].title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute top-2 right-2 text-2xl">👑</div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <div className="font-orbitron font-bold text-base md:text-lg text-[#fbbf24] group-hover:text-white transition-colors">{winners[0].title}</div>
                                        <div className="text-xs text-[#a0a0b8]">{winners[0].director}</div>
                                    </div>
                                </Link>
                                <div className="w-40 md:w-52 h-48 md:h-56 bg-gradient-to-b from-[#fbbf24] to-[#b8860b] rounded-t-xl flex flex-col items-center justify-center relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_-5px_30px_rgba(251,191,36,0.4)]">
                                    <div className="absolute -top-6 w-14 h-14 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                        <span className="font-orbitron font-black text-3xl text-white">1</span>
                                    </div>
                                    <span className="text-xs text-white font-inter font-bold uppercase tracking-wider mt-4">{t('phase3.prize_grand_prix') || 'Grand Prix'}</span>
                                </div>
                            </div>
                            
                            {/* 3rd Place */}
                            <div className="flex flex-col items-center">
                                <Link to="/video/3" className="group mb-4">
                                    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-[#cd7f32] shadow-[0_0_25px_rgba(205,127,50,0.4)] group-hover:scale-105 transition-transform">
                                        <img src={winners[2].thumbnail} alt={winners[2].title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <div className="font-orbitron font-bold text-sm text-white group-hover:text-[#cd7f32] transition-colors">{winners[2].title}</div>
                                        <div className="text-xs text-[#a0a0b8]">{winners[2].director}</div>
                                    </div>
                                </Link>
                                <div className="w-28 md:w-36 h-24 md:h-28 bg-gradient-to-b from-[#cd7f32] to-[#8b4513] rounded-t-xl flex flex-col items-center justify-center relative shadow-[inset_0_2px_10px_rgba(255,255,255,0.3),0_-5px_20px_rgba(205,127,50,0.3)]">
                                    <div className="absolute -top-5 w-10 h-10 bg-gradient-to-br from-[#cd7f32] to-[#8b4513] rounded-full flex items-center justify-center shadow-lg">
                                        <span className="font-orbitron font-black text-xl text-white">3</span>
                                    </div>
                                    <span className="text-[10px] md:text-xs text-white font-inter font-semibold uppercase tracking-wider mt-3">{t('phase3.prize_direction') || 'Réalisation'}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Podium Base */}
                        <div className="max-w-2xl mx-auto h-4 bg-gradient-to-r from-transparent via-[#fbbf24]/30 to-transparent rounded-full mt-2"></div>
                    </div>
                </section>

                {/* Winners List */}
                <section id="palmares" className="py-32 bg-[#0a0a0f]">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-20">
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] mb-6 text-white">{t('phase3.complete_palmares')}<br /><span className="text-[#fbbf24]">{t('phase3.2026')}</span></h2>
                            <p className="text-[#a0a0b8] text-lg">{t('phase3.palmares_description')}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {winners.map((winner, i) => (
                                <Link to={`/video/${i + 1}`} key={i} className="group relative block">
                                    {i < 3 && <div className="absolute -top-4 -left-4 z-10 w-12 h-12 bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] rounded-full flex items-center justify-center font-orbitron font-black text-white text-lg shadow-[0_0_20px_rgba(251,191,36,0.6)]">{i + 1}</div>}
                                    <div className="bg-[#1a1a24] rounded-3xl border border-white/5 hover:border-[#fbbf24]/50 transition-all overflow-hidden group-hover:translate-y-[-10px]">
                                        <div className="w-full aspect-video relative bg-[#2a1a34]">
                                            <img src={winner.thumbnail} alt={winner.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                                                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="text-xs text-[#fbbf24] font-inter font-semibold uppercase tracking-wider mb-3">{winner.prize}</div>
                                            <h3 className="font-orbitron font-bold text-2xl mb-3 text-white group-hover:text-[#fbbf24] transition-colors">{winner.title}</h3>
                                            <div className="flex items-center gap-3 text-sm text-[#a0a0b8]">
                                                <span>{winner.director}</span><span>•</span><span>{winner.country}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Gallery */}
                <section id="highlights" className="py-32 bg-gradient-to-br from-[#050508] via-[#0a0a0f] to-[#1a0a2e]">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-20">
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] mb-6 text-white">{t('phase3.festival_highlights')}<br /><span className="text-[#ec4899]">{t('phase3.best_moments')}</span></h2>
                            <p className="text-[#a0a0b8] text-lg">{t('phase3.highlights_description')}</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="group relative aspect-square bg-gradient-to-br from-[#1a1a24] to-[#2a1a34] rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 group-hover:from-[#a855f7]/40 group-hover:to-[#ec4899]/40 transition-all flex items-center justify-center">
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-32 bg-[#0a0a0f]">
                    <div className="max-w-6xl mx-auto px-10">
                        <div className="text-center mb-20">
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] mb-6 text-white">{t('phase3.testimonials')}<br /><span className="text-[#06b6d4]">{t('phase3.reactions')}</span></h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((item, i) => (
                                <div key={i} className="bg-gradient-to-br from-[#1a1a24] to-[#2a1a34] p-8 rounded-3xl border border-white/5 hover:border-[#06b6d4]/50 transition-all">
                                    <p className="text-[#a0a0b8] mb-6 text-lg italic">"{item.quote}"</p>
                                    <div className="font-orbitron font-bold text-white">{item.author}</div>
                                    <div className="text-sm text-[#6b6b85]">{item.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            {/* Navigation entre phases */}
            <PhaseNavigation currentPhase={3} />

            <PhaseIndicator currentPhase={3} />
            <Footer />
        </>
    );
}

export default HomepagePhase3;