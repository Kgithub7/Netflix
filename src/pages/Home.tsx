import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../../firebase";
import Nav from "../components/Nav";
import HeroBanner from "../assets/hero_banner.jpeg";
import HeroTitle from "../assets/hero_title.png";
import PlayIcon from "../assets/play_icon.png";
import PlusIcon from "../assets/plus_icon.png";
import InfoIcon from "../assets/info_icon.png";
import TitleCards from "../components/ui/TitleCards";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      !user && navigate("/");
    });
  }, []);

  return (
    <>
      <Nav />
      <div className="relative hidden md:block">
        <img
          src={HeroBanner}
          className="h-dvh w-dvw mask-b-from-80% mask-l-from-70% object-cover"
        />

        <div className="absolute -bottom-16 w-full pl-[4%]">
          <img
            src={HeroTitle}
            className="mb-7.5 w-9/10 max-w-80 md:max-w-100 lg:max-w-120"
          />
          <p className="mb-5 max-w-100 text-lg text-shadow-[0_0px_10px_rgb(0_0_0_/_.5)] md:max-w-120 lg:max-w-150 lg:text-xl">
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>
          <div className="mb-1.5 flex gap-x-2.5 [&_img]:w-6.25 [&>*]:inline-flex [&>*]:cursor-pointer [&>*]:items-center [&>*]:gap-x-2.5 [&>*]:rounded-sm [&>*]:border-0 [&>*]:bg-white [&>*]:px-7 [&>*]:py-3 [&>*]:font-bold [&>*]:outline-0 [&>button:nth-of-type(1)]:text-black [&>button:nth-of-type(1)]:hover:bg-[#ffffffbf] [&>button:nth-of-type(2)]:bg-[#6d6d6eb3] [&>button:nth-of-type(2)]:hover:bg-[#6d6d6ea1]">
            <button>
              <img src={PlayIcon} />
              Play
            </button>
            <button>
              <img src={InfoIcon} />
              More Info
            </button>
          </div>
          <TitleCards title="New Movies on Netflix" category="now_playing" />
        </div>
      </div>
      <div className="relative top-20 left-1/2 flex size-9/10 min-w-70 -translate-x-1/2 flex-col items-center md:hidden">
        <img src={HeroBanner} className="rounded-2xl" />
        <img src={HeroTitle} className="absolute top-0 left-3 flex w-1/2" />
        <div className="mt-5 mb-20 flex gap-x-5 [&_img]:w-5 [&>*]:inline-flex [&>*]:cursor-pointer [&>*]:items-center [&>*]:justify-center [&>*]:gap-x-2.5 [&>*]:rounded-sm [&>*]:border-0 [&>*]:bg-white [&>*]:px-10 [&>*]:py-2 [&>*]:font-bold [&>*]:outline-0 [&>button:nth-of-type(1)]:text-black [&>button:nth-of-type(1)]:hover:bg-[#ffffffbf] [&>button:nth-of-type(2)]:bg-[#6d6d6eb3] [&>button:nth-of-type(2)]:hover:bg-[#6d6d6ea1]">
          <button>
            <img src={PlayIcon} />
            Play
          </button>
          <button>
            <img src={PlusIcon} className="invert" />
            My&nbsp;List
          </button>
        </div>
      </div>
      <div className="pl-[4%]">
        <TitleCards title="Blockbuster Movies" category="top_rated" />
        <TitleCards
          title="Familiar TV Favorites"
          category="popular"
          tv={true}
        />
        <TitleCards title="Fan Favorite Movies" category="popular" />
        <TitleCards
          title="Critically Acclaimed TV Shows"
          category="top_rated"
          tv={true}
        />
        <TitleCards title="Coming Soon to Netflix" category="upcoming" />
      </div>
      <Footer />
    </>
  );
};

export default Home;
