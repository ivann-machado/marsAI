import { useState, useEffect } from 'react';
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useTranslation } from 'react-i18next';
function Homepage() { const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-black text-white">
                {/* Hero Section */}
                <section 
                    className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black overflow-hidden"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 text-center px-4 md:px-8">
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 rounded-full border border-white/20">
                             {t('homepage.hero_badge')}
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tighter">
                            MARS<span className="text-pink-500">AI</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold mb-4 tracking-wide">
                            {t('homepage.hero_tagline')} <span className="text-green-400">{t('homepage.hero_tagline_highlight')}</span> {t('homepage.hero_tagline_end')}
                        </p>
                        <p className="text-gray-400 mb-2 text-lg">
                            {t('homepage.hero_description')}
                        </p>
                        <p className="text-gray-500 mb-8">
                            {t('homepage.hero_subdescription')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                                {t('homepage.hero_cta_films')}
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-lg transition-all duration-300">
                                {t('homepage.hero_cta_space')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Cards */}
                <section className="relative z-10 py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-white">{t('homepage.feature_1_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.feature_1_desc')}
                                </p>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-green-400">{t('homepage.feature_2_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.feature_2_desc')}
                                </p>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-pink-500">{t('homepage.feature_3_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.feature_3_desc')}
                                </p>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-blue-400">{t('homepage.feature_4_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.feature_4_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Films Competition Section */}
                <section className="relative z-10 py-16 md:py-24 bg-zinc-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-4">
                                {t('homepage.films_title')}<br />
                                <span className="text-gray-500">{t('homepage.films_title_highlight')}</span>
                            </h2>
                            <p className="text-gray-400 mb-6 max-w-xl">
                                {t('homepage.films_description')}
                            </p>
                            <button className="px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-lg transition-all duration-300">
                                {t('homepage.films_cta')}
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-purple-600 to-purple-900 group-hover:scale-105 transition-transform duration-300"></div>
                                <h3 className="text-xl font-bold whitespace-pre-line">{t('homepage.film_1_title')}</h3>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-pink-500 to-pink-800 group-hover:scale-105 transition-transform duration-300"></div>
                                <h3 className="text-xl font-bold whitespace-pre-line">{t('homepage.film_2_title')}</h3>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-blue-500 via-pink-500 to-yellow-500 group-hover:scale-105 transition-transform duration-300"></div>
                                <h3 className="text-xl font-bold whitespace-pre-line">{t('homepage.film_3_title')}</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Objectives Section */}
                <section className="relative z-10 py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
                            {t('homepage.objectives_title')} <span className="text-pink-500">{t('homepage.objectives_title_highlight')}</span>
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4 whitespace-pre-line">{t('homepage.objective_1_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.objective_1_desc')}
                                </p>
                            </div>
                            
                            <div className="text-center p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4 whitespace-pre-line">{t('homepage.objective_2_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.objective_2_desc')}
                                </p>
                            </div>
                            
                            <div className="text-center p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4 whitespace-pre-line">{t('homepage.objective_3_title')}</h3>
                                <p className="text-gray-400 text-sm">
                                    {t('homepage.objective_3_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Protocol Section */}
                <section className="relative z-10 py-16 md:py-24 bg-zinc-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                        <div className="mb-12">
                            <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-400 bg-white/5 rounded-full">
                                {t('homepage.protocol_badge')}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black whitespace-pre-line">
                                {t('homepage.protocol_title')}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-pink-500 mb-2">{t('homepage.protocol_stat_1')}</div>
                                <div className="text-gray-500 text-sm">{t('homepage.protocol_stat_1_label')}</div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">{t('homepage.protocol_stat_2')}</div>
                                <div className="text-gray-500 text-sm">{t('homepage.protocol_stat_2_label')}</div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-pink-500 mb-2">{t('homepage.protocol_stat_3')}</div>
                                <div className="text-gray-500 text-sm">{t('homepage.protocol_stat_3_label')}</div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">{t('homepage.protocol_stat_4')}</div>
                                <div className="text-gray-500 text-sm">{t('homepage.protocol_stat_4_label')}</div>
                            </div>
                        </div>
                        
                        <button className="px-10 py-5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
                            {t('homepage.protocol_cta')}
                        </button>
                    </div>
                </section>

                {/* Conferences Section */}
                <section className="relative z-10 py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
                            {t('homepage.conferences_title')}<br />
                            <span className="text-pink-500">{t('homepage.conferences_title_highlight')}</span>
                        </h2>
                        
                        <div className="flex flex-col gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-gray-300">
                                {t('homepage.conference_item_1')}
                            </div>
                            <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-gray-300">
                                {t('homepage.conference_item_2')}
                            </div>
                            <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-gray-300">
                                {t('homepage.conference_item_3')}
                            </div>
                        </div>
                        
                        <div className="text-center mb-12">
                            <span className="inline-block px-6 py-3 bg-white/5 rounded-full text-gray-300 cursor-pointer hover:bg-white/10 transition-colors">
                                 {t('homepage.conferences_agenda')}
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 bg-white text-black rounded-2xl">
                                <div className="text-3xl mb-4"></div>
                                <h3 className="text-xl font-black mb-2">{t('homepage.event_1_title')}</h3>
                                <p className="text-gray-600">
                                    {t('homepage.event_1_desc')}
                                </p>
                            </div>
                            
                            <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
                                <div className="text-3xl mb-4 text-pink-500"></div>
                                <h3 className="text-xl font-black mb-2">{t('homepage.event_2_title')}</h3>
                                <p className="text-gray-400">
                                    {t('homepage.event_2_desc')}
                                </p>
                            </div>
                            
                            <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
                                <div className="text-3xl mb-4 text-green-400"></div>
                                <h3 className="text-xl font-black mb-2">{t('homepage.event_3_title')}</h3>
                                <p className="text-gray-400">
                                    {t('homepage.event_3_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Night Event Section */}
                <section className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-purple-900/30 to-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1">
                                <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-400 bg-white/5 rounded-full">
                                    {t('homepage.night_badge')}
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black mb-4">
                                    {t('homepage.night_title')}<br />
                                    <span className="text-pink-500">{t('homepage.night_title_highlight')}</span>
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    {t('homepage.night_description')}
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-6 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl"></div>
                                    <div>
                                        <div className="text-2xl font-black">{t('homepage.night_date')}</div>
                                        <div className="text-gray-400">{t('homepage.night_time')}</div>
                                    </div>
                                </div>
                                <button className="w-full px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors">
                                    {t('homepage.night_cta')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Section */}
                <section className="relative z-10 py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="mb-12">
                            <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-400 bg-white/5 rounded-full">
                                 {t('homepage.venue_badge')}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                {t('homepage.venue_title')}<span className="text-blue-400">{t('homepage.venue_title_highlight')}</span>
                            </h2>
                            <div className="flex flex-col md:flex-row gap-8 text-gray-400">
                                <div className="whitespace-pre-line">{t('homepage.venue_location_1')}</div>
                                <div className="whitespace-pre-line">{t('homepage.venue_location_2')}</div>
                                <div>{t('homepage.venue_location_3')}</div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <h3 className="text-2xl font-black mb-4">{t('homepage.venue_room_1_title')}</h3>
                                <p className="text-gray-400">
                                    {t('homepage.venue_room_1_desc')}
                                </p>
                            </div>
                            
                            <div className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <h3 className="text-2xl font-black mb-4">{t('homepage.venue_room_2_title')}</h3>
                                <p className="text-gray-400">
                                    {t('homepage.venue_room_2_desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Statistics Section - Chiffres Projetés */}
                <section className="relative z-10 py-32 bg-gradient-to-br from-[#050508] via-[#0a0a0f] to-[#1a0a2e] relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.1)_0%,transparent_70%)] blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(236,72,153,0.1)_0%,transparent_70%)] blur-3xl"></div>
                    
                    <div className="max-w-7xl mx-auto px-10 relative z-10">
                        <div className="mb-20">
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight mb-3">
                                {t('homepage.stats_title')}<br />
                                <span className="text-[#ec4899] drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]">{t('homepage.stats_title_highlight')}</span>
                            </h2>
                            <p className="text-sm text-[#a0a0b8] tracking-[2px] uppercase">
                                {t('homepage.stats_subtitle')}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                            {[
                                {
                                    number: t('homepage.stats_countries'),
                                    label: t('homepage.stats_countries_label'),
                                    gradient: 'from-[#1a1a24] to-[#2a1a34]',
                                    borderGlow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]'
                                },
                                {
                                    number: t('homepage.stats_films'),
                                    label: t('homepage.stats_films_label'),
                                    gradient: 'from-[#1a1a24] to-[#341a2a]',
                                    borderGlow: 'group-hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]'
                                }
                            ].map((stat, index) => (
                                <div 
                                    key={index}
                                    className="group relative p-12 rounded-3xl bg-gradient-to-br border border-white/5 hover:border-white/10 transition-all duration-500 hover:translate-y-[-8px]"
                                    style={{
                                        background: `linear-gradient(135deg, #1a1a24 0%, ${index === 0 ? '#2a1a34' : '#341a2a'} 100%)`
                                    }}
                                >
                                    {/* Glow effect on hover */}
                                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.borderGlow}`}></div>
                                    
                                    <div className="relative z-10">
                                        <div className={`font-orbitron font-black text-[clamp(60px,8vw,100px)] mb-2 bg-gradient-to-br ${index === 0 ? 'from-[#a855f7] to-[#ec4899]' : 'from-[#ec4899] to-[#f97316]'} bg-clip-text text-transparent drop-shadow-[0_0_30px_currentColor]`}>
                                            {stat.number}
                                        </div>
                                        <div className="text-xs text-[#a0a0b8] tracking-[2px] uppercase font-inter font-semibold">
                                            {stat.label}
                                        </div>
                                    </div>
                                    
                                    {/* Corner decoration */}
                                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/10 rounded-tr-xl"></div>
                                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/10 rounded-bl-xl"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partners Section - Ils soutiennent le futur */}
                <section className="relative z-10 py-32 bg-[#0a0a0f] relative">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-20">
                            <div className="text-xs text-[#6b6b85] tracking-[3px] uppercase mb-6 font-inter">
                                {t('homepage.partners_badge')}
                            </div>
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight">
                                {t('homepage.partners_title')} <span className="text-[#06b6d4] drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">{t('homepage.partners_title_highlight')}</span>
                            </h2>
                        </div>
                        
                        {/* Partners Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {[
                                { name: 'Partner 1', logo: '  ' },
                                { name: 'TOPITO', logo: 'TOPITO', color: '#5b7cff' },
                                { name: 'BIOGUIA', logo: 'BIOGUIA', color: '#7ed321' },
                                { name: 'Dotsub', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 2', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 3', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 4', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 5', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 6', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 7', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 8', logo: 'dotsub', color: '#4a9eff' },
                                { name: 'Dotsub 9', logo: 'dotsub', color: '#4a9eff' }
                            ].map((partner, index) => (
                                <div 
                                    key={index}
                                    className="aspect-video bg-[#1a1a24] rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_40px_rgba(168,85,247,0.2)] flex items-center justify-center group relative overflow-hidden"
                                >
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-[#ec4899]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    <div className="relative z-10 text-center px-6">
                                        {index === 0 ? (
                                            <span className="text-5xl">{partner.logo}</span>
                                        ) : (
                                            <span 
                                                className="font-orbitron font-bold text-xl tracking-wider"
                                                style={{ color: partner.color || '#4a9eff' }}
                                            >
                                                {partner.logo}
                                            </span>
                                        )}
                                        <div className="text-[10px] text-[#6b6b85] mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {t('homepage.partners_hover_text')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Become Partner CTA */}
                        <div className="text-center mt-16">
                            <button className="px-10 py-4 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(6,182,212,0.4)] transition-all duration-300 group relative overflow-hidden">
                                <span className="relative z-10">{t('homepage.partners_cta')}</span>
                                <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                            </button>
                        </div>
                    </div>
                </section>
            <Footer />
        </>
    );
}

export default Homepage;