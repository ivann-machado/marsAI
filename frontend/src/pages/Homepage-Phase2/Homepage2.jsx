import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function HomepagePhase2() {
    const { t } = useTranslation();
    const [scrollY, setScrollY] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Countdown timer for closing ceremony (example: 13 juin 20h)
    useEffect(() => {
        const targetDate = new Date('2026-06-13T20:00:00').getTime();
        
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const currentDay = 1; // Change to 1 or 2 depending on current day

    return (
        <>
            <Header />
            <div className="w-full overflow-hidden bg-[#050508]">
                {/* Hero Section - LIVE Event */}
                <section 
                    className="relative min-h-screen flex items-center justify-center overflow-hidden"
                    style={{ 
                        backgroundImage: `linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, transparent 50%), linear-gradient(225deg, rgba(236, 72, 153, 0.3) 0%, transparent 50%), url('/src/assets/mars-background.png')`,
                        backgroundSize: 'cover, cover, cover',
                        backgroundPosition: 'center, center, center',
                        transform: `translateY(${scrollY * 0.5}px)`
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f80] via-[#0a0a0fcc] to-[#050508]"></div>
                    
                    {/* Animated overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,72,153,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)] animate-pulse"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center px-4">
                        {/* LIVE Badge */}
                        <div className="flex items-center justify-center gap-3 mb-8 animate-fadeInUp">
                            <div className="flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-sm border border-red-500/50 rounded-full">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-red-400 font-inter font-bold text-sm tracking-wider uppercase">
                                    {t('phase2_live_badge')} {currentDay}{t('phase2_live_badge_of')}
                                </span>
                            </div>
                            <div className="text-[#06b6d4] text-xs tracking-[2px] uppercase font-inter">
                                {t('phase2_location')}
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
                        
                        <p className="font-orbitron font-semibold text-[clamp(20px,3vw,36px)] mb-6 tracking-wide text-white">
                            {t('phase2_event_ongoing')} <span className="text-[#10b981]">{t('phase2_event_ongoing_status')}</span>
                        </p>
                        
                        <p className="text-[clamp(14px,2vw,18px)] text-[#a0a0b8] mb-3 max-w-3xl mx-auto leading-relaxed">
                            {t('phase2_hero_description')}<br />
                            {t('phase2_hero_description_2')}
                        </p>
                        
                        {/* Quick Actions */}
                        <div className="flex gap-5 justify-center flex-wrap mt-12">
                            <button className="px-9 py-4 bg-gradient-to-br from-[#10b981] to-[#059669] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] transition-all duration-300">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                    {t('phase2_live_program')}
                                </span>
                            </button>
                            <button className="px-9 py-4 bg-gradient-to-br from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all duration-300">
                                {t('phase2_official_selection_btn')}
                            </button>
                            <button className="px-9 py-4 bg-transparent text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full border-2 border-[#06b6d4] hover:bg-[#06b6d4] hover:translate-y-[-3px] hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all duration-300">
                                {t('phase2_practical_info_btn')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Live Stats Banner */}
                <section className="py-8 bg-gradient-to-r from-[#1a0a2e] via-[#0a0a0f] to-[#1a0a2e] border-y border-[#a855f7]/30">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { number: '3,247', label: t('phase2_visitors'), icon: '👥', color: 'text-[#10b981]' },
                                { number: '50', label: t('phase2_films_selection'), icon: '🎬', color: 'text-[#ec4899]' },
                                { number: '120', label: t('phase2_countries'), icon: '🌍', color: 'text-[#06b6d4]' },
                                { number: '60+', label: t('phase2_experts'), icon: '⭐', color: 'text-[#a855f7]' }
                            ].map((stat, index) => (
                                <div key={index} className="group">
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className={`font-orbitron font-black text-3xl mb-1 ${stat.color}`}>
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

                {/* Countdown to Closing Ceremony */}
                <section className="py-20 bg-gradient-to-br from-[#050508] to-[#1a0a2e] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1)_0%,transparent_50%)]"></div>
                    
                    <div className="max-w-5xl mx-auto px-10 text-center relative z-10">
                        <div className="inline-block px-6 py-2 bg-[#ec4899]/20 border border-[#ec4899]/50 rounded-full mb-8">
                            <span className="text-[#ec4899] font-inter font-semibold text-sm tracking-wider uppercase">
                                {t('phase2_closing_ceremony')}
                            </span>
                        </div>
                        
                        <h2 className="font-orbitron font-black text-[clamp(32px,6vw,56px)] leading-tight mb-6">
                            {t('night_title')} <span className="text-[#ec4899]">{t('night_title_highlight')}</span>
                        </h2>
                        
                        <p className="text-[#a0a0b8] text-lg mb-12 max-w-2xl mx-auto">
                            {t('phase2_night_description')}<br />
                            <span className="text-white font-semibold">{t('phase2_night_date')}</span>
                        </p>
                        
                        {/* Countdown Timer */}
                        <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
                            {[
                                { value: timeLeft.days, label: t('phase2_days') },
                                { value: timeLeft.hours, label: t('phase2_hours') },
                                { value: timeLeft.minutes, label: t('phase2_minutes') },
                                { value: timeLeft.seconds, label: t('phase2_seconds') }
                            ].map((time, index) => (
                                <div key={index} className="bg-[#1a1a24] rounded-3xl p-8 border border-[#ec4899]/30">
                                    <div className="font-orbitron font-black text-6xl text-[#ec4899] mb-2">
                                        {String(time.value).padStart(2, '0')}
                                    </div>
                                    <div className="text-xs text-[#a0a0b8] tracking-wider uppercase">
                                        {time.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="px-12 py-4 bg-gradient-to-r from-[#ec4899] to-[#a855f7] text-white font-inter font-semibold text-base tracking-wider uppercase rounded-full hover:translate-y-[-3px] hover:shadow-[0_20px_50px_rgba(236,72,153,0.6)] transition-all duration-300">
                            {t('phase2_book_seat')}
                        </button>
                    </div>
                </section>

                {/* Official Selection - 50 Films */}
                <section className="py-32 bg-[#0a0a0f]">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-16">
                            <div className="inline-block px-6 py-2 bg-[#a855f7]/20 border border-[#a855f7]/50 rounded-full mb-6">
                                <span className="text-[#a855f7] font-inter font-semibold text-sm tracking-wider uppercase">
                                    {t('phase2_finalists')}
                                </span>
                            </div>
                            
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight mb-6">
                                {t('phase2_official_selection')}<br />
                                <span className="text-[#a855f7] drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]">{t('phase2_official_selection_year')}</span>
                            </h2>
                            
                            <p className="text-[#a0a0b8] text-lg max-w-3xl mx-auto leading-relaxed">
                                {t('phase2_selection_description')}<br />
                                {t('phase2_selection_description_2')}
                            </p>
                        </div>

                        {/* Featured Films Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {[
                                { title: 'PROTOCOL\nALPHA', gradient: 'gradient-purple', country: 'France' },
                                { title: 'NEURAL\nDREAM', gradient: 'gradient-pink', country: 'Belgique' },
                                { title: 'CYBER\nMARSEILLE', gradient: 'gradient-rainbow', country: 'France' }
                            ].map((film, index) => (
                                <div key={index} className="group cursor-pointer">
                                    <div className={`w-full aspect-video rounded-3xl ${film.gradient} mb-4 relative overflow-hidden group-hover:shadow-[0_30px_80px_rgba(168,85,247,0.4)] transition-all duration-400 group-hover:scale-[1.02]`}>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#10b981]/90 backdrop-blur-sm rounded-full text-white text-xs font-inter font-semibold">
                                            {t('phase2_official_badge')}
                                        </div>
                                    </div>
                                    <h3 className="font-orbitron font-bold text-xl leading-tight whitespace-pre-line mb-2">
                                        {film.title}
                                    </h3>
                                    <p className="text-sm text-[#a0a0b8]">🌍 {film.country}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button className="px-10 py-4 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all duration-300">
                                {t('phase2_view_50_films')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* 2-Day Agenda */}
                <section className="py-32 bg-gradient-to-br from-[#050508] via-[#0a0a0f] to-[#1a0a2e]">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-20">
                            <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight mb-6">
                                {t('phase2_program')}<br />
                                <span className="text-[#06b6d4] drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">{t('phase2_two_days')}</span>
                            </h2>
                            <p className="text-[#a0a0b8] text-lg">
                                {t('phase2_program_description')}
                            </p>
                        </div>

                        {/* Day Selector */}
                        <div className="flex justify-center gap-4 mb-16">
                            {[
                                { day: 1, date: t('phase2_june_12'), label: `${t('phase2_day')} 1` },
                                { day: 2, date: t('phase2_june_13'), label: `${t('phase2_day')} 2` }
                            ].map((dayInfo) => (
                                <button
                                    key={dayInfo.day}
                                    className={`px-8 py-4 rounded-2xl font-orbitron font-bold text-lg transition-all duration-300 ${
                                        currentDay === dayInfo.day
                                            ? 'bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white shadow-[0_10px_30px_rgba(6,182,212,0.4)]'
                                            : 'bg-[#1a1a24] text-[#a0a0b8] border border-white/10 hover:border-[#06b6d4]'
                                    }`}
                                >
                                    {dayInfo.label}<br />
                                    <span className="text-sm tracking-wider">{dayInfo.date}</span>
                                </button>
                            ))}
                        </div>

                        {/* Schedule Grid */}
                        <div className="space-y-4 max-w-4xl mx-auto">
                            {[
                                { time: '09:00', title: t('phase2_doors_opening'), type: t('phase2_welcome'), location: t('phase2_plaza_hall'), available: true },
                                { time: '10:00', title: t('phase2_ethics_conference'), type: t('phase2_conference'), location: t('phase2_sugar_hall'), available: true, speaker: 'Dr. Marie Laurent' },
                                { time: '11:30', title: t('phase2_projection_bloc_1'), type: t('phase2_projection'), location: t('phase2_sugar_hall'), available: true },
                                { time: '14:00', title: t('phase2_workshop_midjourney'), type: t('phase2_workshop'), location: t('phase2_plaza_hall'), available: false, spots: '0/30' },
                                { time: '16:00', title: t('phase2_roundtable'), type: t('phase2_conference'), location: t('phase2_sugar_hall'), available: true },
                                { time: '18:00', title: t('phase2_projection_bloc_2'), type: t('phase2_projection'), location: t('phase2_sugar_hall'), available: true },
                                { time: '20:00', title: t('phase2_closing_night'), type: t('phase2_event'), location: t('phase2_sugar_hall'), available: true, highlight: true }
                            ].map((event, index) => (
                                <div
                                    key={index}
                                    className={`group p-6 rounded-2xl border transition-all duration-300 hover:translate-x-2 ${
                                        event.highlight
                                            ? 'bg-gradient-to-r from-[#ec4899]/20 to-[#a855f7]/20 border-[#ec4899]/50'
                                            : 'bg-[#1a1a24] border-white/5 hover:border-[#06b6d4]/50'
                                    }`}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className="min-w-[80px]">
                                            <div className={`font-orbitron font-bold text-2xl ${event.highlight ? 'text-[#ec4899]' : 'text-[#06b6d4]'}`}>
                                                {event.time}
                                            </div>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="font-orbitron font-bold text-xl text-white group-hover:text-[#06b6d4] transition-colors">
                                                    {event.title}
                                                </h3>
                                                {event.highlight && (
                                                    <span className="px-3 py-1 bg-[#ec4899] rounded-full text-white text-xs font-inter font-semibold uppercase whitespace-nowrap">
                                                        {t('phase2_special_event')}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#a0a0b8] mb-3">
                                                <span className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${
                                                        event.type === t('phase2_conference') ? 'bg-[#3b82f6]' :
                                                        event.type === t('phase2_workshop') ? 'bg-[#10b981]' :
                                                        event.type === t('phase2_projection') ? 'bg-[#a855f7]' :
                                                        'bg-[#ec4899]'
                                                    }`}></span>
                                                    {event.type}
                                                </span>
                                                <span>•</span>
                                                <span>📍 {event.location}</span>
                                                {event.speaker && (
                                                    <>
                                                        <span>•</span>
                                                        <span>👤 {event.speaker}</span>
                                                    </>
                                                )}
                                            </div>

                                            {event.available ? (
                                                <button className="px-6 py-2 bg-[#06b6d4]/20 border border-[#06b6d4]/50 text-[#06b6d4] rounded-full text-sm font-inter font-semibold hover:bg-[#06b6d4] hover:text-white transition-all duration-300">
                                                    {event.type === t('phase2_workshop') ? t('phase2_book') : t('phase2_add_agenda')}
                                                </button>
                                            ) : (
                                                <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 text-[#6b6b85] rounded-full text-sm font-inter font-semibold">
                                                    {t('phase2_full')} {event.spots && `(${event.spots})`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <button className="px-10 py-4 bg-transparent border-2 border-[#06b6d4] text-white font-inter font-semibold text-sm tracking-wider uppercase rounded-full hover:bg-[#06b6d4] hover:shadow-[0_15px_40px_rgba(6,182,212,0.4)] transition-all duration-300">
                                {t('phase2_download_program')}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Practical Information */}
                <section className="py-32 bg-[#0a0a0f]">
                    <div className="max-w-7xl mx-auto px-10">
                        <h2 className="font-orbitron font-black text-[clamp(36px,6vw,64px)] leading-tight text-center mb-16">
                            {t('phase2_practical_info')}<br />
                            <span className="text-[#3b82f6] drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">{t('phase2_practical_info_2')}</span>
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Venue Info */}
                            <div className="bg-[#1a1a24] p-10 rounded-3xl border border-white/5">
                                <div className="text-4xl mb-4">📍</div>
                                <h3 className="font-orbitron font-bold text-2xl mb-6 text-[#3b82f6]">
                                    {t('phase2_platform')}
                                </h3>
                                <div className="space-y-4 text-[#a0a0b8]">
                                    <p className="flex items-start gap-3">
                                        <span className="text-lg">📍</span>
                                        <span>{t('phase2_address')}</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="text-lg">🚊</span>
                                        <span>{t('phase2_tram')}</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="text-lg">🅿️</span>
                                        <span>{t('phase2_parking')}</span>
                                    </p>
                                    <p className="flex items-start gap-3">
                                        <span className="text-lg">♿</span>
                                        <span>{t('phase2_accessibility')}</span>
                                    </p>
                                </div>
                                <button className="mt-6 w-full px-6 py-3 bg-[#3b82f6]/20 border border-[#3b82f6]/50 text-[#3b82f6] rounded-full font-inter font-semibold hover:bg-[#3b82f6] hover:text-white transition-all duration-300">
                                    {t('phase2_view_map')}
                                </button>
                            </div>

                            {/* Rooms Info */}
                            <div className="space-y-6">
                                <div className="bg-[#1a1a24] p-8 rounded-3xl border border-white/5">
                                    <h4 className="font-orbitron font-bold text-xl mb-3 text-[#10b981]">
                                        {t('venue_room_1_title')}
                                    </h4>
                                    <p className="text-sm text-[#a0a0b8] leading-relaxed">
                                        {t('phase2_sugar_hall_desc')}<br />
                                        {t('phase2_sugar_hall_capacity')}
                                    </p>
                                </div>

                                <div className="bg-[#1a1a24] p-8 rounded-3xl border border-white/5">
                                    <h4 className="font-orbitron font-bold text-xl mb-3 text-[#ec4899]">
                                        {t('venue_room_2_title')}
                                    </h4>
                                    <p className="text-sm text-[#a0a0b8] leading-relaxed">
                                        {t('phase2_plaza_hall_desc')}<br />
                                        {t('phase2_plaza_hall_capacity')}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-[#a855f7]/20 to-[#ec4899]/20 p-8 rounded-3xl border border-[#a855f7]/30">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">🎫</span>
                                        <h4 className="font-orbitron font-bold text-xl text-white">
                                            {t('phase2_free_entry')}
                                        </h4>
                                    </div>
                                    <p className="text-sm text-[#a0a0b8] leading-relaxed">
                                        {t('phase2_free_entry_desc')}<br />
                                        {t('phase2_free_entry_desc_2')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live Social Feed (Optional) */}
                <section className="py-20 bg-gradient-to-br from-[#1a0a2e] to-[#050508]">
                    <div className="max-w-7xl mx-auto px-10">
                        <div className="text-center mb-12">
                            <h2 className="font-orbitron font-black text-4xl mb-4">
                                {t('phase2_follow_live')} <span className="text-[#ec4899]">{t('phase2_follow_live_2')}</span>
                            </h2>
                            <p className="text-[#a0a0b8]">
                                {t('phase2_join_conversation')}
                            </p>
                        </div>

                        <div className="flex justify-center gap-6 flex-wrap">
                            {[
                                { icon: '📸', name: 'Instagram', handle: '@marsai.festival', color: 'from-[#e4405f] to-[#a855f7]' },
                                { icon: '🐦', name: 'Twitter/X', handle: '@marsai_fest', color: 'from-[#1da1f2] to-[#0d8bd9]' },
                                { icon: '💼', name: 'LinkedIn', handle: 'MARS.AI Festival', color: 'from-[#0077b5] to-[#00a0dc]' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className={`px-8 py-4 bg-gradient-to-r ${social.color} text-white font-inter font-semibold text-sm tracking-wider rounded-full hover:translate-y-[-3px] hover:shadow-[0_15px_40px_rgba(168,85,247,0.3)] transition-all duration-300 flex items-center gap-3`}
                                >
                                    <span className="text-2xl">{social.icon}</span>
                                    <div className="text-left">
                                        <div className="text-xs opacity-80">{social.name}</div>
                                        <div className="font-bold">{social.handle}</div>
                                    </div>
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