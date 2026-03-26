import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import UploadForm from "../components/Upload_Form/Upload_Form";

function UploadPage(props) {
  return (
    <>
      <meta
        name="description"
        content="Contain the form to register and upload a movie for the MarsAi festival"
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
