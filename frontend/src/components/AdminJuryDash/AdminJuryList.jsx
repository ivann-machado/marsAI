import AdminJuryCard from "./AdminJuryCard";

function AdminJuryList({ jury_list }) {
  return (
    <div className="flex flex-col mx-8 mb-8">
      <h2 className="text-4xl font-extrabold">Liste de Jury</h2>
      {jury_list.map((jury) => {
        return (
          <AdminJuryCard
            key={jury.id}
            id={jury.id}
            edition_id={jury.edition_id}
            name={jury.name}
            bio={jury.bio}
            profession={jury.profession}
          />
        );
      })}
    </div>
  );
}

export default AdminJuryList;
