import marsaiLogo from "../../assets/marsai-logo.png";

function Loading({ dashboard }) {
  return (
    <div
      className={
        dashboard
          ? "flex flex-col justify-center items-center w-full h-screen gap-8 ml-64"
          : "flex flex-col justify-center items-center w-full h-screen gap-8"
      }
      style={{ background: "#050508" }}
    >
      {/* Logo */}
      <img
        src={marsaiLogo}
        alt="MARS AI"
        className="w-16 h-16 object-contain opacity-90"
      />

      {/* Spinner */}
      <div
        className="w-10 h-10 rounded-full border-2 border-white/10 animate-spin"
        style={{ borderTopColor: "#a855f7" }}
      />

      {/* Text */}
      <p
        className="font-orbitron text-xs tracking-[0.3em] uppercase"
        style={{ color: "rgba(168,85,247,0.6)" }}
      >
        Chargement
      </p>
    </div>
  );
}

export default Loading;
