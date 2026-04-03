import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function NotFound() {
  return (
    <>
      <Header />
      <div
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ background: "#050508" }}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-[#ec4899]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
          <h1
            className="font-orbitron font-black text-[8rem] leading-none bg-gradient-to-br from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          >
            404
          </h1>

          <p className="font-inter text-[#a0a0b8] text-lg max-w-sm">
            Cette page n'existe pas ou a été déplacée.
          </p>

          <Link
            to="/"
            className="mt-2 px-8 py-3 bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white font-inter font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
