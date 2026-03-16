import AdminSponsorList from "./AdminSponsorsList";
import Loading from "../Utils/Loading";
import { useEffect, useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function AdminSponsorDash() {
  const [sponsor, setSponsor] = useState(null);
  const [newSponsor, setNewSponsor] = useState({
    id: null,
    edition_id: 1,
    name: "",
    logo: null,
    url: "",
    type: "other",
  });
  const { showFlash } = useFlash();
  const authToken = useauth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/sponsors",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setSponsor(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setNewSponsor((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const addSponsor = async () => {
    if (
      newSponsor.name === "" ||
      newSponsor.logo === "" ||
      newSponsor.type === "" ||
      newSponsor.url === ""
    )
      return;

    const formData = new FormData();
    formData.append("edition_id", newSponsor.edition_id);
    formData.append("name", newSponsor.name);
    formData.append("logo", newSponsor.logo);
    formData.append("type", newSponsor.type);
    formData.append("url", newSponsor.url);

    try {
      console.log(formData);
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/sponsors",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + authToken.token,
          },
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const res = await response.json();

      setSponsor((prev) => [
        ...prev,
        { ...newSponsor, id: res.id /* , logo: res.logo */ },
      ]);
      setNewSponsor({
        id: null,
        edition_id: 1,
        name: "",
        logo: null,
        url: "",
        type: "",
      });

      // setSponsor(res);
      showFlash("success", "Création sponsor avec success");
    } catch (err) {
      console.error(err);
    }
  };

  if (!sponsor) return <Loading />;

  return (
    <div className="flex flex-col w-full ml-64 min-h-screen  bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 relative">
      <AdminSponsorList sponsor_list={sponsor} />
      <form className="flex flex-col mx-auto bg-gray-800 text-white p-4">
        <p>Ajouter sponsor:</p>
        <label htmlFor="sponsor_name">Nom et prénom</label>
        <input
          id="sponsor_name"
          value={newSponsor.name}
          name="name"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="sponsor_photo">Logo</label>
        <input
          type="file"
          id="sponsor_logo"
          name="logo"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="sponsor_type">Type</label>
        <select
          id="sponsor_type"
          name="type"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        >
          <option value="official">Official</option>
          <option value="media">Media</option>
          <option value="technical">Technical</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="sponsor_url">Url</label>
        <input
          id="sponsor_url"
          value={newSponsor.url}
          name="url"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <input
          type="button"
          value="Ajouter"
          className="bg-white text-black mt-4"
          onClick={() => addSponsor()}
        ></input>
      </form>
    </div>
  );
}

export default AdminSponsorDash;
