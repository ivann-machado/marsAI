function JuryCard({ image_url, name, profession, bio }) {
  //console.log(image_url, name, profession, bio);
  return (
    <>
      <div
        className={
          "w-9/10 mx-auto mt-4 rounded-t-xl md:rounded-xl min-h-100 relative overflow-hidden md:max-w-100"
        }
      >
        <div
          className={
            "bg-cover bg-center absolute inset-0 filter grayscale hover:grayscale-0"
          }
          style={{ backgroundImage: `url(${image_url})` }} // pour fix tailwind bg-url qui ne fonctionne pas avec l'url dynamique
        ></div>
        <div className="absolute inset-left-0 bottom-0 m-2 backdrop-blur-sm w-auto p-2 rounded-4xl group">
          <p className="text-pink-600 font-bold text-lg ">{profession}</p>
          <p className="text-white font-bold text-2xl ">{name}</p>
          <p className="text-white text-md tracking-tight hidden group-hover:block">
            {bio}
          </p>
        </div>
      </div>
      <p className="w-9/10 mx-auto mb-4 text-white text-md tracking-tight md:hidden rounded-b-xl bg-gray-200/30 p-2 indent-2">
        {bio}
      </p>
    </>
  );
}

export default JuryCard;
