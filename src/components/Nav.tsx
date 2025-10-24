import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../firebase";
import { toast } from "react-toastify";
import DropdownIcon from "../assets/caret_icon.svg";
import ProfileImg from "../assets/profile_img.png";
import SearchIcon from "../assets/search_icon.svg";
import BellIcon from "../assets/bell_icon.svg";
import Logo from "../assets/logo.png";

const Nav = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) navRef.current?.classList.add("bg-[#141414]");
      else navRef.current?.classList.remove("bg-[#141414]");
    });
    return () =>
      window.removeEventListener("scroll", () => {
        if (window.scrollY >= 80) navRef.current?.classList.add("bg-[#141414]");
        else navRef.current?.classList.remove("bg-[#141414]");
      });
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await logOut();
      if (!response.success) {
        toast.error(response.error, { autoClose: 3000, theme: "dark" });
      } else {
        navigate("/");
        toast.success("Signed out.", {
          autoClose: 3000,
          theme: "dark",
          pauseOnHover: false,
        });
      }
    } catch (error) {
      toast.error("Unexpected error during sign out.", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div
      ref={navRef}
      className="fixed z-1 flex w-full justify-between bg-linear-180 from-black to-transparent px-[4%] py-5 text-sm text-[#e5e5e5] transition-all duration-500"
    >
      <div className="flex items-center gap-x-5 text-[clamp(.75rem,1dvw,1.5rem)] lg:gap-x-12.5">
        <img src={Logo} className="w-[clamp(6rem,5dvw,10rem)]" />
        <ul className="hidden gap-x-2.5 md:flex lg:gap-x-5 [&>*]:cursor-pointer [&>*]:transition [&>*]:duration-200 [&>*]:not-first:hover:text-gray-300">
          <li>Home</li>
          <li>Shows</li>
          <li>Movies</li>
          <li>Games</li>
          <li>New&nbsp;&&nbsp;Popular</li>
          <li>My&nbsp;List</li>
          <li>Browse&nbsp;by&nbsp;Languages</li>
        </ul>
      </div>
      <div className="flex items-center gap-x-4 xl:gap-x-8 [&>img]:w-[clamp(1rem,1dvw,2rem)] [&>img]:cursor-pointer">
        <img src={SearchIcon} />
        <img src={BellIcon} />
        <div className="relative flex cursor-pointer items-center gap-x-1.5 lg:gap-x-2.5 hover:[&>div]:block">
          <img
            src={ProfileImg}
            className="w-[clamp(2rem,3dvw,3.5rem)] rounded-sm"
            onClick={() => setClicked(true)}
          />
          <img src={DropdownIcon} />
          <div
            className={`absolute top-full right-0 z-1 ${clicked ? "block" : "hidden"} w-max rounded-xs bg-[#191919] px-5.5 py-4.5 [&>button]:cursor-pointer [&>button]:text-sm [&>button]:hover:underline`}
          >
            <button onClick={handleSignOut}>Sign Out of Netflix</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
