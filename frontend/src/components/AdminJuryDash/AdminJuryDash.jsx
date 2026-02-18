import AdminJuryList from "./AdminJuryList";
import Loading from "../Utils/Loading";
import { useEffect, useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function AdminJuryDash() {
  const [jury, setJury] = useState(null);
  const [newJury, setNewJury] = useState({
    id: null,
    edition_id: 1,
    name: "",
    profession: "",
    bio: "",
    photo: "",
  });
  const { showFlash } = useFlash();
  const authToken = useauth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/jury",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setJury(res);
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

  const addJury = async () => {
    if (
      newJury.name === "" ||
      newJury.photo === "" ||
      newJury.bio === "" ||
      newJury.profession === ""
    )
      return;

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/jury", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken.token,
        },
        body: JSON.stringify({
          edition_id: newJury.edition_id,
          name: newJury.name,
          photo: newJury.photo,
          bio: newJury.bio,
          profession: newJury.profession,
        }),
      });
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const res = await response.json();

      setJury((prev) => [...prev, { ...newJury, id: res.id }]);
      setNewJury({
        id: "",
        edition: 1,
        name: "",
        profession: "",
        bio: "",
        photo: "",
      });

      // setJury(res);
      showFlash("success", "Création jury avec success");
    } catch (err) {
      console.error(err);
    }
  };

  if (!jury) return <Loading />;

  return (
    <div className="flex flex-col w-4/5 bg-gray-600 relative">
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
