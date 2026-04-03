import AdminJuryCard from "./AdminJuryCard";

function AdminJuryList({ jury_list }) {
  return (
    <div className="flex flex-col mx-2 mb-8">
      <h2 className="text-4xl font-extrabold m-8 text-white">Liste des Jury</h2>
      <div className="grid grid-cols-7 p-2 bg-gray-900 text-gray-100 gap-2 px-6">
        <p className="text-center text-xl font-bold">Edition</p>
        <p className="text-center text-xl font-bold">Photo</p>
        <p className="text-center text-xl font-bold">Nom</p>
        <p className="text-center text-xl font-bold">Bio</p>
        <p className="text-center text-xl font-bold">Profession/Role</p>
      </div>
      {jury_list.map((jury) => {
        return (
          <AdminJuryCard
            key={jury.id}
            id={jury.id}
            edition_id={jury.edition_id}
            name={jury.name}
            bio={jury.bio}
            photo={jury.photo}
            profession={jury.profession}
          />
        );
      })}
    </div>
  );
}

export default AdminJuryList;
