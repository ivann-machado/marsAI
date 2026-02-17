import AdminJuryList from "./AdminJuryList";
import { useEffect, useState } from "react";

function AdminJuryDash() {
  const [jury, setJury] = useState(null);
  const [newJury, setNewJury] = useState({
    edition_id: "2026",
    name: "",
    profession: "",
    bio: "",
    photo: "",
  });
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setJury(json.mockedJury);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewJury((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addJury = () => {
    if (
      newJury.name === "" ||
      newJury.photo === "" ||
      newJury.bio === "" ||
      newJury.profession === ""
    )
      return;

    setJury((prev) => [...prev, newJury]);
    setNewJury({
      edition: 1,
      name: "",
      profession: "",
      bio: "",
      photo: "",
    });
  };

  if (!jury) return <p>Loading...</p>;

  return (
    <div className="flex flex-col w-4/5 bg-gray-600">
      <AdminJuryList jury_list={jury} />
      <form className="flex flex-col mx-auto bg-gray-800 text-white p-4">
        <p>Ajouter membre jury:</p>
        <label htmlFor="jury_name">Nom et prénom</label>
        <input
          id="jury_name"
          value={newJury.name}
          name="name"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="jury_photo">Photo</label>
        <input
          id="jury_photo"
          value={newJury.photo}
          name="photo"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="jury_bio">Bio</label>
        <input
          id="jury_bio"
          value={newJury.bio}
          name="bio"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="jury_profession">Profession</label>
        <input
          id="jury_profession"
          value={newJury.profession}
          name="profession"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          type="button"
          value="Ajouter"
          className="bg-white text-black mt-4"
          onClick={() => addJury()}
        ></input>
      </form>
    </div>
  );
}

export default AdminJuryDash;
