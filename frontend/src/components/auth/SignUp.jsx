import { IoMdCloseCircleOutline } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import { useState } from "react";

const SignUp = ({ closeModal, setAuthPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields must be filled");
      setIsLoading(false);
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords not match");
      setIsLoading(false);
      return;
    }

    const data = {
      fullName: fullName,
      email: email,
      password: password,
    };

    console.log(JSON.stringify(data));
    toast.success("Signup successful");

    setTimeout(() => {
      setIsLoading(false);
      setAuthPage("Sign In");
    }, 3000);
  };

  const handleGoogleSigin = () => {
    toast.info("Coming soon!");
  };
  return (
    <div className="flex flex-col gap-2 bg-white p-10 rounded-xl shadow-lg max-w-md mx-auto">
      <div className="w-full grid items-start gap-1">
        <div className="w-full flex items-center justify-between gap-4 text-[#020202]">
          <h1 className="text-2xl font-bold">Welcome to Eventify</h1>
          <IoMdCloseCircleOutline
            className="text-3xl cursor-pointer hover:text-[#E0580C] delay-100 transition-all"
            onClick={closeModal}
          />
        </div>
        <p className="text-sm font-semibold">
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
        <label htmlFor="fullName" className="label">
          Full Name
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="input"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>

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
        <p className="text-base font-semibold">
          Already have an account?{" "}
          <span
            onClick={() => setAuthPage("Sign In")}
            className="text-[#E0580C] cursor-pointer"
          >
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
