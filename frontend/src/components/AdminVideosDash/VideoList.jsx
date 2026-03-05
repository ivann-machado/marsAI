function VideoCard({ video, type }) {
  const selectVideo = () => {};

  return (
    <div className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1">
      <img src={video.cover_image} className="m-auto rounded-md "></img>
      <p className="flex justify-center items-center">{video.title}</p>
      <p className="flex justify-center items-center">{video.producer}</p>
      <div className="flex justify-center items-center">
        <p
          className={
            (video.status === "unverified"
              ? "bg-amber-500"
              : video.status === "verified" || video.status === "selected"
                ? "bg-green-600"
                : "bg-red-700") + " p-2 rounded-2xl"
          }
        >
          {video.status}
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <a
          href={"/video/" + video.id}
          className="bg-gray-700 p-2 rounded-md hover:ring-2 hover:ring-purple-600"
        >
          {type === "queue" ? "Noter Film" : "Details"}
        </a>
      </div>
      {type != "queue" ? (
        <div
          className={
            "w-8 h-4 bg-gray-600 m-auto " +
            (video.status === "selected" ? " bg-green-600 " : " bg-red-700 ")
          }
        >
          <p>
            className=
            {"w-8 h-4 bg-gray-600 m-auto " +
              (video.status === "selected" ? " bg-green-600 " : " bg-red-700 ")}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function checkFilter(filter, video) {
  if (!filter) return true;
  if (filter.title && filter.title != "")
    if (!video.title.includes(filter.title)) return false;
  if (filter.producer && filter.producer != "")
    if (!video.producer.includes(filter.producer)) return false;
  if (filter.status && filter.status != "")
    if (!(video.status === filter.status)) return false;
  if (filter.selected && filter.selected === "selected")
    if (!(video.status === filter.selected)) return false;
  return true;
}

function VideoList(props) {
  const filters = props.filters;

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
        checkFilter(filters, video) ? (
          <VideoCard video={video} key={video.id} type={props.type} />
        ) : null,
      )}
    </div>
  );
}

export default VideoList;

// && video.title.includes(filters.title)
