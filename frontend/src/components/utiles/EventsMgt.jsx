import CustomCalendar from "./Calender";
import CreatedEvents from "./CreatedEvents";
import { useState, useEffect } from "react";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";
import { CiCompass1 } from "react-icons/ci";
import { Link } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EventsMgt = () => {
  const [toggleEvents, setToggleEvents] = useState("Created Events");
  const [createdEventData, setCreatedEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("eventify_auth_token");

  const getEventsEndpoint = import.meta.env.VITE_APP_EVENT_ROUTE_URL;

  useEffect(() => {
    fetchData();
  }, [getEventsEndpoint]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      if (!token) {
        toast.error("Unauthorzied user, please login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(getEventsEndpoint, { headers });
      const data = response.data;
      setCreatedEventData(data);
      console.log(data);
      // toast.success("Data fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEventRoute = (id) => {
    navigate("/event/create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDate = new Date();

  // Filtering upcoming and past events
  const upcomingEvents = createdEventData.filter((event) => {
    const eventEndDate = new Date(event.event_end_date);
    return eventEndDate >= currentDate;
  });

  const pastEvents = createdEventData.filter((event) => {
    const eventEndDate = new Date(event.event_end_date);
    return eventEndDate < currentDate;
  });

  return (
    <main className="min-h-[70vh] w-full relative top-[76px] px-[3%] pb-10 pt-6 grid gap-6">
      <Toaster position="top-right" richColors />
      <section className="flex flex-col gap-4 text-[#1E1E1E]">
        <h1 className="text-2xl font-bold">Welcome Paul,</h1>

        <div className=" grid grid-cols-3 gap-4">
          <div
            className={`${
              toggleEvents === "Created Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Created Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold">
                {createdEventData ? createdEventData.length : "0"}
              </h1>
              <p className="text-lg font-medium">Created Events</p>
            </div>

            <img src="/img/create-icon.png" alt="create-icon" />
          </div>

          <div
            className={`${
              toggleEvents === "Upcoming Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE]  cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Upcoming Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold">
                {upcomingEvents ? upcomingEvents.length : "0"}
              </h1>
              <p className="text-lg font-medium">Upcoming Events</p>
            </div>

            <img src="/img/upcoming-icon.png" alt="upcoming-icon" />
          </div>

          <div
            className={`${
              toggleEvents === "Past Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] shadow-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Past Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold">
                {pastEvents ? pastEvents.length : "0"}
              </h1>
              <p className="text-lg font-medium">Past Events</p>
            </div>

            <img src="/img/delete-icon.png" alt="delete-icon" />
          </div>
        </div>
      </section>

      <section className="w-full flex items-start gap-6">
        <div className="w-[76%]">
          {isLoading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2">
              <div className="text-2xl font-semibold text-[#E0580C]">
                Loading...
              </div>
              <PropagateLoader color="#E0580C" />
            </div>
          ) : toggleEvents === "Created Events" ? (
            <CreatedEvents createdEventData={createdEventData} />
          ) : toggleEvents === "Upcoming Events" ? (
            <UpcomingEvents upcomingEvents={upcomingEvents} />
          ) : (
            <PastEvents pastEvents={pastEvents} />
          )}
        </div>
        <div className="grid gap-4 w-[25%]">
          <CustomCalendar />

          <div className="w-full flex flex-col gap-4">
            <button
              onClick={handleCreateEventRoute}
              className="w-full border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] text-center py-2 px-4 rounded-md"
            >
              Create Event +
            </button>
            <Link
              to={""}
              className="flex items-center justify-center gap-2 w-full border-2 border-[#E0580C] bg-[#FEFEFE] text-center text-[#E0580C] hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md"
            >
              Explore Events <CiCompass1 />{" "}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsMgt;
