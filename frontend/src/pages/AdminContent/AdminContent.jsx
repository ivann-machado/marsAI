import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import Loading from "../../components/Utils/Loading.jsx";
import AdminContentCard from "../../components/AdminContentDash/AdminContentCard.jsx";

function AdminContent() {
  const [content, setContent] = useState(null);
  const [modified, setModified] = useState(false);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/api/content",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setContent(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  function changeContent(name, value) {
    setContent((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, value: value } : item,
      ),
    );
    //setContent((prev) => ({ ...prev, [name]: value }));
    setModified(true);
  }

  function addNewValue(name, value) {
    changeContent(name, value);
    setNewName("");
    setNewValue("");
  }

  function deleteContent(name) {
    setContent((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
    setModified(false);
  }

  if (!content)
    return (
      <>
        <AdminSidebar />
        <Loading />
      </>
    );

  console.log(content);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col w-4/5 bg-gray-600 relative">
        <div className="flex flex-col mx-2 mb-8">
          <h2 className="text-4xl font-extrabold m-8">Content Items</h2>
          <div className="grid grid-cols-4 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
            <p className="text-center text-xl font-bold">Content</p>
            <p className="text-center text-xl font-bold">Value</p>
          </div>
          {content.map((content_item) => (
            <AdminContentCard
              name={content_item.name}
              value={content_item.value}
            />
          ))}
          {/* <form className="flex flex-col mx-auto bg-gray-800 text-white p-4">
            <p>Créer nouveau content:</p>
            <input
              value={newName}
              placeholder="name"
              onChange={(e) => setNewName(e.target.value)}
              className="bg-white text-black"
            ></input>
            <input
              value={newValue}
              placeholder="value"
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-white text-black"
            ></input>
            <button
              className="bg-white text-black mt-4"
              onClick={() => addNewValue(newName, newValue)}
            >
              Enregistrer
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
}

export default AdminContent;
