const AIList = ({ type, data }) => {
  if (!data || data.trim() === "") return null;

  const items = data.split(",").map((item) => item.trim());

  return (
    <div>
      <p>{type}</p>
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default AIList;
