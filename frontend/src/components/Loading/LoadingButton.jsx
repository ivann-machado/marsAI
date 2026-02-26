import { useState } from "react";

function LoadingButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="px-10 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 hover:shadow-[0_0_10px_rgba(251,191,36,0.7)] transition-all duration-300"
    >
      {loading ? "Chargement..." : "Envoyer"}
    </button>
  );
}

export default LoadingButton;
