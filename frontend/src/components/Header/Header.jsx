import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import viteLogo from "/vite.svg";
import reactLogo from "../../assets/react.svg";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <header className="w-screen p-4 bg-gray-950">
      <nav className="border-2 border-white/25 rounded-full bg-white/30 max-w-1200px mx-auto p-6 flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="text-2xl font-bold text-white hover:cursor-pointer">
            MARS<span className="text-4xl text-indigo-500 font-bold">AI</span>
          </p>
        </div>
        {!isOpen && (
          <div onClick={toggleMenu} className="cursor-pointer md:hidden">
            <img src={viteLogo} className="logo" alt="Vite logo" size={30} />
          </div>
        )}
        {isOpen && (
          <div
            onClick={toggleMenu}
            className="cursor-pointer md:hidden z-20 fixed top-6 right-6"
          >
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
              size={30}
            />
          </div>
        )}
        {isOpen ? (
          <div>
            <ul
              className="bg-gray-900 overflow-y-hidden fixed z-10 top-0 left-0
                            w-screen min-h-screen flex justify-center items-center flex-col gap-10
                            duration-300 ease-in text-white"
            >
              <li className="text-xl font-extrabold min-h-30 min-w-9/10 flex justify-center items-center">
                <Link to="/" onClick={toggleMenu}>
                  {t("header.home")}
                </Link>
              </li>
              <li className="text-xl font-extrabold min-h-30 min-w-9/10 flex justify-center items-center ">
                <Link to="/gallery" onClick={toggleMenu}>
                  {t("header.gallery")}
                </Link>
              </li>
              <li className="text-xl font-extrabold min-h-30 min-w-9/10 flex justify-center items-center ">
                <Link to="/participate" onClick={toggleMenu}>
                  {t("header.participate")}
                </Link>
              </li>
              <li className="text-xl font-extrabold min-h-30 min-w-9/10 flex justify-center items-center ">
                <Link to="/jury" onClick={toggleMenu}>
                  {t("header.board")}
                </Link>
              </li>
              <li className="text-xl font-extrabold min-h-30 min-w-9/10 flex justify-center items-center    ">
                <Link to="/partners" onClick={toggleMenu}>
                  {t("header.partners")}
                </Link>
              </li>
              {/* <li className="hover:underline">
                <Link to="/about" onClick={toggleMenu}>
                  {t("header.about")}
                </Link>
              </li>
              <li className="hover:underline">
                <Link to="/schedule" onClick={toggleMenu}>
                  {t("header.schedule")}
                </Link>
              </li> */}
            </ul>
          </div>
        ) : (
          <div
            className="bg-gray-800 overflow-y-hidden fixed z-15 top-0 left-[-150%]
                            w-screen min-h-screen flex justify-center items-center flex-col gap-10
                            duration-300 ease-in"
          ></div>
        )}
        <ul className="items-center gap-4 hidden md:flex text-gray-200 text-2xl">
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/">{t("header.home")}</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/gallery">{t("header.gallery")}</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/participate">{t("header.participate")}</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/jury">{t("header.board")}</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/partners">{t("header.partners")}</Link>
          </li>
          {/*   <li className="hover:underline hover:cursor-pointer">
            <Link to="/about">{t("header.about")}</Link>
          </li>
          <li className="hover:underline hover:cursor-pointer">
            <Link to="/schedule">{t("header.schedule")}</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
