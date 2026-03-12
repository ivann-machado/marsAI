import { useauth } from "../../context/AuthContext";
import { useState } from "react";
import { useFlash } from "../../context/FlashContext";

function AdminEventForm() {
  const authToken = useauth();
  const [type, setType] = useState("atelier");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState("");
  const [info, setInfo] = useState("");
  const [place, setPlace] = useState("");
  const [duration, setDuration] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [date, setDate] = useState("");
  const { showFlash } = useFlash();

  const submitForm = async (e) => {
    e.preventDefault();

    // console.log(date);

    const formData = new FormData();
    formData.append("type", type);
    formData.append("name", name);
    formData.append("url", url);
    formData.append("logo", logo);
    formData.append("place", place);
    formData.append("duration", duration);
    formData.append("info", info);
    formData.append("cover_image", coverImage);
    formData.append("date", date);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/events/",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      //   const json = await response.json();
      showFlash("success", "Event ajouté");

      setType("");
      setName("");
      setUrl("");
      setLogo("");
      setInfo("");
      setPlace("");
      setDuration("");
      setCoverImage("");
      setDate("");
    } catch (err) {
      showFlash("error", "Erreur ajout event");
      console.error(err);
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 text-white border-t pt-4">
      <p className="text-4xl font-extrabold text-center my-8">
        Ajouter un evenement
      </p>
      <form className="flex flex-wrap  items-center gap-4 p-8">
        <div className="w-2/5 flex justify-between">
          <label htmlFor="type" className="w-1/3 m-4 text-lg font-bold">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          >
            <option value="atelier">Atelier</option>
          </select>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="name" className="w-1/3 m-4 text-lg font-bold">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="url" className="w-1/3 m-4 text-lg font-bold">
            URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="logo" className="w-1/3 m-4 text-lg font-bold">
            Logo
          </label>
          <input
            id="logo"
            type="file"
            // value={logo}
            onChange={(e) => {
              setLogo(e.target.files[0]);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="info" className="w-1/3 m-4 text-lg font-bold">
            Info
          </label>
          <input
            id="info"
            value={info}
            onChange={(e) => {
              setInfo(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="place" className="w-1/3 m-4 text-lg font-bold">
            Place
          </label>
          <input
            id="place"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="duration" className="w-1/3 m-4 text-lg font-bold">
            Duration
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="cover_image" className="w-1/3 m-4 text-lg font-bold">
            Cover Image
          </label>
          <input
            id="cover_image"
            type="file"
            // value={coverImage}
            onChange={(e) => {
              setCoverImage(e.target.files[0]);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-between">
          <label htmlFor="date" className="w-1/3 m-4 text-lg font-bold">
            Date
          </label>
          <input
            id="date"
            type="datetime-local"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="bg-white text-black w-2/3 p-2 rounded-md"
          ></input>
        </div>
        <div className="w-2/5 flex justify-center">
          <input
            type="submit"
            value="Submit"
            className="bg-white text-black p-2 hover:bg-gray-300 w-1/5 font-bold"
            onClick={(e) => submitForm(e)}
          ></input>
        </div>
      </form>
    </div>
  );
}

export default AdminEventForm;
