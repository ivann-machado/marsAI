import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import UploadForm from "../components/Upload_Form/Upload_Form";

function UploadPage(props) {
  return (
    <>
      <meta
        name="description"
        content="Grâce au formulaire présent sur cette page, vous pourrez ajouter votre film parmi les concurrents du festival et peut-être figuré parmi les vainqueurs du concours !"
      />
      <Header />
      <main>
        <UploadForm />
      </main>
      <Footer />
    </>
  );
}

export default UploadPage;
