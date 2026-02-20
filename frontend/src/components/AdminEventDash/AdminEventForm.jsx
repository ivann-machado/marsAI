import { useauth } from "../../context/AuthContext";
import { useState } from "react";
import { useFlash } from "../../context/FlashContext";

function AdminEventForm() {
  const authToken = useauth();
  const [type, setType] = useState("");
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

    console.log(date);

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
    <form className="flex flex-col bg-gray-800 items-center text-white gap-4 p-8">
      <div>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
          className="bg-white text-black"
        >
          <option value="atelier">Atelier</option>
        </select>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="logo">Logo</label>
        <input
          id="logo"
          type="file"
          value={logo}
          onChange={(e) => {
            setLogo(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="info">Info</label>
        <input
          id="info"
          value={info}
          onChange={(e) => {
            setInfo(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="place">Place</label>
        <input
          id="place"
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="duration">Duration</label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="cover_image">Cover Image</label>
        <input
          id="cover_image"
          type="file"
          value={coverImage}
          onChange={(e) => {
            setCoverImage(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          className="bg-white text-black"
        ></input>
      </div>
      <div>
        <input
          type="submit"
          value="Submit"
          className="bg-white text-black p-2 hover:bg-gray-300"
          onClick={(e) => submitForm(e)}
        ></input>
      </div>
    </form>
  );
}

export default AdminEventForm;
