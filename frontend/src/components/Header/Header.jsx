function Header(){
    return(
        <header>
            <nav className="flex flex-row justify-around align-center gap-5  bg-green-200 border-2 border-green-600 p-2 w-screen">
                <div className="flex flex-row justify-evenly grow-2 border-2 border-black p-3 rounded-4xl bg-white opacity-5">
                    <img className="border-2 border-black p-2" alt="Insert a logo here" />
                    <ul className="flex flex-row justify-around grow-2 border-2 border-black p-2 rounded-3xl *:opacity-100" >
                    <li className="border border-red-600">Accueil</li>
                    <li className="border border-red-600">Films</li>
                    <li className="border border-red-600">Participer</li>
                    <li className="border border-red-600">Jury</li>
                    <li className="border border-red-600">Partenaires</li>
                    <li className="border border-red-600">A propos</li>
                    <li className="border border-red-600">Evènements</li>
                </ul>
                </div>
                
            </nav>
        </header>
    )
}
export default Header
