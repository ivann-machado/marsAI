function AdminPrizeCard({ prize_data }) {
  const prize = prize_data;

  // console.log(prize);

  return (
    <div className="grid grid-cols-4 p-2 bg-gray-900 text-gray-100 gap-2">
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.id}
      </div>
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.prix}
      </div>
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.title}
      </div>
      <div className="bg-gray-700 text-center col-span-1 p-2 rounded-lg hover:bg-gray-500">
        {prize.producer}
      </div>
    </div>
  );
}

export default AdminPrizeCard;
