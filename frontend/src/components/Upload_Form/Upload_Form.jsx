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
  const [DescError, SetDescError] = useState("");
  const [videoError, SetVideoError] = useState("");
  const [imageError, SetImageError] = useState("");
  const [scenarioAiError, SetScenarioAiError] = useState("");
  const [videoAiError, SetVideoAiError] = useState("");
  const [Error, SetError] = useState("");
  const [Error, SetError] = useState("");
  const [Error, SetError] = useState("");
  const [Error, SetError] = useState("");
  const [Error, SetError] = useState("");
  const [Error, SecError] = useState("");

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
      SetDescError("Email invalide");
      console.log("Input is empty");
    } else {
      SetTitleError("");
      console.log(description.current.value);
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
              <p className="text-white">{DescError}</p>
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
                className="bg-gray-700 border border-gray-500 rounded-lg"
              />
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
