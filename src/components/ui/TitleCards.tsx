import { useEffect, useRef, useState } from "react";
import axios, { type AxiosRequestConfig } from "axios";
import type { MovieCard, MoviesResponse } from "../../types/MovieTypes.tsx";
import type { ShowCard, ShowsResponse } from "../../types/TVShowTypes.tsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  title?: string;
  category?: string;
  tv?: boolean;
}

const TitleCards = ({ title, category, tv }: Props) => {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const [movies, setMovies] = useState<MovieCard[] | null>(null);
  const [shows, setShows] = useState<ShowCard[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const options: AxiosRequestConfig = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGMwMzgyZDA5NWQxYzUyNWQyZWVmNWQyMzY1ZTU5OCIsIm5iZiI6MTc2MDMzNjg5Mi4yNzcsInN1YiI6IjY4ZWM5YmZjMjZiYjdlMDJmZTBkNzlmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s_FsYBL9c4D9GQSjolmKsrbJ6-W7JG37ga3Xahhw3tw",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MoviesResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          options,
        );
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        toast.error(
          "An unexpected error occurred while fetching movies. Please try again.",
          {
            autoClose: 3000,
            theme: "dark",
          },
        );
      }
    };
    const fetchShows = async () => {
      try {
        const { data } = await axios.get<ShowsResponse>(
          `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`,
          options,
        );
        setShows(data.results);
        setLoading(false);
      } catch (error) {
        toast.error(
          "An unexpected error occurred while fetching TV shows. Please try again.",
          {
            autoClose: 3000,
            theme: "dark",
          },
        );
      }
    };
    tv ? fetchShows() : fetchMovies();
    cardsRef.current?.addEventListener("wheel", handleScroll, {
      passive: false,
    });
    return () => cardsRef.current?.removeEventListener("wheel", handleScroll);
  }, []);

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    event.deltaX > 0
      ? cardsRef.current && (cardsRef.current.scrollLeft += event.deltaX)
      : cardsRef.current && (cardsRef.current.scrollLeft += event.deltaY);
  };

  return (
    <div className="mt-12.5 mb-3">
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <div
        className="no-scrollbar flex scroll-px-30 flex-nowrap gap-x-2.5 overflow-x-auto"
        ref={cardsRef}
      >
        {loading
          ? new Array(10).fill(null).map((_, index) => {
              return (
                <div
                  key={index}
                  className="mt-2 flex aspect-video w-70 shrink-0 animate-pulse snap-end flex-col items-end gap-y-2"
                >
                  <div className="size-full rounded-sm bg-gray-600"></div>
                  <div className="aspect-video size-10 w-3/5 max-w-70 rounded-sm bg-gray-600"></div>
                </div>
              );
            })
          : tv
            ? shows?.map((show: ShowCard) => {
                if (
                  show.backdrop_path != null &&
                  show.id >= 0 &&
                  show.name.length > 0
                )
                  return (
                    <Link
                      to={`/player/${show.id}`}
                      key={show.id}
                      state={{ tv: true }}
                      className="relative mt-2 flex w-70 shrink-0 snap-end flex-col items-end overflow-visible"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
                        className="w-full cursor-pointer rounded-sm"
                      />
                      <p className="w-auto max-w-9/10 text-right text-lg font-medium">
                        {show.name}
                      </p>
                    </Link>
                  );
              })
            : movies?.map((movie: MovieCard) => {
                if (
                  movie.backdrop_path != null &&
                  movie.id >= 0 &&
                  movie.title.length > 0
                )
                  return (
                    <Link
                      to={`/player/${movie.id}`}
                      key={movie.id}
                      state={{ tv: false }}
                      className="relative mt-2 flex w-70 shrink-0 snap-end flex-col items-end overflow-visible"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        className="w-full cursor-pointer rounded-sm"
                      />
                      <p className="w-auto max-w-9/10 text-right text-lg font-medium">
                        {movie.title}
                      </p>
                    </Link>
                  );
              })}
      </div>
    </div>
  );
};

export default TitleCards;
