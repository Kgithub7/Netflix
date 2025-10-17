import { useEffect, useState } from "react";
import BackArrowIcon from "../assets/back_arrow_icon.png";
import type { Video, VideosResponse } from "../types/VideosTypes";
import type { AxiosRequestConfig } from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isShow: boolean = location.state?.tv;
  const [video, setVideo] = useState<Video | null>(null);
  const [hasVideo, setHasVideo] = useState<boolean | null>(true);

  const options: AxiosRequestConfig = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGMwMzgyZDA5NWQxYzUyNWQyZWVmNWQyMzY1ZTU5OCIsIm5iZiI6MTc2MDMzNjg5Mi4yNzcsInN1YiI6IjY4ZWM5YmZjMjZiYjdlMDJmZTBkNzlmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s_FsYBL9c4D9GQSjolmKsrbJ6-W7JG37ga3Xahhw3tw",
    },
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const mediaType = isShow ? "tv" : "movie";
        const { data } = await axios.get<VideosResponse>(
          `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
          options,
        );
        if (
          data.success === false ||
          !data.results ||
          data.results.length === 0
        ) {
          setHasVideo(false);
          setVideo(null);
          return;
        }
        setVideo(data.results ? data.results[0] : null);
        setHasVideo(true);
        console.log(data.results);
      } catch (error) {
        setHasVideo(false);
        setVideo(null);
      }
    };
    if (id) {
      setHasVideo(true);
      fetchVideo();
    }
  }, [id, isShow]);

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <img
        src={BackArrowIcon}
        className="absolute top-5 left-5 size-12 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      {hasVideo == false ? (
        <p className="absolute top-1/2 left-1/2 -translate-1/2 text-2xl font-bold">
          Video is currently unavailable
        </p>
      ) : video ? (
        <>
          <iframe
            width={"90%"}
            height={"90%"}
            src={
              video?.key
                ? `https://www.youtube.com/embed/${video?.key}`
                : undefined
            }
            title="trailer"
            allowFullScreen
            className="rounded-xl"
          ></iframe>
          <div className="flex w-9/10 items-center justify-around">
            <p>
              Date Published:&nbsp;
              {video?.published_at
                ? new Date(video.published_at).toLocaleDateString()
                : "—"}
            </p>
            <p>Name:&nbsp;{video?.name}</p>
            <p>Type:&nbsp;{video?.type}</p>
          </div>
        </>
      ) : (
        <div className="absolute top-1/2 left-1/2 size-9/10 -translate-1/2 animate-pulse rounded-xl bg-gray-600"></div>
      )}
    </div>
  );
};

export default Player;
