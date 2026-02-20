import { useState } from "react";

function AdminContentCard({ name, value }) {
  const [content, setContent] = useState({
    name,
    value,
  });

  return (
    <div
      key={content.name}
      className="grid grid-cols-4 p-2 bg-gray-900 text-gray-100 gap-2"
    >
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {content.name}
      </div>
      <input
        value={content.value}
        onChange={(e) => changeContent(content.name, e.target.value)}
        className="text-center col-span-1 rounded-lg border border-gray-400 bg-gray-100 text-black p-1 hover:bg-white hover:border-blue-500"
      ></input>
      {modified ? (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-green-700 text-gray-100 rounded-l-lg -mr-2 hover:bg-green-500"
          onClick={() => saveSponsor()}
        ></input>
      ) : (
        <input
          type="button"
          value="Sauvegarder"
          className="col-span-1 p-2 bg-gray-100 text-black rounded-l-lg -mr-2"
        ></input>
      )}
      <input
        type="button"
        value="Supprimer"
        className="col-span-1 p-2 bg-red-700 rounded-r-lg hover:bg-red-500"
        onClick={(e) => deleteSponsor()}
      ></input>
    </div>
  );
}

export default AdminContentCard;
