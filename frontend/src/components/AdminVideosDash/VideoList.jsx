import { useState } from "react";
import { useFlash } from "../../context/FlashContext";
import { useauth } from "../../context/AuthContext";

function VideoCard({ video, type }) {
  const [currVideo, setCurrVideo] = useState(video);
  const { showFlash } = useFlash();
  const authToken = useauth();

  const selectVideo = async (operation) => {
    // selected ou verified
    if (operation === "selected" && currVideo.status != "verified") {
      showFlash("error", "Video must be verified before being selected.");
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/videos/" + currVideo.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken.token,
          },
          body: JSON.stringify({ status: operation }),
        },
      );

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");
      setCurrVideo((prev) => ({ ...prev, status: operation }));
      showFlash("success", "Video is now " + operation + "!");
    } catch (err) {
      showFlash("error", "Erreur lors du changement du status");
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-6 w-full mx-4 my-2 text-center border-t p-1">
      <img src={currVideo.cover_image} className="m-auto rounded-md "></img>
      <p className="flex justify-center items-center">{currVideo.title}</p>
      <p className="flex justify-center items-center">{currVideo.producer}</p>
      <div className="flex justify-center items-center">
        <p
          className={
            (currVideo.status === "unverified"
              ? "bg-amber-500"
              : currVideo.status === "verified" ||
                  currVideo.status === "selected"
                ? "bg-green-600"
                : "bg-red-700") + " p-2 rounded-2xl"
          }
        >
          {currVideo.status}
        </p>
      </div>
      <div className="flex justify-center items-center ">
        <a
          href={"/video/" + currVideo.id}
          className="bg-gray-700 p-2 rounded-md hover:ring-2 hover:ring-purple-600"
        >
          Noter Film
        </a>
      </div>
      {type != "queue" ? (
        <div className="flex justify-center items-center ">
          <p
            className={
              "m-auto p-2 rounded-md cursor-pointer hover:ring-2 hover:ring-purple-600 " +
              (currVideo.status !== "selected"
                ? " bg-green-600 "
                : " bg-red-700 ")
            }
            onClick={() => {
              if (currVideo.status !== "selected") selectVideo("selected");
              else selectVideo("verified");
            }}
          >
            {currVideo.status === "selected" ? "Unselect" : "Select"}
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
