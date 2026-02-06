function AdminJury() {
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

  return (
    <form>
      <p>Ajouter membre jury:</p>
      <label for="jury_name">Nom et prénom</label>
      <input id="jury_name"></input>
      <label for="jury_name">Nom et prénom</label>
      <input id="jury_name"></input>
    </form>
  );
}

export default AdminJury;
