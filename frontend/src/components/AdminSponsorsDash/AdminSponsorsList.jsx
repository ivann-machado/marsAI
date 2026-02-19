import AdminSponsorCard from "./AdminSponsorCard";

function AdminSponsorList({ sponsor_list }) {
  return (
    <div className="flex flex-col mx-2 mb-8">
      <h2 className="text-4xl font-extrabold m-8">Liste des Sponsors</h2>
      <div className="grid grid-cols-7 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
        <p className="text-center text-xl font-bold">Edition</p>
        <p className="text-center text-xl font-bold">Logo</p>
        <p className="text-center text-xl font-bold">Nom</p>
        <p className="text-center text-xl font-bold">Type</p>
        <p className="text-center text-xl font-bold">Url</p>
      </div>
      {sponsor_list.map((sponsor) => {
        return (
          <AdminSponsorCard
            key={sponsor.id}
            id={sponsor.id}
            edition_id={sponsor.edition_id}
            name={sponsor.name}
            type={sponsor.type}
            url={sponsor.url}
            logo={sponsor.logo}
          />
        );
      })}
    </div>
  );
}

export default AdminSponsorList;
