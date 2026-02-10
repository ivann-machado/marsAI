import { useEffect, useState } from "react";
import JuryCard from "../../components/JuryCard/JuryCard";

function JuryPage() {
  const [jury, setJury] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Erreur fetch JSON");
        const json = await response.json();
        setJury(json.mockedJury);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!jury) return <p>Loading</p>;

  return (
    <div>
      {jury.map((member) => {
        return (
          <JuryCard
            key={member.id}
            image_url={member.photo}
            name={member.name}
            profession={member.profession}
            bio={member.bio}
          />
        );
      })}
    </div>
  );
}

export default JuryPage;
