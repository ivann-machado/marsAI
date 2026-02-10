function JuryCard({ image_url, name, profession, bio }) {
  console.log(image_url, name, profession, bio);
  return (
    <div
      className={
        "w-9/10 mx-auto my-4 rounded-xl min-h-100 relative overflow-hidden"
      }
    >
      <div
        className={
          "bg-[url('" +
          image_url +
          "')] bg-cover bg-center absolute inset-0 filter grayscale hover:grayscale-0"
        }
      ></div>
      <div className="absolute inset-x-0 bottom-0 m-8">
        <p className="text-pink-600 font-bold text-xl ">{profession}</p>
        <p className="text-white font-bold text-3xl ">{name}</p>
        <p className="text-white text-lg">{bio}</p>
      </div>
    </div>
  );
}

export default JuryCard;
