import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function NotFound() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center flex-col min-h-150">
        <h1 className="text-7xl text-purple-800 font-extrabold mb-8">404</h1>
        <a href="/" className="">
          <p className="text-2xl font-bold underline">Retour à l'accueil</p>
        </a>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
