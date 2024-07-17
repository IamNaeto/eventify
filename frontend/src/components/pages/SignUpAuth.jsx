import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";

const SignUpAuth = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signupAuthUrl = `${import.meta.env.VITE_APP_AUTH_ROUTE_URL}/signup`;

  const handleSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      toast.error("Ooops! All fields must be filled");
      setIsLoading(false);
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords not match");
      setIsLoading(false);
      return;
    }

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      const request = await axios.post(signupAuthUrl, data);
      console.log(request);
      toast.success("Signup successful");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log("Error: ", error);
      if (error.response && error.response.status === 409) {
        toast.error("User with this email already exists");
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
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4  min-h-screen">
      <div className="w-full min-h-screen flex items-center justify-center p-5 sm:p-20 md:p-0">
        <div className="flex flex-col gap-2 bg-white p-5 sm:p-10 md:p-5 xl:px-10 xl:py-0 py-8 rounded-xl ml-0 md:ml-4 min-w-[100%] mx-auto shadow md:shadow-none">
          <Link to={"/signin"}>
            <TiArrowBackOutline className="text-3xl text-[#E0580C]" />
          </Link>
          <div className="w-full grid items-start gap-1">
            <div className="w-full flex items-center justify-between gap-4 text-[#020202]">
              <h1 className="w-full text-2xl font-bold text-center">
                Welcome to Eventify
              </h1>
            </div>
            <p className="text-sm text-center font-semibold">
              Sign up to Continue using Eventify
            </p>
          </div>

          <div className="w-full grid gap-1">
            <button
              onClick={handleGoogleSigin}
              className="border-2 border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md flex items-center justify-center gap-2"
            >
              <img src="/img/g-icon.png" alt="" className="w-[15px] h-[15px]" />
              Signup with Google
            </button>
            <div className="w-full flex items-center justify-between gap-1">
              <hr className="border w-full border-[#dedede]" />
              <p className="text-sm text-[#767676]">OR</p>
              <hr className="border w-full border-[#dedede]" />
            </div>
          </div>

          <form action="" className="grid gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label htmlFor="firstname" className="label">
                Firstname
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="input"
                  placeholder="Enter Firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </label>

              <label htmlFor="lastname" className="label">
                Lastname
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="input"
                  placeholder="Enter Lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
            </div>

            <label htmlFor="email" className="label">
              Email
              <input
                type="email"
                id="email"
                name="email"
                className="input"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label htmlFor="password" className="label">
              Password
              <input
                type="password"
                id="password"
                name="password"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label htmlFor="confirmPassword" className="label">
              Confirm Password
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input"
                placeholder="Re-enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <button
              onClick={handleSignUp}
              className="flex items-center justify-center border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md"
            >
              {isLoading ? (
                <LuLoader2 className="text-2xl animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>
            <p className="text-base text-center font-semibold">
              Already have an account?{" "}
              <Link to={"/signin"} className="text-[#E0580C] cursor-pointer">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-full min-h-screen sigup-bg hidden md:flex"></div>
      <Toaster position="top-left" richColors />
    </div>
  );
};

export default SignUpAuth;
