function VideoList(props) {
  return (
    <div className="bg-gray-900 text-white">
      <div className="grid grid-cols-6 w-full mx-4 my-2 text-center">
        <p>Cover</p>
        <p>Titre</p>
        <p>Realisateur</p>
        <p>Status</p>
        <p></p>
        <p>Selection</p>
      </div>
      {props.videoList.map((video) => (
        <div
          key={video.id}
          className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1"
        >
          <img src={video.cover_image} className="m-auto"></img>
          <p>{video.title}</p>
          <p>{video.producer}</p>
          <p
            className={
              video.status === "unverified"
                ? "bg-amber-500"
                : video.status === "verified" || video.status === "selected"
                  ? "bg-green-600"
                  : "bg-red-700"
            }
          >
            {video.status}
          </p>
          <a href={"/video/" + video.id}>Details</a>
          <div
            className={
              "w-8 h-4 bg-gray-600 m-auto " +
              (video.status === "selected" ? " bg-green-600 " : " bg-red-700 ")
            }
          ></div>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
