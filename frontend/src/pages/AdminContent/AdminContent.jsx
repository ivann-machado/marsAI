import { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";

function AdminContent() {
  const [content, setContent] = useState(null);
  const [modifiedContent, setModifiedContent] = useState({});
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setContent(json.mockedContent);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  function changeContent(name, value) {
    setContent((prev) => ({ ...prev, [name]: value }));
    setModifiedContent((prev) => ({ ...prev, [name]: value }));
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
    setModifiedContent((prev) => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }

  if (!content)
    return (
      <>
        <AdminSidebar />
        <p>Loading...</p>
      </>
    );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-4/5 text-white bg-gray-950">
        <div>
          <div className="grid grid-cols-3 text-center border border-gray-400 mb-4">
            <div className="col-span-1 border border-gray-400 text-xl font-bold">
              Content
            </div>
            <div className="col-span-1 border border-gray-400 text-xl font-bold">
              Value
            </div>
            <div className="col-span-1 border border-gray-400 text-xl font-bold">
              Supprimer
            </div>
          </div>
          {Object.entries(content).map(([name, value]) => (
            <div key={name} className="grid grid-cols-3 text-center">
              <div className="col-span-1 border border-gray-400">{name}</div>
              <input
                value={value}
                onChange={(e) => changeContent(name, e.target.value)}
                className="col-span-1 border border-gray-400 bg-gray-100 text-black p-1 hover:bg-white hover:border-blue-500"
              ></input>
              <input
                type="button"
                value="X"
                onClick={(e) => deleteContent(name, e.target.value)}
                className="col-span-1 border border-gray-400 bg-red-800 text-white hover:bg-red-600"
              ></input>
            </div>
          ))}
          <h3 className="text-lg font-bold mb-4">Créer nouveau content:</h3>
          <div className="grid grid-cols-3 text-center">
            <input
              value={newName}
              placeholder="name"
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-1 border border-gray-400 bg-gray-300 text-black"
            ></input>
            <input
              value={newValue}
              placeholder="value"
              onChange={(e) => setNewValue(e.target.value)}
              className="col-span-1 border border-gray-400 bg-gray-300 text-black"
            ></input>
            <button
              className="col-span-1 border border-gray-400 bg-gray-300 text-black hover:bg-gray-500"
              onClick={() => addNewValue(newName, newValue)}
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminContent;
