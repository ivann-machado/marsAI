const AIList = ({ type, data }) => {
  if (!data || data.trim() === "") return null;

  const items = data.split(",").map((item) => item.trim());

  return (
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
};

export default AIList;
