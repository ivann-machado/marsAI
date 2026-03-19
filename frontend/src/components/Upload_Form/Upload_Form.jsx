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
  const [step, setStep] = useState(0);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  const [loading, SetLoading] = useState(false);

  /**
   * Stockage des valeurs de chaques input dans leurs variables respectives
   */
  const title = useRef(null);
  const description = useRef(null);
  const video = useRef(null);
  const coverImage = useRef(null);
  const subtitles = useRef(null);
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
  const tiktok = useRef(null);
  const [majorityCertification, SetMajorityCertification] = useState(false);
  console.log({ majorityCertification });
  const certficitationHandler = () => {
    SetMajorityCertification(!majorityCertification);
  };
  const [rightGivaway, SetRightGivaway] = useState(false);
  const rightGiveAwayHandler = () => {
    SetRightGivaway(!rightGivaway);
  };

  /**
   * Select
   */
  const [movieType, SetMovieType] = useState("");
  const [countryId, SetCountryId] = useState(0);
  let countryOptions = [];
  if (i18n.language === "fr") {
    countryOptions = countryListFr;
  } else {
    countryOptions = countryListEn.sort((a, b) =>
      a.label.localeCompare(b.label),
    );
  }
  const movieTypeOption = [
    { label: t("upload_form.production_type_select.label"), value: "" },
    {
      label: "100% " + t("upload_form.production_type_select.ai"),
      value: "ai_only",
    },
    { label: t("upload_form.production_type_select.hybrid"), value: "hybrid" },
  ];
  function handleSelect(event, key) {
    if (key === "country") SetCountryId(event.target.value);
    if (key === "movie_type") SetMovieType(event.target.value);
  }

  /**
   * Messages d'erreur
   */
  const [titleError, SetTitleError] = useState("");
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
  const [movieTypeError, SetMovieTypeError] = useState("");
  const [tiktokError, SetTiktokError] = useState("");
  const [countryError, SetCountryError] = useState("");
  const [subtitlesError, SetSubtitlesError] = useState("");

  /**
   * Bloquage/Débloquage des étapes du formulaire affichées/non affichées
   */
  const [step1IsDisabled, SetStep1IsDisabled] = useState(false);
  const step1Disable = () => {
    SetStep1IsDisabled(!step1IsDisabled);
  };
  const [step2IsDisabled, SetStep2IsDisabled] = useState(true);
  const step2Disable = () => {
    SetStep2IsDisabled(!step2IsDisabled);
  };
  const [step3IsDisabled, SetStep3IsDisabled] = useState(true);
  const step3Disable = () => {
    SetStep3IsDisabled(!step3IsDisabled);
  };
  /**
   * Vérification des champs du formulaire
   */
  function titleCheck() {
    if (title.current.value.trim() === "") {
      SetTitleError(t("upload_form.errors.empty_field"));
      return false;
    } else if (title.current.value.length < 5) {
      //Taille temporaire (placeholder !!!!!!)
      SetTitleError(t("upload_form.errors.short_field")); //"Ce champ doit être plus grand"
      // console.log("Input is too short");
      return false;
    } else if (title.current.value.length > 50) {
      //Taille temporaire (placeholder !!!!!!)
      SetTitleError(t("upload_form.errors.field_max_length_short"));
      //console.log("Input is too long");
      return false;
    } else {
      SetTitleError("");
      return true;
    }
  }
  function descCheck() {
    if (description.current.value.trim() === "") {
      SetDescError(t("upload_form.errors.empty_field"));
      return false;
    } else if (description.current.value.length < 10) {
      //Taille temporaire (placeholder !!!!!!)
      SetDescError(t("upload_form.errors.field_min_length_medium"));
      return false;
    } else if (description.current.value.length > 300) {
      //Taille temporaire (placeholder !!!!!!)
      SetDescError(t("upload_form.errors.field_max_length_long"));
      return false;
    } else {
      SetDescError("");
      return true;
    }
  }
  function videoCheck() {
    if (video.current.value.trim() === "") {
      SetVideoError(t("upload_form.errors.no_file"));
      return false;
    } else {
      SetVideoError("");
      return true;
    }
  }
  function coverImageCheck() {
    if (coverImage.current.value.trim() === "") {
      SetCoverImageError(t("upload_form.errors.no_file"));
      return false;
    } else {
      SetCoverImageError("");
      return true;
    }
  }
  function scenarioAiCheck() {
    if (scenario_ai.current.value.length > 50) {
      SetScenarioAiError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetScenarioAiError("");
      return true;
    }
  }
  function videoAiCheck() {
    if (video_ai.current.value.length > 50) {
      SetVideoAiError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetVideoAiError("");
      return true;
    }
  }
  function soundAiCheck() {
    if (sound_ai.current.value.length > 50) {
      SetSoundAiError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetSoundAiError("");
      return true;
    }
  }
  function postProdAiCheck() {
    if (post_prod_ai.current.value.length > 50) {
      SetPostProdAiError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetPostProdAiError("");
      return true;
    }
  }
  function producerCheck() {
    if (producer.current.value.trim() === "") {
      SetProducerError(t("upload_form.errors.empty_field"));
      return false;
    } else if (producer.current.value.length > 50) {
      SetProducerError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetProducerError("");
      return true;
    }
  }
  // function producerImageCheck() {
  //   if (producerImage.current.value.trim() === "") {
  //     SetProducerImageError(t("upload_form.errors.no_file"));
  //     return false;
  //   } else {
  //     SetProducerImageError("");
  //     return true;
  //   }
  // }
  function instagramCheck() {
    if (instagram.current.value.length > 50) {
      SetInstagramError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetInstagramError("");
      return true;
    }
  }
  function linkedinCheck() {
    if (linkedin.current.value.length > 50) {
      SetLinkedinError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetLinkedinError("");
      return true;
    }
  }
  function youtubeCheck() {
    if (youtube.current.value.length > 50) {
      SetYoutubeError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetYoutubeError("");
      return true;
    }
  }
  function emailCheck() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.current.value.trim() === "") {
      SetEmailError(t("upload_form.errors.empty_field"));
      return false;
    } else if (!regex.test(email.current.value)) {
      SetEmailError(t("upload_form.errors.invalid_email"));
      return false;
    } else if (email.current.value.length > 50) {
      SetEmailError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetEmailError("");
      return true;
    }
  }
  function countrySelectcheck() {
    if (countryId <= 0) {
      SetCountryError(t("upload_form.errors.invalid_country"));

      return false;
    } else {
      return true;
    }
  }
  function movieTypeCheck() {
    if (movieType === "") {
      SetMovieTypeError(t("upload_form.errors.invalid_movie_type"));
      return false;
    } else {
      SetMovieTypeError("");
      return true;
    }
  }

  function majorityCheck() {
    if (majorityCertification === false) {
      showFlash("error", t("upload_form.majority_certification_flash"));
    } else {
      SetMajorityCertification(true);
    }
  }
  function rightGiveAwayCheck() {
    if (rightGivaway === false) {
      showFlash("error", t("upload_form.right_givaway_flash"));
    }
  }
  function tagCheck() {
    const tagRegex = /^(#\w+(,\s`\w+)*){0,1}$/;
    if (!tagRegex.test(tags.current.value)) {
      SetTagError(t("upload_form.errors.invalid_tag"));
      return false;
    } else if (tags.current.value.length > 100) {
      SetTagError(t("upload_form.errors.field_max_length_medium"));
      return false;
    } else {
      SetTagError("");
      return true;
    }
  }
  function tiktokCheck() {
    if (tiktok.current.value.length > 50) {
      SetTiktokError(t("upload_form.errors.field_max_length_short"));
      return false;
    } else {
      SetTiktokError("");
      return true;
    }
  }

  /**
   * Récupération des données envoyées
   */
  const [videoURL, setVideoURL] = useState(null);

  /**
   * Passage d'une étape à la précédente
   */
  const backToStep1 = async (e) => {
    step2Disable();
    step1Disable();

    prevStep();
  };
  const backToStep2 = async (e) => {
    step3Disable();
    step2Disable();
    prevStep();
  };

  /**
   * Passage d'une étape à la suivante
   */
  const handleStep1 = async (e) => {
    const step1Data = {
      title: title.current.value,
      description: description.current.value,
      video: video.current.files[0],
      cover_image: coverImage.current.files[0],
      subtitles: subtitles.current.files,
    };
    videoCheck();
    coverImageCheck();
    if (!titleCheck()) {
      showFlash(
        "error",
        "Titre: " +
          (titleError != ""
            ? titleError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!descCheck()) {
      showFlash(
        "error",
        "Description: " +
          (descError != ""
            ? descError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!videoCheck()) {
      showFlash(
        "error",
        "Vidéo: " +
          (videoError != "" ? videoError : t("upload_form.errors.no_file")),
      );
      SetLoading(false);
      return;
    } else if (!coverImageCheck()) {
      showFlash(
        "error",
        "Miniature du film: " +
          (coverImageError != ""
            ? coverImageError
            : t("upload_form.errors.default_no_file")),
      );
      SetLoading(false);
      return;
    } else {
      step1Disable();
      step2Disable();
      nextStep();
    }
  };

  const handleStep2 = async (e) => {
    const step2Data = {
      producer: producer.current.value,
      email: email.current.value,
      producer_image: producerImage.current.files[0],
      movie_type: movieType.current.value,
      scenario_ai: scenario_ai.current.value,
      video_ai: video_ai.current.value,
      sound_ai: sound_ai.current.value,
      post_prod_ai: post_prod_ai.current.value,
    };
    if (!producerCheck()) {
      showFlash(
        "error",
        "Producteur: " +
          (producerError != ""
            ? producerError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!emailCheck()) {
      showFlash(
        "error",
        "Email: " +
          (emailError != ""
            ? emailError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!movieTypeCheck()) {
      showFlash(
        "error",
        "Type de production:" +
          (movieTypeError != ""
            ? movieTypeError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!scenarioAiCheck()) {
      showFlash(
        "error",
        "IA scénario: " +
          (scenarioAiError != ""
            ? scenarioAiError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!videoAiCheck()) {
      showFlash(
        "error",
        "IA générative de vidéos: " +
          (videoAiError != ""
            ? videoAiError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!soundAiCheck()) {
      showFlash(
        "error",
        "IA sons et musiques: " +
          (soundAiError != ""
            ? soundAiError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!postProdAiCheck()) {
      showFlash(
        "error",
        "IA post-production: " +
          (postProdAiError != ""
            ? postProdAiError
            : t("upload_form.errors_default_field_error")),
      );
      SetLoading(false);
      return;
    } else {
      step2Disable();
      step3Disable();
      nextStep();
    }
  };
  /**
   * Stockage des valeurs des inputs
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const uploadData = {
      title: title.current.value,
      description: description.current.value,
      video: video.current.files[0],
      image: coverImage.current.files[0],
      subtitles: subtitles.current.files,
      scenario_ai: scenario_ai.current.value,
      video_ai: video_ai.current.value,
      sound_ai: sound_ai.current.value,
      post_prod_ai: post_prod_ai.current.value,
      producer: producer.current.value,
      email: email.current.value,
      producerImage: producerImage.current.files[0],
      country: countryId,
      instagram: instagram.current.value,

      youtube: youtube.current.value,
      tags: tags.current.value,
      tiktok: tiktok.current.value,
      linkedin: linkedin.current.value,
      socials: JSON.stringify([
        linkedin.current.value,
        youtube.current.value,
        tiktok.current.value,
        instagram.current.value,
      ]),
    };
    /**
     * Appel des vérifications non automatisées
     */
    movieTypeCheck();
    countrySelectcheck();
    majorityCheck();
    console.log(uploadData);
    rightGiveAwayCheck();
    const formData = new FormData();
    formData.append("edition_id", 1);
    if (uploadData.video) formData.append("filename", uploadData.video);
    if (uploadData.email) formData.append("email", uploadData.email);
    if (uploadData.image) formData.append("cover_image", uploadData.image);
    if (uploadData.title) formData.append("title", uploadData.title);
    if (uploadData.description)
      formData.append("description", uploadData.description);
    if (uploadData.country) formData.append("country_id", uploadData.country);
    if (uploadData.producer) formData.append("producer", uploadData.producer);
    if (uploadData.producerImage)
      formData.append("producer_image", uploadData.producerImage); //null ?
    if (uploadData.socials) formData.append("socials", uploadData.socials); //null
    if (uploadData.scenario_ai)
      formData.append("scenario_ai", uploadData.scenario_ai); //null
    if (uploadData.video_ai)
      formData.append("video_gen_ai", uploadData.video_ai); //null
    if (uploadData.sound_ai) formData.append("sound_ai", uploadData.sound_ai); //null
    if (uploadData.post_prod_ai)
      formData.append("postprod_ai", uploadData.post_prod_ai); //null
    if (uploadData.tags) formData.append("tags", uploadData.tags); //null
    console.log(uploadData);
    console.log("formData est : ", formData);
    SetLoading(true);
    if (!titleCheck()) {
      showFlash(
        "error",
        "Titre: " +
          (titleError != ""
            ? titleError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!descCheck()) {
      showFlash(
        "error",
        "Description: " +
          (descError != ""
            ? descError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!videoCheck()) {
      showFlash(
        "error",
        "Vidéo: " +
          (videoError != "" ? videoError : t("upload_form.errors.no_file")),
      );
      SetLoading(false);
      return;
    } else if (!coverImageCheck()) {
      showFlash(
        "error",
        "Miniature du film: " +
          (coverImageError != ""
            ? coverImageError
            : t("upload_form.errors.no_file")),
      );
      SetLoading(false);
      return;
    } else if (!producerCheck()) {
      showFlash(
        "error",
        "Producteur: " +
          (producerError != ""
            ? producerError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!emailCheck()) {
      showFlash(
        "error",
        "Email: " +
          (emailError != ""
            ? emailError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    }
    //  else if (!producerImageCheck()) {
    //   showFlash(
    //     "error",
    //     "Photo du producteur: " +
    //       (producerImageError != ""
    //         ? producerImageError
    //         : t("upload_form.errors.no_file")),
    //   );
    //   SetLoading(false);
    //   return;
    // }
    else if (!movieTypeCheck()) {
      showFlash(
        "error",
        "Type de production:" +
          (movieTypeError != ""
            ? movieTypeError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!scenarioAiCheck()) {
      showFlash(
        "error",
        "IA scénario: " +
          (scenarioAiError != ""
            ? scenarioAiError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!videoAiCheck()) {
      showFlash(
        "error",
        "IA générative de vidéos: " +
          (videoAiError != ""
            ? videoAiError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!soundAiCheck()) {
      showFlash(
        "error",
        "IA sons et musiques: " +
          (soundAiError != ""
            ? soundAiError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!postProdAiCheck()) {
      showFlash(
        "error",
        "IA post-production: " +
          (postProdAiError != ""
            ? postProdAiError
            : t("upload_form.errors_default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!linkedinCheck()) {
      showFlash(
        "error",
        "Linkedin: " +
          (linkedinError != ""
            ? linkedinError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!youtubeCheck()) {
      showFlash(
        "error",
        "Youtube: " +
          (youtubeError != ""
            ? youtubeError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!instagramCheck()) {
      showFlash(
        "error",
        "Instagram: " +
          (instagramError != ""
            ? instagramError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!tagCheck()) {
      showFlash(
        "error",
        "tags: " +
          (tagError != ""
            ? tagError
            : t("upload_form.errors.default_field_error")),
      );
      SetLoading(false);
      return;
    } else if (!countrySelectcheck()) {
      showFlash("error", "Pays invalide");
      SetLoading(false);
      return;
    } else if (!majorityCertification) {
      SetLoading(false);
      return;
    } else if (rightGivaway === false) {
      SetLoading(false);
      return;
    } else {
    }
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/videos", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    console.log(data);
    if (res.ok) {
      SetLoading(false);
      showFlash("success", t("upload_form.upload_success"));
      /**
       * Création d'un URL pour afficher les files
       */
      if (uploadData.video) {
        const url = URL.createObjectURL(uploadData.video);
        console.log({ url });
        setVideoURL(url);
      }
    } else {
      showFlash("error", t("upload_form.errors.upload_fail"));
      SetLoading(false);
    }
  };

  const formSubmit = useState(false);
  console.log(step1IsDisabled, step2IsDisabled, step3IsDisabled);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#1a1026] to-[#0f0f1a] p-6 font-inter">
      <form
        onSubmit={handleSubmit}
        className="relative w-[95%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(194,122,255,0.25)] flex flex-col items-center gap-10 px-6 md:px-12 py-10 overflow-hidden"
      >
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
            <div className="flex flex-col justify-center items-center">
              {/*Titre et Règlement du formulaire*/}
              <p className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.step1_rules")}
              </p>
              <p className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.required_fields")}
              </p>
            </div>
            {/* TITLE */}
            <div className="flex flex-col p-4">
              <label
                htmlFor="title"
                className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
              >
                {t("upload_form.title")} :
                <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                ref={title}
                onChange={titleCheck}
                tabIndex={step1IsDisabled ? -1 : 0}
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
              />
              <p className="text-red-400">{titleError}</p>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col p-4">
              <label
                htmlFor="description"
                className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
              >
                {t("upload_form.desc")} :
                <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
              </label>
              <input
                type="text"
                name="description"
                id="description"
                ref={description}
                onChange={descCheck}
                tabIndex={step1IsDisabled ? -1 : 0}
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
              />
              <p className="text-red-400">{descError}</p>
            </div>
            {/* VIDEO */}
            <div className="flex flex-col p-4">
              <label
                htmlFor="video"
                className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
              >
                {t("upload_form.video")} :
                <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
              </label>
              <input
                type="file"
                name="video"
                id="video"
                ref={video}
                onChange={() => {
                  videoCheck();
                }}
                tabIndex={step1IsDisabled ? -1 : 0}
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
              />
              <p className="text-white">{videoError}</p>
            </div>
            <div className="flex flex-col p-4">
              <label
                htmlFor="cover-image"
                className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
              >
                {t("upload_form.image")} :
                <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
              </label>
              <input
                type="file"
                name="cover-image"
                id="cover-image"
                ref={coverImage}
                tabIndex={step1IsDisabled ? -1 : 0}
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
              />
              <p className="text-white">{coverImageError}</p>
            </div>
            <div className="flex flex-col p-4">
              <label
                htmlFor="subtitles"
                className="text-sm text-white/70 mb-2 tracking-wide "
              >
                {t("upload_form.subtitles")} :
              </label>
              <input
                type="file"
                name="subtitles"
                id="subtitles"
                ref={subtitles}
                multiple
                tabIndex={step1IsDisabled ? -1 : 0}
                className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
              />
              <p className="text-white">{subtitlesError}</p>
            </div>

            <div className="flex justify-end p-4">
              <NextButton
                onClick={handleStep1}
                disabled={step1IsDisabled ? -1 : 0}
              />
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
            <div className="flex flex-col justify-center items-center">
              {/*Titre et Règlement du formulaire*/}
              <p className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.step2_rules")}
              </p>
              <p className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.required_fields")}
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="producer"
                  className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
                >
                  {t("upload_form.producer")} :
                  <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
                </label>
                <input
                  type="text"
                  name="producer"
                  id="producer"
                  ref={producer}
                  onChange={() => {
                    producerCheck();
                  }}
                  tabIndex={step2IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{producerError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="email"
                  className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
                >
                  Email :
                  <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  ref={email}
                  onChange={() => {
                    emailCheck();
                  }}
                  tabIndex={step2IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{emailError}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
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
                  tabIndex={step2IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none pt-3 pb-2"
                />
                <p className="text-white">{coverImageError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="movieTypeSelect"
                  className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
                >
                  {t("upload_form.production_type")} :
                  <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
                </label>
                <select
                  name="movieTypeSelect"
                  id="movieTypeSelect"
                  onChange={(e) => handleSelect(e, "movie_type")}
                  tabIndex={step2IsDisabled ? -1 : 0}
                  className="bg-[#2D2738] border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                >
                  {movieTypeOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-white">{movieTypeError}</p>
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
                  tabIndex={step2IsDisabled ? -1 : 0}
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
                  tabIndex={step2IsDisabled ? -1 : 0}
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
                  tabIndex={step2IsDisabled ? -1 : 0}
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
                  tabIndex={step2IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{postProdAiError}</p>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <BackButton
                onClick={backToStep1}
                disabled={step2IsDisabled ? -1 : 0}
              />

              <NextButton
                onClick={handleStep2}
                disabled={step2IsDisabled ? -1 : 0}
              />
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
            <div className="flex flex-col justify-center items-center">
              {/*Titre et Règlement du formulaire*/}
              <p className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.step3_rules")}
              </p>
              <p className="text-sm text-white/70 mb-2 tracking-wide">
                {t("upload_form.required_fields")}
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="linkedin"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Url Linkedin :
                </label>
                <input
                  type="text"
                  name="linkedin"
                  id="linkedin"
                  ref={linkedin}
                  onChange={() => {
                    linkedinCheck();
                  }}
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{linkedinError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="youtube"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Url Youtube :
                </label>
                <input
                  type="text"
                  name="youtube"
                  id="youtube"
                  ref={youtube}
                  onChange={() => {
                    youtubeCheck();
                  }}
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{youtubeError}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-evenly md:p-4 md:gap-10 md:w-full">
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="tiktok"
                  className="text-sm text-white/70 mb-2 tracking-wide"
                >
                  Url TikTok :
                </label>
                <input
                  type="text"
                  name="tiktok"
                  id="tiktok"
                  ref={tiktok}
                  onChange={() => {
                    tiktokCheck();
                  }}
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className="bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{tiktokError}</p>
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
                  tabIndex={step3IsDisabled ? -1 : 0}
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
                  Url Instagram :
                </label>
                <input
                  type="text"
                  name="instagram"
                  id="instagram"
                  ref={instagram}
                  onChange={() => {
                    instagramCheck();
                  }}
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className=" bg-white/5 border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                />
                <p className="text-white">{instagramError}</p>
              </div>
              <div className="flex flex-col md:w-full md:max-w-150">
                <label
                  htmlFor="countrySelect"
                  className="text-sm text-white/70 mb-2 tracking-wide flex flex-row gap-2"
                >
                  {t("upload_form.country")} :
                  <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
                </label>
                <select
                  name="countrySelect"
                  id="countrySelect"
                  onChange={(e) => handleSelect(e, "country")}
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className="bg-[#2D2738] border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 rounded-xl h-12 px-4 text-white placeholder-white/40 transition-all duration-300 outline-none"
                >
                  {countryOptions.map((option) => (
                    <option key={option.value} value={option.value + 1}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className="bg-gray-700 border border-gray-500 rounded-lg"
                />
                <label
                  htmlFor="majority_certification"
                  className="text-white flex flex-row gap-2"
                >
                  {t("upload_form.majority_certification")}
                  <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
                </label>
              </div>

              <div className="flex flex-row gap-4 md:w-4/10">
                <input
                  type="checkbox"
                  name="right_givaway"
                  id="right_givaway"
                  checked={rightGivaway}
                  onChange={rightGiveAwayHandler}
                  tabIndex={step3IsDisabled ? -1 : 0}
                  className="bg-gray-700 border border-gray-500 rounded-lg"
                />
                <label
                  htmlFor="right_givaway"
                  className="text-white flex flex-row gap-2"
                >
                  {t("upload_form.right_givaway")}
                  <p className="text-sm text-red-500 mb-2 tracking-wide">*</p>
                </label>
              </div>
            </div>

            <div className="flex justify-between p-4">
              <BackButton
                onClick={backToStep2}
                disabled={step3IsDisabled ? -1 : 0}
              />
              <LoadingButton
                type="submit"
                loading={loading}
                disabled={step3IsDisabled ? -1 : 0}
              >
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
