import { useEffect, useState } from "react";
import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'

function Header() {
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
        <header className="w-screen p-4 border-red-600 border">           
            <nav className="border-2 border-black/25 rounded-full bg-black/5 max-w-1200px mx-auto p-4  flex flex-row justify-between items-center ">
                <p className="text-fuchsia-800"><strong>MarsAI</strong></p>
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
                                <li>Accueil</li>
                                <li>Films</li>
                                <li>Participer</li>
                                <li>Jury</li>
                                <li>Partenaires</li>
                                <li>A propos</li>
                                <li>Evènements</li>
                            </ul>
                        </div>
                    ):(
                        <div className="bg-gray-800 overflow-y-hidden fixed z-10 top-0 left-[-150%]
                            w-screen min-h-screen flex justify-center items-center flex-col gap-10
                            duration-300 ease-in"></div>                        
                    )}
                    <ul className="items-center gap-4 hidden md:flex" >
                        <li>Accueil</li>
                        <li>Films</li>
                        <li>Participer</li>
                        <li>Jury</li>
                        <li>Partenaires</li>
                        <li>A propos</li>
                        <li>Evènements</li>
                    </ul>              
                </nav>
        </header>
  );
}
export default Header;
