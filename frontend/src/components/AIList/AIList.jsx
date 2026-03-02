const AIList = ({ type, data }) => {
  if (!data || data.trim() === "") return null;

  const items = data.split(",").map((item) => item.trim());

  /* return (
    <div className="m-4">
      <p className="text-gray-200">{type}</p>
      <div className="flex gap-4 flex-wrap justify-center">
        {items.map((item, index) => (
          <p className="border rounded-xl bg-gray-800 p-2" key={index}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}; */
  return (
    <div className="m-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 text-center">
        {type}
      </p>

      <div className="flex flex-wrap gap-3">
        {items.map((item, index) => (
          <span
            key={index}
            className="px-4 py-1.5 text-sm font-medium bg-gray-800/70 text-gray-200 rounded-full border border-gray-700 backdrop-blur-sm transition hover:bg-gray-700 hover:border-purple-700 hover:scale-105"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
export default AIList;
