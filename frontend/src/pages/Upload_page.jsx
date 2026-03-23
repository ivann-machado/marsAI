import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import UploadForm from "../components/Upload_Form/Upload_Form";

function UploadPage(props) {
  return (
    <>
      <Header />
      <main>
        <UploadForm />
      </main>
      <Footer />
    </>
  );
}

export default UploadPage;
