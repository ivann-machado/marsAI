function AdminVideosDash() {
  let mockedVideosQueue = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
      title: "Test Video",
      producer: "John Doe",
      producer_image: "../src/assets/producer_image.png",
      description:
        "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
      cover_image: "",
      country_name: "France",
      country_iso: "FR",
      linkedin_link: "",
      youtube_link: "",
      scenario_ai: "ChatGPT, Claude",
      video_gen_ai: "Sona",
      sound_ai: "",
      postprod_ai: "",
      status: "unverified",
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
      title: "Test Video",
      producer: "John Doe",
      producer_image: "../src/assets/producer_image.png",
      description:
        "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
      cover_image: "",
      country_name: "France",
      country_iso: "FR",
      linkedin_link: "",
      youtube_link: "",
      scenario_ai: "ChatGPT, Claude",
      video_gen_ai: "Sona",
      sound_ai: "",
      postprod_ai: "",
      status: "verified",
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
      title: "Test Video",
      producer: "John Doe",
      producer_image: "../src/assets/producer_image.png",
      description:
        "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
      cover_image: "",
      country_name: "France",
      country_iso: "FR",
      linkedin_link: "",
      youtube_link: "",
      scenario_ai: "ChatGPT, Claude",
      video_gen_ai: "Sona",
      sound_ai: "",
      postprod_ai: "",
      status: "verified",
    },
  ];

  let mockedVideos = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
      title: "Test Video",
      producer: "John Doe",
      producer_image: "../src/assets/producer_image.png",
      description:
        "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
      cover_image: "",
      country_name: "France",
      country_iso: "FR",
      linkedin_link: "",
      youtube_link: "",
      scenario_ai: "ChatGPT, Claude",
      video_gen_ai: "Sona",
      sound_ai: "",
      postprod_ai: "",
      status: "unverified",
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
      title: "Test Video",
      producer: "John Doe",
      producer_image: "../src/assets/producer_image.png",
      description:
        "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
      cover_image: "",
      country_name: "France",
      country_iso: "FR",
      linkedin_link: "",
      youtube_link: "",
      scenario_ai: "ChatGPT, Claude",
      video_gen_ai: "Sona",
      sound_ai: "",
      postprod_ai: "",
      status: "verified",
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/_cPdvX-0kRA?si=MP3jAxInyj04TUlx",
      title: "Test Video",
      producer: "John Doe",
      producer_image: "../src/assets/producer_image.png",
      description:
        "Dans une ville côtière battue par les tempêtes, Élias, un ancien ingénieur radio marqué par la disparition inexpliquée de sa femme, vit reclus dans un phare abandonné. Une nuit, il capte sur une fréquence interdite un message codé… prononcé avec la voix exacte de sa femme, pourtant déclarée morte depuis dix ans.",
      cover_image: "",
      country_name: "France",
      country_iso: "FR",
      linkedin_link: "",
      youtube_link: "",
      scenario_ai: "ChatGPT, Claude",
      video_gen_ai: "Sona",
      sound_ai: "",
      postprod_ai: "",
      status: "verified",
    },
  ];
  return (
    <>
      <h1>Gestion des films</h1>
      {/* MOVIE QUEUE */}
      <div>
        {mockedVideosQueue.map((video) => (
          <div key={video.id}>
            <img src={video.cover_image}></img>
            <p>{video.title}</p>
            <p>{video.producer}</p>
            <p>{video.status}</p>
            <a src={"/video/" + video.id}>Details</a>
          </div>
        ))}
      </div>
      {/* SEARCH BAR */}
      <div>
        <input type="text" placeholder="rechercher"></input>
        <input type="button" value="Filtrer"></input>
      </div>
      {/* OTHER MOVIES */}
      <div>
        {mockedVideosQueue.map((video) => (
          <div key={video.id}>
            <img src={video.cover_image}></img>
            <p>{video.title}</p>
            <p>{video.producer}</p>
            <p>{video.status}</p>
            <a src={"/video/" + video.id}>Details</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminVideosDash;
