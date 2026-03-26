import { Link, useParams } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import Homepage from "../homepage/Homepage.jsx";
import Homepage2 from "../Homepage-Phase2/Homepage2.jsx";
import Homepage3 from "../Homepage-Phase3/Homepage3.jsx";
import i18n from "../../config/i18n";
import { useState, useEffect } from "react";

function AdminEdit() {
  const params = useParams();
  const page = params.page;
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = currentLang === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const onChange = (lng) => setCurrentLang(lng);
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, []);

  // console.log(page);
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-4/5 ml-64">
        <nav className="w-full bg-black text-white flex justify-around p-3">
          <Link to="/edit/homepage" className="hover:underline">
            Homepage Phase 1
          </Link>
          <Link to="/edit/homepage2" className="hover:underline">
            Homepage Phase 2
          </Link>
          <Link to="/edit/homepage3" className="hover:underline">
            Homepage Phase 3
          </Link>
          <button
            onClick={toggleLanguage}
            className="relative flex items-center gap-1 px-3 py-2 rounded-full bg-white border border-white/10 hover:bg-white/10 transition-all"
            aria-label="Toggle language"
          ></button>
        </nav>

        {page === "homepage" ? <Homepage /> : null}
        {page === "homepage2" ? <Homepage2 /> : null}
        {page === "homepage3" ? <Homepage3 /> : null}
      </div>
    </div>
  );
}

export default AdminEdit;
