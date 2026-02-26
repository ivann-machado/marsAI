import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../Upload_Form/upload.css";
import { useFlash } from "../../context/FlashContext";
import LoadingButton from "../Loading/LoadingButton";

function UploadForm() {
  const { showFlash } = useFlash();
  const { t } = useTranslation();
  const [countryId, SetCountryId] = useState(null);
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [loading, SetLoading] = useState(false);
  const countryOptions = [
    { label: "--Sélectionnez un pays--", value: -1 },
    { label: "Afghanistan", value: 1 },
    { label: "Afrique du Sud", value: 2 },
    { label: "Albanie", value: 3 },
    { label: "Algérie", value: 4 },
    { label: "Allemagne", value: 5 },
    { label: "Andorre", value: 6 },
    { label: "Angola", value: 7 },
    { label: "Antigua-et-Barbuda", value: 8 },
    { label: "Arabie saoudite", value: 9 },
    { label: "Argentine", value: 10 },
    { label: "Arménie", value: 11 },
    { label: "Australie", value: 12 },
    { label: "Autriche", value: 13 },
    { label: "Azerbaïdjan", value: 14 },
    { label: "Bahamas", value: 15 },
    { label: "Bahreïn", value: 16 },
    { label: "Bangladesh", value: 17 },
    { label: "Barbade", value: 18 },
    { label: "Belgique", value: 19 },
    { label: "Belize", value: 20 },
    { label: "Bénin", value: 21 },
    { label: "Bhoutan", value: 22 },
    { label: "Biélorussie", value: 23 },
    { label: "Bolivie", value: 24 },
    { label: "Bosnie-Herzégovine", value: 25 },
    { label: "Botswana", value: 26 },
    { label: "Brésil", value: 27 },
    { label: "Brunei", value: 28 },
    { label: "Bulgarie", value: 29 },
    { label: "Burkina Faso", value: 30 },
    { label: "Burundi", value: 31 },
    { label: "Cambodge", value: 32 },
    { label: "Cameroun", value: 33 },
    { label: "Canada", value: 34 },
    { label: "Cap-Vert", value: 35 },
    { label: "Chili", value: 36 },
    { label: "Chine", value: 37 },
    { label: "Chypre", value: 38 },
    { label: "Colombie", value: 39 },
    { label: "Comores", value: 40 },
    { label: "Congo", value: 41 },
    { label: "Congo (République démocratique du)", value: 42 },
    { label: "Corée du Nord", value: 43 },
    { label: "Corée du Sud", value: 44 },
    { label: "Costa Rica", value: 45 },
    { label: "Côte d’Ivoire", value: 46 },
    { label: "Croatie", value: 47 },
    { label: "Cuba", value: 48 },
    { label: "Danemark", value: 49 },
    { label: "Djibouti", value: 50 },
    { label: "Dominique", value: 51 },
    { label: "Égypte", value: 52 },
    { label: "Émirats arabes unis", value: 53 },
    { label: "Équateur", value: 54 },
    { label: "Érythrée", value: 55 },
    { label: "Espagne", value: 56 },
    { label: "Estonie", value: 57 },
    { label: "Eswatini", value: 58 },
    { label: "États-Unis", value: 59 },
    { label: "Éthiopie", value: 60 },
    { label: "Fidji", value: 61 },
    { label: "Finlande", value: 62 },
    { label: "France", value: 63 },
    { label: "Gabon", value: 64 },
    { label: "Gambie", value: 65 },
    { label: "Géorgie", value: 66 },
    { label: "Ghana", value: 67 },
    { label: "Grèce", value: 68 },
    { label: "Grenade", value: 69 },
    { label: "Guatemala", value: 70 },
    { label: "Guinée", value: 71 },
    { label: "Guinée-Bissau", value: 72 },
    { label: "Guinée équatoriale", value: 73 },
    { label: "Guyana", value: 74 },
    { label: "Haïti", value: 75 },
    { label: "Honduras", value: 76 },
    { label: "Hongrie", value: 77 },
    { label: "Îles Marshall", value: 78 },
    { label: "Îles Salomon", value: 79 },
    { label: "Inde", value: 80 },
    { label: "Indonésie", value: 81 },
    { label: "Irak", value: 82 },
    { label: "Iran", value: 83 },
    { label: "Irlande", value: 84 },
    { label: "Islande", value: 85 },
    { label: "Israël", value: 86 },
    { label: "Italie", value: 87 },
    { label: "Jamaïque", value: 88 },
    { label: "Japon", value: 89 },
    { label: "Jordanie", value: 90 },
    { label: "Kazakhstan", value: 91 },
    { label: "Kenya", value: 92 },
    { label: "Kirghizistan", value: 93 },
    { label: "Kiribati", value: 94 },
    { label: "Koweït", value: 95 },
    { label: "Laos", value: 96 },
    { label: "Lesotho", value: 97 },
    { label: "Lettonie", value: 98 },
    { label: "Liban", value: 99 },
    { label: "Liberia", value: 100 },
    { label: "Libye", value: 101 },
    { label: "Liechtenstein", value: 102 },
    { label: "Lituanie", value: 103 },
    { label: "Luxembourg", value: 104 },
    { label: "Macédoine du Nord", value: 105 },
    { label: "Madagascar", value: 106 },
    { label: "Malaisie", value: 107 },
    { label: "Malawi", value: 108 },
    { label: "Maldives", value: 109 },
    { label: "Mali", value: 110 },
    { label: "Malte", value: 111 },
    { label: "Maroc", value: 112 },
    { label: "Maurice", value: 113 },
    { label: "Mauritanie", value: 114 },
    { label: "Mexique", value: 115 },
    { label: "Micronésie", value: 116 },
    { label: "Moldavie", value: 117 },
    { label: "Monaco", value: 118 },
    { label: "Mongolie", value: 119 },
    { label: "Monténégro", value: 120 },
    { label: "Mozambique", value: 121 },
    { label: "Myanmar", value: 122 },
    { label: "Namibie", value: 123 },
    { label: "Nauru", value: 124 },
    { label: "Népal", value: 125 },
    { label: "Nicaragua", value: 126 },
    { label: "Niger", value: 127 },
    { label: "Nigéria", value: 128 },
    { label: "Norvège", value: 129 },
    { label: "Nouvelle-Zélande", value: 130 },
    { label: "Oman", value: 131 },
    { label: "Ouganda", value: 132 },
    { label: "Ouzbékistan", value: 133 },
    { label: "Pakistan", value: 134 },
    { label: "Palaos", value: 135 },
    { label: "Panama", value: 136 },
    { label: "Papouasie-Nouvelle-Guinée", value: 137 },
    { label: "Paraguay", value: 138 },
    { label: "Pays-Bas", value: 139 },
    { label: "Pérou", value: 140 },
    { label: "Philippines", value: 141 },
    { label: "Pologne", value: 142 },
    { label: "Portugal", value: 143 },
    { label: "Qatar", value: 144 },
    { label: "République centrafricaine", value: 145 },
    { label: "République dominicaine", value: 146 },
    { label: "République tchèque", value: 147 },
    { label: "Roumanie", value: 148 },
    { label: "Royaume-Uni", value: 149 },
    { label: "Russie", value: 150 },
    { label: "Rwanda", value: 151 },
    { label: "Saint-Kitts-et-Nevis", value: 152 },
    { label: "Saint-Marin", value: 153 },
    { label: "Saint-Vincent-et-les-Grenadines", value: 154 },
    { label: "Sainte-Lucie", value: 155 },
    { label: "Salvador", value: 156 },
    { label: "Samoa", value: 157 },
    { label: "Sao Tomé-et-Principe", value: 158 },
    { label: "Sénégal", value: 159 },
    { label: "Serbie", value: 160 },
    { label: "Seychelles", value: 161 },
    { label: "Sierra Leone", value: 162 },
    { label: "Singapour", value: 163 },
    { label: "Slovaquie", value: 164 },
    { label: "Slovénie", value: 165 },
    { label: "Somalie", value: 166 },
    { label: "Soudan", value: 167 },
    { label: "Soudan du Sud", value: 168 },
    { label: "Sri Lanka", value: 169 },
    { label: "Suède", value: 170 },
    { label: "Suisse", value: 171 },
    { label: "Suriname", value: 172 },
    { label: "Syrie", value: 173 },
    { label: "Tadjikistan", value: 174 },
    { label: "Tanzanie", value: 175 },
    { label: "Tchad", value: 176 },
    { label: "Thaïlande", value: 177 },
    { label: "Timor oriental", value: 178 },
    { label: "Togo", value: 179 },
    { label: "Tonga", value: 180 },
    { label: "Trinité-et-Tobago", value: 181 },
    { label: "Tunisie", value: 182 },
    { label: "Turkménistan", value: 183 },
    { label: "Turquie", value: 184 },
    { label: "Tuvalu", value: 185 },
    { label: "Ukraine", value: 186 },
    { label: "Uruguay", value: 187 },
    { label: "Vanuatu", value: 188 },
    { label: "Vatican", value: 189 },
    { label: "Venezuela", value: 190 },
    { label: "Viêt Nam", value: 191 },
    { label: "Yémen", value: 192 },
    { label: "Zambie", value: 193 },
    { label: "Zimbabwe", value: 194 },
  ];

  function handleSelect(event) {
    SetCountryId(event.target.value);
  }
  //Stockage des valeurs de chaques input dans leurs variables respectives
  const title = useRef(null);
  const description = useRef(null);
  const video = useRef(null);
  const coverImage = useRef(null);
  const scenario_ai = useRef(null);
  const video_ai = useRef(null);
  const sound_ai = useRef(null);
  const post_prod_ai = useRef(null);
  const producer = useRef(null);
  const producerImage = useRef(null);
  const instagram = useRef(null);
  const linkedin = useRef(null);
  const youtube = useRef(null);
  const email = useRef(null);
  const tags = useRef(null);
  const [majorityCertification, SetMajorityCertification] = useState(false);
  console.log({ majorityCertification });
  const certficitationHandler = () => {
    SetMajorityCertification(!majorityCertification);
  };

  const [rightGivaway, SetRightGivaway] = useState(false);
  const rightGiveAwayHandler = () => {
    SetRightGivaway(!rightGivaway);
  };
  //Messages d'erreur
  const [titleError, SetTitleError] = useState();
  const [descError, SetDescError] = useState("");
  const [videoError, SetVideoError] = useState("");
  const [coverImageError, SetCoverImageError] = useState("");
  const [scenarioAiError, SetScenarioAiError] = useState("");
  const [videoAiError, SetVideoAiError] = useState("");
  const [soundAiError, SetSoundAiError] = useState("");
  const [postProdAiError, SetPostProdAiError] = useState("");
  const [producerError, SetProducerError] = useState("");
  const [producerImageError, SetProducerImageError] = useState("");
  const [instagramError, SetInstagramError] = useState("");
  const [linkedinError, SetLinkedinError] = useState("");
  const [youtubeError, SetYoutubeError] = useState("");
  const [emailError, SetEmailError] = useState("");
  const [tagError, SetTagError] = useState("");
  //Récupération des données envoyées
  const [videoURL, setVideoURL] = useState(null);
  //Stockage des valeurs des inputs
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const uploadData = {
        title: title.current.value,
        description: description.current.value,
        video: video.current.files[0],
        image: coverImage.current.files[0],
        scenario_ai: scenario_ai.current.value,
        video_ai: video_ai.current.value,
        sound_ai: sound_ai.current.value,
        post_prod_ai: post_prod_ai.current.value,
        producer: producer.current.value,
        email: email.current.value,
        producerImage: producerImage.current.files[0],
        country: countryId,
        instagram: instagram.current.value,
        linkedin: linkedin.current.value,
        youtube: youtube.current.value,
        tags: tags.current.value,
      };
      coverImageCheck();
      majorityCheck();
      rightGiveAwayCheck();
      const formData = new FormData();
      formData.append("edition_id", 1);
      formData.append("url", "");
      formData.append("verified", 1);
      formData.append("filename", uploadData.video);
      formData.append("email", uploadData.email);
      formData.append("cover_image", uploadData.image);
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      formData.append("status", "unverified");
      formData.append("country_id", uploadData.country);
      formData.append("producer", uploadData.producer);
      formData.append("producer_image", uploadData.producerImage);
      formData.append("linkedin_link", uploadData.linkedin);
      formData.append("youtube_link", uploadData.youtube);
      formData.append("scenario_ai", uploadData.scenario_ai);
      formData.append("video_gen_ai", uploadData.video_ai);
      formData.append("sound_ai", uploadData.sound_ai);
      formData.append("postprod_ai", uploadData.post_prod_ai);
      formData.append("tags", uploadData.tags);

      console.log(uploadData);
      SetLoading(true);
      const res = await fetch(import.meta.env.VITE_API_URL + "/api/videos", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        SetLoading(false);
        showFlash("success", "Film envoyé avec succès.");
        //Création d'un URL pour afficher les files
        if (uploadData.video) {
          const url = URL.createObjectURL(uploadData.video);
          console.log({ url });
          setVideoURL(url);
        }
      } else {
        alert(data.video || "Erreur lors de l'envoi du film.");
        SetLoading(false);
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      showFlash("error", "Erreur réseau. Réessayez plus tard.");
    }
  };
  //Vérification des champs du formulaire
  function titleCheck() {
    if (title.current.value.trim() === "") {
      SetTitleError("Champ vide");
      console.log("Input is empty");
    } else if (title.current.value.length < 5) {
      //Taille temporaire (placeholder !!!!!!)
      SetTitleError("Ce champ doit être plus grand");
      console.log("Input is too short");
    } else if (title.current.value.length > 50) {
      //Taille temporaire (placeholder !!!!!!)
      SetTitleError("Ce champ doit être plus petit");
      console.log("Input is too long");
    } else {
      SetTitleError();
    }
  }
  function descCheck() {
    if (description.current.value.trim() === "") {
      SetDescError("Champ vide");
      console.log("Input is empty");
    } else if (description.current.value.length < 10) {
      //Taille temporaire (placeholder !!!!!!)
      SetDescError("Ce champ doit être plus grand");
      console.log("Input is too short");
    } else if (description.current.value.length > 300) {
      //Taille temporaire (placeholder !!!!!!)
      SetDescError("Ce champ doit être plus petit");
      console.log("Input is too long");
    } else {
      SetDescError("");
    }
  }
  function videoCheck() {
    if (video.current.value.trim() === "") {
      SetVideoError("Champ vide");
      console.log("Input is empty");
    } else {
      SetVideoError("");
    }
  }
  function coverImageCheck() {
    if (coverImage.current.files[0] === null) {
      showFlash("error", "Vous devez sélectionner une image de couverture");
      console.log("Input is empty");
    } else {
      SetCoverImageError("");
    }
  }
  function scenarioAiCheck() {
    if (scenario_ai.current.value.trim() === "") {
      SetScenarioAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetScenarioAiError("");
    }
  }
  function videoAiCheck() {
    if (video_ai.current.value.trim() === "") {
      SetVideoAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetVideoAiError("");
    }
  }
  function soundAiCheck() {
    if (sound_ai.current.value.trim() === "") {
      SetSoundAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetSoundAiError("");
    }
  }
  function postProdAiCheck() {
    if (post_prod_ai.current.value.trim() === "") {
      SetPostProdAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetPostProdAiError("");
    }
  }
  function producerCheck() {
    if (producer.current.value.trim() === "") {
      SetProducerError("Champ vide");
      console.log("Input is empty");
    } else {
      SetProducerError("");
    }
  }
  function instagramCheck() {
    if (instagram.current.value.trim() === "") {
      SetInstagramError("Champ vide");
      console.log("Input is empty");
    } else {
      SetInstagramError("");
    }
  }
  function linkedinCheck() {
    if (linkedin.current.value.trim() === "") {
      SetLinkedinError("Champ vide");
      console.log("Input is empty");
    } else {
      SetLinkedinError("");
    }
  }
  function youtubeCheck() {
    if (youtube.current.value.trim() === "") {
      SetYoutubeError("Champ vide");
      console.log("Input is empty");
    } else {
      SetYoutubeError("");
    }
  }
  function emailCheck() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.current.value.trim() === "") {
      SetEmailError("Champ vide");
      console.log("Input is empty");
    } else if (!regex.test(email.current.value)) {
      SetEmailError("Format d'email invalide");
    } else {
      SetEmailError("");
    }
  }
  function majorityCheck() {
    if (majorityCertification === false) {
      showFlash("error", t("upload_form.majority_certification_flash"));
      console.log("Vous devez être agé de 18 ans ou plus");
    }
  }
  function rightGiveAwayCheck() {
    if (rightGivaway === false) {
      showFlash("error", t("upload_form.right_givaway_flash"));
      console.log("Vous devez être agé de 18 ans ou plus");
    }
  }
  function tagCheck() {
    if (tags.current.value.trim() === "") {
      SetTagError("Champ vide");
      console.log("Input is empty");
    } else {
      SetTagError("");
    }
  }

  const formSubmit = useState(false);
  return (
    <div
      className="min-h-screen flex items-center justify-center 
bg-gradient-to-br from-[#0f0f1a] via-[#1a1026] to-[#0f0f1a] p-6 font-inter"
    >
      {/*  <form
        onSubmit={handleSubmit}
        className="bg-[#1B1B1B] shadow-[0px_0px_10px_2px] shadow-blue-600/75 w-9/10 rounded-4xl flex flex-col items-center gap-2 pt-4 pb-4"
      >
        <h3 className="text-white">{t("upload_form.upload_message")} !</h3>
        <div className=" flex flex-col gap-2 p-2 w-9/10">
          <p className="text-[#C27AFF] text-2xl">
            {t("upload_form.global_infos")}
          </p>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="title" className="text-white text-lg">
                {t("upload_form.title")} :
              </label>
              <input
                type="text"
                name="title"
                id="title"
                ref={title}
                onChange={() => {
                  titleCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{titleError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="description" className="text-white">
                {t("upload_form.desc")} :
              </label>
              <input
                type="text"
                name="description"
                id="description"
                ref={description}
                onChange={() => {
                  descCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{descError}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="video" className="text-white">
                {t("upload_form.video")} :
              </label>
              <input
                type="file"
                name="video"
                id="video"
                ref={video}
                onChange={() => {
                  videoCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{videoError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="image" className="text-white">
                {t("upload_form.image")} :
              </label>
              <input
                type="file"
                name="cover-image"
                id="cover-mage"
                ref={coverImage}
                onChange={() => {
                  coverImageCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{coverImageError}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 p-2 w-9/10">
          <p className="text-[#C27AFF] text-2xl">
            {t("upload_form.production")}
          </p>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="scenario_ai" className="text-white">
                {t("upload_form.scenario_ai")} :
              </label>
              <input
                type="text"
                name="scenario_ai"
                id="scenario_ai"
                ref={scenario_ai}
                onChange={() => {
                  scenarioAiCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{scenarioAiError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="video_ai" className="text-white">
                {t("upload_form.video_ai")} :
              </label>
              <input
                type="text"
                name="video_ai"
                id="video_ai"
                ref={video_ai}
                onChange={() => {
                  videoAiCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{videoAiError}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="sound_ai" className="text-white">
                {t("upload_form.sound_ai")} :
              </label>
              <input
                type="text"
                name="sound_ai"
                id="sound_ai"
                ref={sound_ai}
                onChange={() => {
                  soundAiCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{soundAiError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="post_prod_ai" className="text-white">
                {t("upload_form.post_prod_ai")} :
              </label>
              <input
                type="text"
                name="post_prod_ai"
                id="post_prod_ai"
                ref={post_prod_ai}
                onChange={() => {
                  postProdAiCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{postProdAiError}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 p-2 w-9/10">
          <p className="text-[#C27AFF] text-2xl">
            {t("upload_form.more_info")}
          </p>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="more_info" className="text-white">
                {t("upload_form.producer")} :
              </label>
              <input
                type="text"
                name="producer"
                id="producer"
                ref={producer}
                onChange={() => {
                  producerCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{producerError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="instagram" className="text-white">
                Instagram :
              </label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                ref={instagram}
                onChange={() => {
                  instagramCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{instagramError}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="linkedin" className="text-white">
                Linkedin :
              </label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                ref={linkedin}
                onChange={() => {
                  linkedinCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{linkedinError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="youtube" className="text-white">
                Youtube :
              </label>
              <input
                type="text"
                name="youtube"
                id="youtube"
                ref={youtube}
                onChange={() => {
                  youtubeCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{youtubeError}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="email" className="text-white">
                Email :
              </label>
              <input
                type="text"
                name="email"
                id="email"
                ref={email}
                onChange={() => {
                  emailCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{emailError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="tags" className="text-white">
                Tags :
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                ref={tags}
                onChange={() => {
                  tagCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{tagError}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="producerImage" className="text-white">
                Photo :
              </label>
              <input
                type="file"
                name="producerImage"
                id="producerImage"
                ref={producerImage}
                onChange={() => {
                  coverImageCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{coverImageError}</p>
            </div>
            <div className="flex flex-col md:w-full md:max-w-150">
              <label htmlFor="countrySelect" className="text-white">
                Votre Pays :
              </label>
              <select
                name="countrySelect"
                id="countrySelect"
                onChange={handleSelect}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              >
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-white">{countryId}</p>
              <p className="text-white">{tagError}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2 w-9/10 md:flex-row md:justify-evenly md:p-2">
          <div className="flex flex-col md:w-4/10">
            <div className="flex flex-row gap-4">
              <input
                type="checkbox"
                name="majority_certification"
                id="majority_certification"
                checked={majorityCertification}
                onChange={onCheckHandler}
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <label htmlFor="majority_certification" className="text-white">
                {t("upload_form.majority_certification")}
              </label>
            </div>
            <p className="text-white">{majorityCertificationError}</p>
          </div>

          <div className="flex flex-row justify-evenly md:w-4/10">
            <input
              type="checkbox"
              name="right_givaway"
              id="right_givaway"
              checked={rightGivaway}
              onChange={(e) => SetRightGivaway(e.target.checked)}
              className="bg-gray-700 border border-gray-500 rounded-lg"
            />
            <label htmlFor="right_givaway" className="text-white w-5/10">
              {t("upload_form.right_givaway")}
            </label>
          </div>
        </div>
        <button
          type="submit"
          name="submit_button"
          id="submit_button"
          onClick={(formSubmit) => true}
          className="bg-linear-to-b from-[#fbc700] via-[#f0b100] to-[#d08700] p-2 rounded-lg md:max-w-5/10 md:hover:cursor-pointer"
        >
          {t("upload_form.submit_btn")} {">>"}{" "}
        </button>
      </form> */}
      <form
        onSubmit={handleSubmit}
        className="
relative w-[95%] max-w-4xl
bg-white/5 backdrop-blur-xl
border border-white/10
rounded-3xl
shadow-[0_0_40px_rgba(194,122,255,0.25)]
flex flex-col items-center gap-10
px-6 md:px-12 py-10
overflow-hidden
"
      >
        <div
          className="absolute -top-40 -left-40 w-96 h-96 
bg-purple-600/20 rounded-full blur-3xl"
        />
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
               transition-all duration-700 ease-out"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>

        {/* Animated Container */}
        <div className="relative w-full overflow-hidden">
          {/* ================= STEP 1 ================= */}
          <div
            className={`transition-all duration-500 w-full ${
              step === 0
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full absolute"
            }`}
          >
            <p
              className="
text-3xl md:text-4xl font-semibold
text-transparent bg-clip-text
bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300
text-center mb-8  pb-2 pt-2
"
            >
              {t("upload_form.global_infos")}
            </p>

            {/* TITLE */}
            <div className="flex flex-col p-4">
              <label className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.title")} :
              </label>
              <input
                type="text"
                ref={title}
                onChange={titleCheck}
                className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
              />
              <p className="text-red-400">{titleError}</p>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col p-4">
              <label className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.desc")} :
              </label>
              <input
                type="text"
                ref={description}
                onChange={descCheck}
                className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
              />
              <p className="text-red-400">{descError}</p>
            </div>

            <div className="flex flex-col p-4">
              <label
                htmlFor="video"
                className="text-sm text-white/70 mb-2 tracking-wide"
              >
                {t("upload_form.video")} :
              </label>
              <input
                type="file"
                name="video"
                id="video"
                ref={video}
                onChange={() => {
                  videoCheck();
                }}
                className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none pt-3 pb-2
"
              />
              <p className="text-white">{videoError}</p>
            </div>
            <div className="flex flex-col p-4">
              <label
                htmlFor="image"
                className="text-sm text-white/70 mb-2 tracking-wide "
              >
                {t("upload_form.image")} :
              </label>
              <input
                type="file"
                name="cover-image"
                id="cover-mage"
                ref={coverImage}
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
              />
              <p className="text-white">{coverImageError}</p>
            </div>

            <div className="flex justify-end p-4">
              <button
                type="button"
                onClick={nextStep}
                className="
px-8 py-3
rounded-xl
font-medium
bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
hover:scale-105
hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
transition-all duration-300
text-white
"
              >
                Next →
              </button>
            </div>
          </div>

          {/* ================= STEP 2 ================= */}
          <div
            className={`transition-all duration-500 w-full ${
              step === 1
                ? "opacity-100 translate-x-0"
                : step < 1
                  ? "opacity-0 translate-x-full absolute"
                  : "opacity-0 -translate-x-full absolute"
            }`}
          >
            <p
              className="
text-3xl md:text-4xl font-semibold
text-transparent bg-clip-text
bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300
text-center mb-8
"
            >
              {t("upload_form.production")}
            </p>

            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="more_info"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.producer")} :
                </label>
                <input
                  type="text"
                  name="producer"
                  id="producer"
                  ref={producer}
                  onChange={() => {
                    producerCheck();
                  }}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{producerError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="producerImage"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.producer_cover")} :
                </label>
                <input
                  type="file"
                  name="producerImage"
                  id="producerImage"
                  ref={producerImage}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
                />
                <p className="text-white">{coverImageError}</p>
              </div>
            </div>
            <div className=" flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="scenario_ai"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.scenario_ai")} :
                </label>
                <input
                  type="text"
                  name="scenario_ai"
                  id="scenario_ai"
                  ref={scenario_ai}
                  onChange={() => {
                    scenarioAiCheck();
                  }}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40transition-all duration-300 outline-none"
                />
                <p className="text-white">{scenarioAiError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="video_ai"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.video_ai")} :
                </label>
                <input
                  type="text"
                  name="video_ai"
                  id="video_ai"
                  ref={video_ai}
                  onChange={() => {
                    videoAiCheck();
                  }}
                  className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
                />
                <p className="text-white">{videoAiError}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="sound_ai"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.sound_ai")} :
                </label>
                <input
                  type="text"
                  name="sound_ai"
                  id="sound_ai"
                  ref={sound_ai}
                  onChange={() => {
                    soundAiCheck();
                  }}
                  className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
                />
                <p className="text-white">{soundAiError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="post_prod_ai"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.post_prod_ai")} :
                </label>
                <input
                  type="text"
                  name="post_prod_ai"
                  id="post_prod_ai"
                  ref={post_prod_ai}
                  onChange={() => {
                    postProdAiCheck();
                  }}
                  className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
                />
                <p className="text-white">{postProdAiError}</p>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <button
                type="button"
                onClick={prevStep}
                className="
px-6 py-3
rounded-xl
bg-white/10
hover:bg-white/20
transition-all duration-300
text-white
"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="
px-8 py-3
rounded-xl
font-medium
bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400
hover:scale-105
hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
transition-all duration-300
text-white
"
              >
                Next →
              </button>
            </div>
          </div>

          {/* ================= STEP 3 ================= */}
          <div
            className={`transition-all duration-500 w-full ${
              step === 2
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute"
            }`}
          >
            <p
              className="
text-3xl md:text-4xl font-semibold
text-transparent bg-clip-text
bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300
text-center mb-8
"
            >
              {t("upload_form.more_info")}
            </p>

            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="linkedin"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Linkedin :
                </label>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  ref={linkedin}
                  onChange={() => {
                    linkedinCheck();
                  }}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{linkedinError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="youtube"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Youtube :
                </label>
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  ref={youtube}
                  onChange={() => {
                    youtubeCheck();
                  }}
                  className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
                />
                <p className="text-white">{youtubeError}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="email"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Email :
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  ref={email}
                  onChange={() => {
                    emailCheck();
                  }}
                  className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
                />
                <p className="text-white">{emailError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="tags"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Tags :
                </label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  ref={tags}
                  onChange={() => {
                    tagCheck();
                  }}
                  className="
bg-white/5
border border-white/20
focus:border-purple-400
focus:ring-2 focus:ring-purple-500/40
rounded-xl
h-12
px-4
text-white
placeholder-white/40
transition-all duration-300
outline-none
"
                />
                <p className="text-white">{tagError}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="instagram"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Instagram :
                </label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  ref={instagram}
                  onChange={() => {
                    instagramCheck();
                  }}
                  className=" bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{instagramError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="countrySelect"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  {t("upload_form.country")} :
                </label>
                <select
                  name="countrySelect"
                  id="countrySelect"
                  onChange={handleSelect}
                  className="bg-[#2D2738] border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value + 1}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-white">{tagError}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-row gap-4 md:w-4/10 items-center">
                <input
                  type="checkbox"
                  name="majority_certification"
                  id="majority_certification"
                  checked={majorityCertification}
                  onChange={certficitationHandler}
                  className="bg-gray-700 border border-gray-500 rounded-lg"
                />
                <label htmlFor="majority_certification" className="text-white">
                  {t("upload_form.majority_certification")}
                </label>
              </div>
              {/* <p className="text-white">{majorityCertificationError}</p> */}

              <div className="flex flex-row gap-4 md:w-4/10">
                <input
                  type="checkbox"
                  name="right_givaway"
                  id="right_givaway"
                  checked={rightGivaway}
                  onChange={rightGiveAwayHandler}
                  className="bg-gray-700 border border-gray-500 rounded-lg"
                />
                <label htmlFor="right_givaway" className="text-white">
                  {t("upload_form.right_givaway")}
                </label>
              </div>
            </div>

            {/* <p className="text-red-400">{majorityCertificationError}</p> */}

            <div className="flex justify-between p-4">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
              >
                ← Back
              </button>

              <LoadingButton type="submit" loading={loading}>
                {t("upload_form.submit_btn")} →
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
      {/* <div>
        {videoURL && (
          <div style={{ marginTop: "20px" }}>
            <h3 className="text-white">Votre vidéo: </h3>

            {/* For Images */}
      {/* <video
              src={videoURL}
              alt="preview"
              width="250"
              style={{ display: "block", marginBottom: "15px", margin: "auto" }}
            /> */}

      {/* For other file types – add download link
            <a href={videoURL} target="_blank" rel="noopener noreferrer">
              Open/Download File
            </a>
          </div> */}
      {/* //   )}
      // </div> */}
    </div>
  );
}

export default UploadForm;
