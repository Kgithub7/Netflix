import { useState } from "react";
import Logo from "../assets/logo.png";

const Login = () => {
  const [login, setLogin] = useState("Sign In");

  return (
    <div className="h-dvh bg-[linear-gradient(to_right,#00000070,#00000070),url(/background_banner.jpg)] bg-cover bg-center bg-no-repeat px-[6%] py-5">
      <img src={Logo} className="w-37.5" />
      <div className="absolute top-1/2 left-1/2 mx-auto w-full max-w-112.5 -translate-1/2 rounded-sm bg-black/75 p-15">
        <h1 className="mb-7 text-3xl font-medium">{login}</h1>
        <form className="[&>button]:my-5 [&>button]:w-full [&>button]:cursor-pointer [&>button]:rounded-sm [&>button]:border-0 [&>button]:bg-[#e50914] [&>button]:p-4 [&>button]:text-white [&>button]:outline-0 [&>button]:hover:bg-red-700 [&>input]:my-3 [&>input]:h-12.5 [&>input]:w-full [&>input]:rounded-sm [&>input]:border-0 [&>input]:bg-[#333] [&>input]:p-[16px_20px] [&>input]:text-sm [&>input]:text-white [&>input]:outline-none [&>input::placeholder]:text-base">
          {login == "Sign Up" && <input type="text" placeholder="Your Name" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>{login}</button>
          <div className="flex items-center justify-between text-sm text-[#b3b3b3]">
            <div className="flex items-center gap-x-1">
              <input type="checkbox" className="size-4.5" />
              <label>Remember Me</label>
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
        <div className="mt-10 text-[#737373] [&_button]:ml-1.5 [&_button]:cursor-pointer [&_button]:text-white">
          {login == "Sign In" ? (
            <p>
              New to Netflix?
              <button onClick={() => setLogin("Sign Up")}>Sign Up Now</button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button onClick={() => setLogin("Sign In")}>Sign In Now</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
