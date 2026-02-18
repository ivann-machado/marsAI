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
    logo: "",
    url: "",
    type: "",
  });
  const { showFlash } = useFlash();
  const authToken = useauth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/sponsor",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        let res = await response.json();
        setSponsor(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewSponsor((prev) => ({
      ...prev,
      [name]: value,
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

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/sponsor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({
            edition_id: newSponsor.edition_id,
            name: newSponsor.name,
            logo: newSponsor.logo,
            type: newSponsor.type,
            url: newSponsor.url,
          }),
        },
      );
      if (!response.ok) throw new Error("Erreur fetch JSON");
      const res = await response.json();

      setSponsor((prev) => [...prev, { ...newSponsor, id: res.id }]);
      setNewSponsor({
        id: null,
        edition_id: 1,
        name: "",
        logo: "",
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
    <div className="flex flex-col w-4/5 bg-gray-600 relative">
      <AdminSponsorList sponsor_list={sponsor} />
      <form className="flex flex-col mx-auto bg-gray-800 text-white p-4">
        <p>Ajouter membre sponsor:</p>
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
          id="sponsor_logo"
          value={newSponsor.logo}
          name="logo"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="sponsor_type">Type</label>
        <input
          id="sponsor_type"
          value={newSponsor.type}
          name="type"
          className="bg-white text-black"
          onChange={(e) => handleChange(e)}
        ></input>
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
