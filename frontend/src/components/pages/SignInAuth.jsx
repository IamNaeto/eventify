import { LuLoader2 } from "react-icons/lu";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const SignInAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signinAuthUrl = `${import.meta.env.VITE_APP_AUTH_ROUTE_URL}/signin`;

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Ooops! All fields must be filled");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(signinAuthUrl, data);
      localStorage.setItem("eventify_auth_token", res.data.token);
      toast.success("Sigin Successful");
      setTimeout(() => {
        setEmail("");
        setPassword("");
        setIsLoading(false);
        navigate("/event/explore");
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(error.message);
      }
      setIsLoading(false);
    }
  };

  const handleGoogleSigin = () => {
    toast.info("Coming soon!");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-h-screen">
      <div className="w-full min-h-screen sigin-bg hidden md:flex"></div>

      <div className="flex items-center justify-center w-full p-5 sm:p-20  md:p-0  min-h-screen">
        <div className="flex flex-col gap-4 bg-white p-5 sm:p-10 md:p-5 xl:p-10 rounded-xl mr-0 md:mr-4 w-full mx-auto shadow md:shadow-none">
          <div className="w-full grid items-start gap-1">
            <Link to={"/"}>
              <TiArrowBackOutline className="text-3xl text-[#E0580C]" />
            </Link>
            <div className="w-full flex items-center justify-between gap-4 text-[#020202]">
              <h1 className="w-full text-2xl font-bold text-center">
                Welcome to Eventify
              </h1>
            </div>
            <p className="text-sm text-center font-semibold">
              Login to Continue using Eventify
            </p>
          </div>

          <div className="w-full grid gap-1">
            <button
              onClick={handleGoogleSigin}
              className="border-2 border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md flex items-center justify-center gap-2"
            >
              <img src="/img/g-icon.png" alt="" className="w-[15px] h-[15px]" />
              Signin with Google
            </button>
            <div className="w-full flex items-center justify-between gap-1">
              <hr className="border w-full border-[#dedede]" />
              <p className="text-sm text-[#767676]">OR</p>
              <hr className="border w-full border-[#dedede]" />
            </div>
          </div>

          <form action="" className="grid gap-2">
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button
              onClick={handleSignIn}
              className="flex items-center justify-center border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md"
            >
              {isLoading ? (
                <LuLoader2 className="text-2xl animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
            <p className="text-base font-semibold text-center">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-[#E0580C] cursor-pointer">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default SignInAuth;
