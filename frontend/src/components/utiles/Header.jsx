import { Link } from "react-router-dom";
import Auths from "../modal/Auths";
import { useState, useEffect } from "react";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { HiOutlineBellSlash } from "react-icons/hi2";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TbLoader2 } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import useFetchUserData from "../custom-hook/useFetchUserData";
import Notifications from "./Notifications";
import axios from "axios";

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [openNotification, setOpenNotification] = useState(false);
  const [registeredEventData, setRegisteredEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("eventify_auth_token");

  const { userData, isLoading } = useFetchUserData(token);

  const navigate = useNavigate();
  const location = useLocation();

  const getRegEventsEndpoint = `${
    import.meta.env.VITE_APP_EVENT_ROUTE_URL
  }/regEvents`;

  useEffect(() => {
    const token = localStorage.getItem("eventify_auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setAuthLoading(false);

    fetchRegEvents();
  }, [getRegEventsEndpoint]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogOut = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("eventify_auth_token");
      setIsAuthenticated(false);
      navigate("/");
      toast.success("Logout successful");
      setLoading(false);
    }, 2000);
  };

  const fetchRegEvents = async () => {
    try {
      setLoader(true);

      if (!token) {
        toast.error("Unauthorized user, please login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(getRegEventsEndpoint, { headers });
      const data = response.data;
      setRegisteredEventData(data);
    } catch (error) {
      console.error(error);
      toast.error("Error: " + error.message);
    } finally {
      setLoader(false);
    }
  };

  // Filtering upcoming registered events
  const currentDate = new Date();
  const upcomingRegEvents = registeredEventData
    .filter((event) => {
      const eventStartDate = new Date(event.event_start_date);
      return eventStartDate >= currentDate;
    })
    .sort(
      (a, b) => new Date(a.event_start_date) - new Date(b.event_start_date)
    );

  return (
    <div className="w-full fixed z-30 bg-[#FEFEFE] flex items-center justify-between py-4 px-[3%] shadow text-[16px] text-[#3C3C3C] font-semibold">
      <Link to={"/"}>
        <img src="/img/eventify-logo.svg" alt="" />
      </Link>

      <div className="flex items-center justify-center gap-4">
        <Link
          to={"/"}
          className={`${
            location.pathname === "/"
              ? "visited:text-[#E0580C]"
              : "hover:text-red-600"
          } delay-150 transition-all`}
        >
          Home
        </Link>
        <Link
          to={"/event/explore"}
          className={`${
            location.pathname === "/event/explore"
              ? "visited:text-[#E0580C]"
              : "hover:text-red-600"
          } delay-150 transition-all`}
        >
          Explore
        </Link>
        <Link
          to={"/manage/events"}
          className={`${
            location.pathname === "/manage/events"
              ? "visited:text-[#E0580C]"
              : "hover:text-red-600"
          } delay-150 transition-all`}
        >
          Manage Events
        </Link>
        <Link
          to={"/event/create"}
          className={`${
            location.pathname === "/event/create"
              ? "visited:text-[#E0580C]"
              : "hover:text-red-600"
          } delay-150 transition-all`}
        >
          Create Event +
        </Link>
      </div>
      {authLoading ? (
        <TbLoader2 className="animate-spin text-4xl text-[#E0580C] shadow-lg p-1 rounded-full  border border-[#EBEBEB]" />
      ) : !isAuthenticated ? (
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
          <div
            onClick={() => setOpenNotification(!openNotification)}
            className="relative text-3xl shadow-lg p-1 rounded-full  border border-[#EBEBEB] hover:text-[#9D3E08]"
          >
            {openNotification ? (
              <HiOutlineBellSlash className="cursor-pointer" />
            ) : (
              <HiOutlineBellAlert className="cursor-pointer" />
            )}

            {upcomingRegEvents.length > 0 && (
              <h1 className="absolute top-[-12px] right-[-10px] bg-[#FCEEE7] shadow rounded-full px-2 py-[0.5px] text-[#E0580C] text-base font-semibold">
                {upcomingRegEvents.length > 0 && upcomingRegEvents.length}
              </h1>
            )}

            {openNotification && (
              <Notifications
                upcomingRegEvents={upcomingRegEvents}
                loader={loader}
              />
            )}
          </div>

          <Link
            to="/event/user/profile"
            className="w-[60px] h-[60px] p-2 rounded-full shadow-lg border border-[#EBEBEB] cursor-pointer flex items-center justify-center"
          >
            {isLoading ? (
              <TbLoader2 className="animate-spin text-3xl" />
            ) : userData.img ? (
              <img src="/img/event-user.png" alt="user" />
            ) : (
              <h1 className="text-2xl font-bold text-[#E0580C] rounded-full">
                {userData.firstname.charAt(0).toUpperCase() +
                  userData.lastname.charAt(0).toUpperCase()}
              </h1>
            )}
          </Link>

          <div
            onClick={handleLogOut}
            className="text-3xl shadow-lg p-1 rounded-full  border border-[#EBEBEB] hover:text-[#9D3E08]  cursor-pointer"
          >
            {loading ? (
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
