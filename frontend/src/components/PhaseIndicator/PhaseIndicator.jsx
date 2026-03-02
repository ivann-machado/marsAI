import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const phaseRoutes = { 1: "/", 2: "/phase2", 3: "/phase3" };
const phases = [1, 2, 3];

function PhaseIndicator({ currentPhase }) {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {phases.map((phase) => (
        <div key={phase} className="flex items-center gap-3">
          <Link
            to={phaseRoutes[phase]}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-inter font-semibold text-sm transition-all duration-300 ${
              phase === currentPhase
                ? "bg-white text-black cursor-default pointer-events-none"
                : phase < currentPhase
                ? "bg-white/30 text-white hover:bg-white/50"
                : "bg-white/10 text-white/40 hover:bg-white/20"
            }`}
          >
            {phase}
          </Link>
          {phase < phases.length && (
            <div
              className={`w-12 h-0.5 transition-all duration-300 ${
                phase < currentPhase ? "bg-white/30" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

PhaseIndicator.propTypes = {
  currentPhase: PropTypes.number.isRequired,
};

export default PhaseIndicator;
