import { useState, useEffect } from 'react';
import Footer from "../../components/Footer/Footer";

function Homepage() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-black text-white">
                {/* Hero Section */}
                <section 
                    className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black overflow-hidden"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 text-center px-4 md:px-8">
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-white/10 rounded-full border border-white/20">
                             LE PROTOCOLE TEMPOREL 2026
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tighter">
                            MARS<span className="text-pink-500">AI</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold mb-4 tracking-wide">
                            IMAGINEZ DES <span className="text-green-400">FUTURS</span> SOUHAITABLES
                        </p>
                        <p className="text-gray-400 mb-2 text-lg">
                            Le festival de courts-métrages de IA — conçus réalisés par IA
                        </p>
                        <p className="text-gray-500 mb-8">
                            2 jours d'immersion au cœur de Marseille
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                                VOIR LES FILMS →
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-lg transition-all duration-300">
                                MON ESPACE AI
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Cards */}
                <section className="py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-white">1 MINUTE</h3>
                                <p className="text-gray-400 text-sm">
                                    PLONGEZ AU CŒUR D'IDÉES FORTES
                                </p>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-green-400">GRATUITE</h3>
                                <p className="text-gray-400 text-sm">
                                    CONFÉRENCES ET PROJECTIONS ACCESSIBLES
                                </p>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-pink-500">POUR TOUS</h3>
                                <p className="text-gray-400 text-sm">
                                    PROFESSIONNELS, ÉTUDIANTS ET CURIEUX
                                </p>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all duration-300">
                                <h3 className="text-2xl font-black mb-2 text-blue-400">EXPERTISE</h3>
                                <p className="text-gray-400 text-sm">
                                    L'AVANT-GARDE DE L'IA GÉNÉRATIVE
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Films Competition Section */}
                <section className="py-16 md:py-24 bg-zinc-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-black mb-4">
                                FILMS EN<br />
                                <span className="text-gray-500">COMPÉTITION</span>
                            </h2>
                            <p className="text-gray-400 mb-6 max-w-xl">
                                Découvrez une sélection d'œuvres pionnières explorant les<br />
                                nouvelles frontières de l'imaginaire assisté par IA.
                            </p>
                            <button className="px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white font-bold rounded-lg transition-all duration-300">
                                VOIR LA SÉLECTION →
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-purple-600 to-purple-900 group-hover:scale-105 transition-transform duration-300"></div>
                                <h3 className="text-xl font-bold">PROTOCOL<br />ALPHA</h3>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-pink-500 to-pink-800 group-hover:scale-105 transition-transform duration-300"></div>
                                <h3 className="text-xl font-bold">NEURAL<br />DREAM</h3>
                            </div>
                            <div className="group cursor-pointer">
                                <div className="aspect-video rounded-xl mb-4 bg-gradient-to-br from-blue-500 via-pink-500 to-yellow-500 group-hover:scale-105 transition-transform duration-300"></div>
                                <h3 className="text-xl font-bold">CYBER<br />MARSEILLE</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Objectives Section */}
                <section className="py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
                            OBJECTIFS DU <span className="text-pink-500">FESTIVAL</span>
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 6v6l4 2"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4">L'HUMAIN<br />AU CENTRE</h3>
                                <p className="text-gray-400 text-sm">
                                    METTRE L'HUMAIN AU CŒUR DE LA CRÉATION POUR NE PAS PERDRE L'ÉMOTION
                                </p>
                            </div>
                            
                            <div className="text-center p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4">CHALLENGE<br />CRÉATIF</h3>
                                <p className="text-gray-400 text-sm">
                                    CHALLENGER LA CRÉATIVITÉ GRÂCE À UN FORMAT ULTRA-COURT DE 60S
                                </p>
                            </div>
                            
                            <div className="text-center p-8 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black mb-4">FUTURS<br />SOUHAITABLES</h3>
                                <p className="text-gray-400 text-sm">
                                    EXPLORER LES FUTURS DÉSIRABLES PAR LES TECHNOLOGIES ÉMERGENTES
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Protocol Section */}
                <section className="py-16 md:py-24 bg-zinc-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                        <div className="mb-12">
                            <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-400 bg-white/5 rounded-full">
                                IMMERSION TOTALE
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black">
                                LE PROTOCOLE<br />TEMPOREL
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-pink-500 mb-2">2 MOIS</div>
                                <div className="text-gray-500 text-sm">DE PRÉPARATION</div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-green-400 mb-2">50 FILMS</div>
                                <div className="text-gray-500 text-sm">EN SÉLECTION</div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-pink-500 mb-2">WEB 3.0</div>
                                <div className="text-gray-500 text-sm">EXPÉRIENCE</div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="text-3xl md:text-4xl font-black text-blue-400 mb-2">J4</div>
                                <div className="text-gray-500 text-sm">MARSEILLE</div>
                            </div>
                        </div>
                        
                        <button className="px-10 py-5 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
                            REJOINDRE L'AVENTURE
                        </button>
                    </div>
                </section>

                {/* Conferences Section */}
                <section className="py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
                            DEUX JOURNÉES DE<br />
                            <span className="text-pink-500">CONFÉRENCES GRATUITES</span>
                        </h2>
                        
                        <div className="flex flex-col gap-4 mb-8 max-w-2xl mx-auto">
                            <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-gray-300">
                                1. Débats engagés sur l'éthique et le futur
                            </div>
                            <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-gray-300">
                                2. Confrontations d'idées entre artistes et tech
                            </div>
                            <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800 text-gray-300">
                                3. Interrogations stimulantes sur la création
                            </div>
                        </div>
                        
                        <div className="text-center mb-12">
                            <span className="inline-block px-6 py-3 bg-white/5 rounded-full text-gray-300 cursor-pointer hover:bg-white/10 transition-colors">
                                 AGENDA COMPLET
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-8 bg-white text-black rounded-2xl">
                                <div className="text-3xl mb-4"></div>
                                <h3 className="text-xl font-black mb-2">PROJECTIONS</h3>
                                <p className="text-gray-600">
                                    Diffusion sur écran géant en continu des films
                                </p>
                            </div>
                            
                            <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
                                <div className="text-3xl mb-4 text-pink-500"></div>
                                <h3 className="text-xl font-black mb-2">WORKSHOPS</h3>
                                <p className="text-gray-400">
                                    Sessions pratiques pour maîtriser les outils IA
                                </p>
                            </div>
                            
                            <div className="p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
                                <div className="text-3xl mb-4 text-green-400"></div>
                                <h3 className="text-xl font-black mb-2">AWARDS</h3>
                                <p className="text-gray-400">
                                    Cérémonie de clôture récompensant l'audace
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Night Event Section */}
                <section className="py-16 md:py-24 bg-gradient-to-b from-purple-900/30 to-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex-1">
                                <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-400 bg-white/5 rounded-full">
                                    SOIRÉE DE CLÔTURE
                                </div>
                                <h2 className="text-5xl md:text-6xl font-black mb-4">
                                    MARS.A.I<br />
                                    <span className="text-pink-500">NIGHT</span>
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    Fête-Election mêlant art & futurs souhaitables.<br />
                                    Une expérience immersive sonore et visuelle.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-6 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl"></div>
                                    <div>
                                        <div className="text-2xl font-black">13 JUIN</div>
                                        <div className="text-gray-400">20H - MARSEILLE</div>
                                    </div>
                                </div>
                                <button className="w-full px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors">
                                    RÉSERVER
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Platform Section */}
                <section className="py-16 md:py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="mb-12">
                            <div className="inline-block px-4 py-2 mb-4 text-sm font-medium text-gray-400 bg-white/5 rounded-full">
                                 LE LIEU
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black mb-6">
                                LA<span className="text-blue-400">PLATEFORME</span>
                            </h2>
                            <div className="flex flex-col md:flex-row gap-8 text-gray-400">
                                <div>MARSEILLE MON<br />AMOUR</div>
                                <div>12 Rue d'Uzès, 13002<br />Marseille</div>
                                <div>ACCÈS TRAM T2/T3 ARENC LE SILO</div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <h3 className="text-2xl font-black mb-4">SALLE DES SUCRES</h3>
                                <p className="text-gray-400">
                                    Fête-Elections et conférences et de la remise des prix à Mars.AI. Un espace chargé d'histoire industrielle.
                                </p>
                            </div>
                            
                            <div className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                                <h3 className="text-2xl font-black mb-4">SALLE PLAZA</h3>
                                <p className="text-gray-400">
                                    L'expérience du festival : accueil, animations, workshops et distributions. Le point de rencontre de tous les Naï.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <Footer />
        </>
    );
}

export default Homepage;