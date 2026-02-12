import { useEffect, useRef, useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "../../assets/react.svg";
import { useTranslation } from "react-i18next";

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

  function titleCheck() {
    if (title.current.value.trim() === "") {
      SetTitleError(t("upload_form.upload_message"));
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
  const formSubmit = useState(false);
  return (
    <div className="flex justify-center bg-black pt-4 pb-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-[0px_0px_10px_2px] shadow-blue-600/75 w-9/10 rounded-md flex flex-col items-center gap-2 pt-2 pb-2"
      >
        <h3 className="text-white">{t("upload_form.upload_message")} !</h3>
        <div className=" flex flex-col gap-2 p-2 w-9/10">
          <p className="text-purple-400">{t("upload_form.global_infos")}</p>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-white">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{titleError}</p>
            </div>
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{descError}</p>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
            <div className="flex flex-col md:max-w-4/10">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{videoError}</p>
            </div>
            <div className="flex flex-col md:max-w-4/10">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{imageError}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 p-2 w-9/10">
          <p className="text-purple-400">{t("upload_form.production")}</p>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{scenarioAiError}</p>
            </div>
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{videoAiError}</p>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{soundAiError}</p>
            </div>
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{postProdAiError}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 p-2 w-9/10">
          <p className="text-purple-400">{t("upload_form.more_info")}</p>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{moreInfoError}</p>
            </div>
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{instagramError}</p>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row md:justify-evenly md:p-2">
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{linkedinError}</p>
            </div>
            <div className="flex flex-col">
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
              <p className="text-white">{youtubeError}</p>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 p-2 w-9/10 md:flex-row md:justify-evenly md:p-2 outline outline-red-500">
          <div className="flex flex-row outline md:w-4/10 outline-red-500">
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
          <div className="flex flex-row justify-evenly md:w-4/10 outline outline-red-500">
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
          className="bg-amber-300 p-2 rounded-lg md:max-w-5/10 md:hover:cursor-pointer"
        >
          {t("upload_form.submit_btn")} {">>"}{" "}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
