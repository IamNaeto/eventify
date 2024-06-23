import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "sonner";

const SignUp = ({ closeModal, setAuthPage }) => {
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
        <label htmlFor="" className="label">
          Full Name
          <input type="text" className="input" placeholder="Enter Full Name" />
        </label>

        <label htmlFor="" className="label">
          Email
          <input
            type="email"
            className="input"
            placeholder="Enter Email Address"
          />
        </label>

        <label htmlFor="" className="label">
          Password
          <input
            type="password"
            className="input"
            placeholder="Enter Password"
          />
        </label>

        <label htmlFor="" className="label">
          Confirm Password
          <input
            type="password"
            className="input"
            placeholder="Re-enter Password"
          />
        </label>

        <button className="border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md">
          Continue
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
