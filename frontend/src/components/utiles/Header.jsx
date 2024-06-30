import { Link } from "react-router-dom";
import Auths from "../modal/Auths";
import { useState, useEffect } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem("eventify_auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogOut = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("eventify_auth_token");
      setIsAuthenticated(false);
      navigate("/");
      toast.success("Logout successful");
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="w-full fixed z-30 bg-[#FEFEFE] flex items-center justify-between py-4 px-[3%] shadow text-[16px] text-[#3C3C3C] font-semibold">
      <Link to={"/"}>
        <img src="/img/eventify-logo.svg" alt="" />
      </Link>

      <div className="flex items-center justify-center gap-4">
        <Link to={"/"} className={`${location.pathname === "/" ? "visited:text-[#E0580C]" : "hover:text-red-600"} delay-150 transition-all`}>
        Home
      </Link>
        <Link to={"/event/explore"} className={`${location.pathname === "/event/explore" ? "visited:text-[#E0580C]" : "hover:text-red-600"} delay-150 transition-all`}>
          Explore
        </Link>
        <Link
          to={"/manage/events"}
          className={`${location.pathname === "/manage/events" ? "visited:text-[#E0580C]" : "hover:text-red-600"} delay-150 transition-all`}
        >
          Manage Events
        </Link>
        <Link
          to={"/event/create"}
          className={`${location.pathname === "/event/create" ? "visited:text-[#E0580C]" : "hover:text-red-600"} delay-150 transition-all`}
        >
          Create Event +
        </Link>
      </div>
      {loading ? <TbLoader2 className="animate-spin text-4xl text-[#E0580C] shadow-lg p-1 rounded-full  border border-[#EBEBEB]" /> :
       !isAuthenticated ? (
        <div className="flex items-center justify-center gap-4">
          <button
            className="border-2 border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md"
            onClick={openModal}
          >
            Sign in
          </button>
          <Link
            to={"/event/create"}
            className="border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-4 text-[#E0580C] delay-100 transition-all">
          <div className="text-3xl shadow-lg p-1 rounded-full  border border-[#EBEBEB] hover:text-[#9D3E08] cursor-pointer">
            <HiOutlineBell />
          </div>

          <Link to={"/event/user/profile"} className="p-2 rounded-full shadow-lg border border-[#EBEBEB]  cursor-pointer">
            <img src="/img/event-user.png" alt="user" />
          </Link>

          <div
            onClick={handleLogOut}
            className="text-3xl shadow-lg p-1 rounded-full  border border-[#EBEBEB] hover:text-[#9D3E08]  cursor-pointer"
          >
            {isLoading ? (
              <TbLoader2 className="animate-spin" />
            ) : (
              <BiLogOutCircle />
            )}
          </div>
        </div>
      )}

      <Auths closeModal={closeModal} modalIsOpen={modalIsOpen} />
    </div>
  );
};

export default Header;
