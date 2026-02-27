import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "../Upload_Form/upload.css";
import { useFlash } from "../../context/FlashContext";
import LoadingButton from "../Loading/LoadingButton";
import { countryListFr, countryListEn } from "../Utils/CountryList";
import { BackButton, NextButton } from "../Utils/Buttons";

function UploadForm() {
  const { showFlash } = useFlash();
  const { t, i18n } = useTranslation();
  const [countryId, SetCountryId] = useState(null);
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [loading, SetLoading] = useState(false);

  //Status
  let countryOptions = [];
  if (i18n.language === "fr") {
    countryOptions = countryListFr;
  } else {
    countryOptions = countryListEn.sort((a, b) =>
      a.label.localeCompare(b.label),
    );
  }
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
    if (majorityCertification === false) {
      showFlash("error", "Erreururrureuueueuerueruerueur");
      SetLoading(false);
      return;
    }
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/videos", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    console.log(data);
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
      showFlash("error", "Erreur lors de l'envoi du film.");
      SetLoading(false);
    }
  };
  //Vérification des champs du formulaire
  function titleCheck() {
    if (title.current.value.trim() === "") {
      SetTitleError("Champ vide");
      console.log("Input is empty");
    } else if (title.current.value.length < 5) {
      //Taille temporaire (placeholder !!!!!!)
      SetTitleError(t("upload_form.errors.test")); //"Ce champ doit être plus grand"
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
    } else {
      SetMajorityCertification(true);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1026] to-[#0f0f1a] p-6 font-inter">
      <form
        onSubmit={handleSubmit}
        className="relative w-[95%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(194,122,255,0.25)] flex flex-col items-center gap-10 px-6 md:px-12 py-10 overflow-hidden"
      >
        <div> {/*Titre et Règlement du formulaire*/} </div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 transition-all duration-700 ease-out"
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
            <p className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 text-center mb-8  pb-2 pt-2">
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
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
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
              <NextButton onClick={nextStep} />
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
            <p className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 text-center mb-8">
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
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{postProdAiError}</p>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <BackButton onClick={prevStep} />

              <NextButton onClick={nextStep} />
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
            <p className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-300 text-center mb-8">
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
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
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

            <div className="flex justify-between p-4">
              <BackButton onClick={prevStep} />
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
