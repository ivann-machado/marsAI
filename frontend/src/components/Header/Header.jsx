import { useEffect, useState } from "react";
import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'
import { useTranslation } from 'react-i18next';

function Header() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    };
    useEffect(() =>{
        const handleResize = () =>{
            if (window.innerWidth >= 768){
                setIsOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    useEffect(() =>{
        if (isOpen){
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isOpen])
    return (
        <header className="w-screen p-4 bg-gray-900">           
            <nav className="border-2 border-black/25 rounded-full bg-white/30 max-w-1200px mx-auto p-6  flex flex-row justify-between items-center ">
            <div className="flex flex-row justify-center items-center">
                <p className="text-2xl font-bold text-white hover:cursor-pointer">MARS <span className="text-4xl text-indigo-500 font-bold">AI</span></p>
            </div>                
                {!isOpen && (
                        <div onClick={toggleMenu} className="cursor-pointer md:hidden">
                            <img src={viteLogo} className="logo" alt="Vite logo" size={30} />
                        </div>
                    )}
                    {isOpen && (
                        <div onClick={toggleMenu} className="cursor-pointer md:hidden z-20 fixed top-6 right-6">
                            <img src={reactLogo} className="logo react" alt="React logo" size={30} />
                        </div>
                    )}
                    {isOpen ? (
                        <div>
                            <ul className="bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-0
                            w-screen min-h-screen flex justify-center items-center flex-col gap-10
                            duration-300 ease-in border-red-600 border" >
                                <li className="hover:underline">{t('home')}</li>
                                <li className="hover:underline">{t('gallery')}</li>
                                <li className="hover:underline">{t('participate')}</li>
                                <li className="hover:underline">{t('board')}</li>
                                <li className="hover:underline">{t('partners')}</li>
                                <li className="hover:underline">{t('about')}</li>
                                <li className="hover:underline">{t('schedule')}</li>
                            </ul>
                        </div>
                    ):(
                        <div className="bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-[-150%]
                            w-screen min-h-screen flex justify-center items-center flex-col gap-10
                            duration-300 ease-in"></div>                        
                    )}
                    <ul className="items-center gap-4 hidden md:flex" >
                        <li className="hover:underline hover:cursor-pointer">{t('home')}</li>
                        <li className="hover:underline hover:cursor-pointer">{t('gallery')}</li>
                        <li className="hover:underline hover:cursor-pointer">{t('participate')}</li>
                        <li className="hover:underline hover:cursor-pointer">{t('board')}</li>
                        <li className="hover:underline hover:cursor-pointer">{t('partners')}</li>
                        <li className="hover:underline hover:cursor-pointer">{t('about')}</li>
                        <li className="hover:underline hover:cursor-pointer">{t('schedule')}</li>
                    </ul>              
                </nav>
        </header>
  );
}
export default Header;
