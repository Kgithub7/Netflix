import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { logIn, logOut, signUp } from "../../firebase.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

import NetflixSpinner from "../assets/netflix_spinner.gif";

const Login = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("guest@welcome.com");
  const [password, setPassword] = useState("guest123");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await logOut();
      } catch (error) {
        toast.error(
          "An unexpected error occurred. Could not sign out. Please try again.",
          {
            autoClose: 3000,
            theme: "dark",
          },
        );
      }
    })();
  }, []);

  const userAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await (status === "Sign In"
        ? logIn(email, password)
        : signUp(name, email, password));
      console.log(response);
      if (response.success) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/home");
        }, 2000);
      } else
        toast.error(response.error, {
          autoClose: 3000,
          closeOnClick: true,
          theme: "dark",
        });
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.", {
        autoClose: 3000,
        theme: "dark",
      });
    }
  };
  return loading ? (
    <div className="flex h-dvh w-dvw items-center justify-center bg-black">
      <img src={NetflixSpinner} className="w-30" />
    </div>
  ) : (
    <div className="h-dvh w-dvw bg-[linear-gradient(to_right,#00000070,#00000070),url(/background_banner.jpg)] bg-cover bg-center bg-no-repeat px-[4%] py-5">
      <img src={Logo} className="w-37.5" />
      <div className="absolute top-1/2 left-1/2 mt-5 w-3/5 max-w-120 min-w-70 -translate-1/2 rounded-sm bg-black/75 p-5 sm:mt-0 sm:w-3/10 sm:max-w-150 sm:min-w-110 sm:p-15">
        <h1 className="mb-4 text-3xl font-bold sm:mb-7">{status}</h1>
        <form
          className="[&>button]:my-5 [&>button]:w-full [&>button]:cursor-pointer [&>button]:rounded-sm [&>button]:border-0 [&>button]:bg-[#e50914] [&>button]:p-4 [&>button]:text-white [&>button]:outline-0 [&>button]:hover:bg-red-700 [&>input]:my-3 [&>input]:h-12.5 [&>input]:w-full [&>input]:rounded-sm [&>input]:border-0 [&>input]:bg-[#333] [&>input]:p-[16px_20px] [&>input]:text-sm [&>input]:text-white [&>input]:outline-none [&>input::placeholder]:text-base"
          onSubmit={userAuth}
        >
          {status == "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
          <button type="submit">{status}</button>
          <div className="flex items-center justify-between text-sm text-[#b3b3b3]">
            <div className="flex items-center gap-x-1">
              <input type="checkbox" className="size-4.5" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a
              href="https://help.netflix.com/en/node/470"
              className="cursor-pointer"
              target="_blank"
            >
              Need Help?
            </a>
          </div>
        </form>
        <div className="mt-10 text-xs text-[#737373] sm:text-base [&_button]:ml-1.5 [&_button]:cursor-pointer [&_button]:text-white">
          {status == "Sign In" ? (
            <p>
              New to Netflix?
              <button onClick={() => setStatus("Sign Up")}>Sign Up Now</button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button onClick={() => setStatus("Sign In")}>Sign In Now</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
