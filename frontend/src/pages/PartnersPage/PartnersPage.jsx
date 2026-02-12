import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function PartnersPage() {
  const [partners, setPartners] = useState(null);
  const { t } = useTranslation();

  if (!partners) return <p>Loading..</p>;

  return <div>PartnersPage: Official, Media, Technical, Other</div>;
}

export default PartnersPage;
