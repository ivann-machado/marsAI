function VideoCard({ video, type }) {
  return (
    <div
      key={video.id}
      className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1"
    >
      <img src={video.cover_image} className="m-auto"></img>
      <p className="flex justify-center items-center">{video.title}</p>
      <p className="flex justify-center items-center">{video.producer}</p>
      <p
        className={
          (video.status === "unverified"
            ? "bg-amber-500"
            : video.status === "verified" || video.status === "selected"
              ? "bg-green-600"
              : "bg-red-700") + " flex justify-center items-center"
        }
      >
        {video.status}
      </p>
      <a
        href={"/video/" + video.id}
        className="flex justify-center items-center"
      >
        {type === "queue" ? "Noter Film" : "Details"}
      </a>
      <div
        className={
          "w-8 h-4 bg-gray-600 m-auto " +
          (video.status === "selected" ? " bg-green-600 " : " bg-red-700 ")
        }
      ></div>
    </div>
  );
}

function VideoList(props) {
  const filters = props.filters;
  console.log(filters);

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

      {props.videoList.map((video) =>
        filters ? (
          filters.title && video.title.includes(filters.title) ? (
            filters.producer &&
            filters.producer != "" &&
            video.producer.includes(filters.producer) ? (
              <VideoCard video={video} type={props.type} />
            ) : null
          ) : null
        ) : (
          <VideoCard video={video} type={props.type} />
        ),
      )}
    </div>
  );
}

export default VideoList;

// && video.title.includes(filters.title)
