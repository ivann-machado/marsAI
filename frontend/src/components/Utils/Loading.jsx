import marsaiLogo from "../../assets/marsai-logo.webp";

function Loading({ dashboard }) {
  return (
    <div
      className="loadingContainer"
      style={dashboard ? { marginLeft: "16rem" } : {}}
    >
      {/* Logo */}
      <img
        src={marsaiLogo}
        alt="MARS AI"
        loading="lazy"
        className="loadingLogo"
      />

      {/* Spinner */}
      <div className="loadinSpinner" />

      {/* Text */}
      <p className="loadingText" style={{ color: "rgba(168,85,247,0.6)" }}>
        Chargement
      </p>
    </div>
  );
}

export default Loading;
