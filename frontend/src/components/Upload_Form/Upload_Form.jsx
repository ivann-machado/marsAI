import { useEffect, useRef, useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "../../assets/react.svg";
import { useTranslation } from "react-i18next";
import "../Upload_Form/upload.css";

function UploadForm() {
  const { t } = useTranslation();
  //variables des inputs
  const title = useRef(null);
  const description = useRef(null);
  const video = useRef(null);
  const image = useRef(null);
  const scenario_ai = useRef(null);
  const video_ai = useRef(null);
  const sound_ai = useRef(null);
  const post_prod_ai = useRef(null);
  const more_info = useRef(null);
  const instagram = useRef(null);
  const linkedin = useRef(null);
  const youtube = useRef(null);
  const email = useRef(null);
  const tags = useRef(null);
  //Messages d'erreur
  const [titleError, SetTitleError] = useState();
  const [descError, SetDescError] = useState("");
  const [videoError, SetVideoError] = useState("");
  const [imageError, SetImageError] = useState("");
  const [scenarioAiError, SetScenarioAiError] = useState("");
  const [videoAiError, SetVideoAiError] = useState("");
  const [soundAiError, SetSoundAiError] = useState("");
  const [postProdAiError, SetPostProdAiError] = useState("");
  const [moreInfoError, SetMoreInfoError] = useState("");
  const [instagramError, SetInstagramError] = useState("");
  const [linkedinError, SetLinkedinError] = useState("");
  const [youtubeError, SetYoutubeError] = useState("");
  const [emailError, SetEmailError] = useState("");
  const [tagError, SetTagError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      title: title.current.value,
      description: description.current.value,
      video: video.current.value,
      image: image.current.value,
      scenario_ai: scenario_ai.current.value,
      video_ai: video_ai.current.value,
      sound_ai: sound_ai.current.value,
      post_prod_ai: post_prod_ai.current.value,
      more_info: more_info.current.value,
      instagram: instagram.current.value,
      linkedin: linkedin.current.value,
      youtube: youtube.current.value,
    };
    console.log(data);
  };
  //Vérification des champs du formulaire
  function titleCheck() {
    if (title.current.value.trim() === "") {
      SetTitleError("Champ vide");
      console.log("Input is empty");
    } else {
      SetTitleError();
      console.log(title.current.value);
    }
  }
  function descCheck() {
    if (description.current.value.trim() === "") {
      SetDescError("Champ vide");
      console.log("Input is empty");
    } else {
      SetDescError("");
      console.log(description.current.value);
    }
  }
  function videoCheck() {
    if (video.current.value.trim() === "") {
      SetVideoError("Champ vide");
      console.log("Input is empty");
    } else {
      SetVideoError("");
      console.log(video.current.value);
    }
  }
  function imageCheck() {
    if (image.current.value.trim() === "") {
      SetImageError("Champ vide");
      console.log("Input is empty");
    } else {
      SetImageError("");
      console.log(image.current.value);
    }
  }
  function scenarioAiCheck() {
    if (scenario_ai.current.value.trim() === "") {
      SetScenarioAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetScenarioAiError("");
      console.log(scenario_ai.current.value);
    }
  }
  function videoAiCheck() {
    if (video_ai.current.value.trim() === "") {
      SetVideoAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetVideoAiError("");
      console.log(video_ai.current.value);
    }
  }
  function soundAiCheck() {
    if (sound_ai.current.value.trim() === "") {
      SetSoundAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetSoundAiError("");
      console.log(sound_ai.current.value);
    }
  }
  function postProdAiCheck() {
    if (post_prod_ai.current.value.trim() === "") {
      SetPostProdAiError("Champ vide");
      console.log("Input is empty");
    } else {
      SetPostProdAiError("");
      console.log(post_prod_ai.current.value);
    }
  }
  function moreInfoCheck() {
    if (more_info.current.value.trim() === "") {
      SetMoreInfoError("Champ vide");
      console.log("Input is empty");
    } else {
      SetMoreInfoError("");
      console.log(more_info.current.value);
    }
  }
  function instagramCheck() {
    if (instagram.current.value.trim() === "") {
      SetInstagramError("Champ vide");
      console.log("Input is empty");
    } else {
      SetInstagramError("");
      console.log(instagram.current.value);
    }
  }
  function linkedinCheck() {
    if (linkedin.current.value.trim() === "") {
      SetLinkedinError("Champ vide");
      console.log("Input is empty");
    } else {
      SetLinkedinError("");
      console.log(linkedin.current.value);
    }
  }
  function youtubeCheck() {
    if (youtube.current.value.trim() === "") {
      SetYoutubeError("Champ vide");
      console.log("Input is empty");
    } else {
      Set("");
      console.log(youtube.current.value);
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
      console.log(email.current.value);
    }
  }
  function tagCheck() {
    if (tags.current.value.trim() === "") {
      SetTagError("Champ vide");
      console.log("Input is empty");
    } else {
      SetTagError("");
      console.log(tags.current.value);
    }
  }
  const formSubmit = useState(false);
  return (
    <div className="flex justify-center bg-[#050505] pt-4 pb-4">
      <form
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
                name="image"
                id="image"
                ref={image}
                onChange={() => {
                  imageCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{imageError}</p>
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
                name="more_info"
                id="more_info"
                ref={more_info}
                onChange={() => {
                  moreInfoCheck();
                }}
                className="bg-gray-900 text-white border-2 border-[#F2F2F2]/20 rounded-lg w-full h-10 p-1"
              />
              <p className="text-white">{moreInfoError}</p>
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
        </div>
        <div className=" flex flex-col gap-2 p-2 w-9/10 md:flex-row md:justify-evenly md:p-2">
          <div className="flex flex-row md:w-4/10">
            <input
              type="checkbox"
              name=""
              id=""
              className="bg-gray-700 border border-gray-500 rounded-lg"
            />
            <label htmlFor="" className="text-white">
              {t("upload_form.majority_certification")}
            </label>
          </div>
          <div className="flex flex-row justify-evenly md:w-4/10">
            <input
              type="checkbox"
              name="right_givaway"
              id="right_givaway"
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
      </form>
    </div>
  );
}

export default UploadForm;
