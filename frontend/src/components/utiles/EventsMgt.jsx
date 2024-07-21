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
import useFetchUserData from "../custom-hook/useFetchUserData";
import PulseLoader from "react-spinners/PulseLoader";

const EventsMgt = () => {
  const [toggleEvents, setToggleEvents] = useState("Created Events");
  const [createdEventData, setCreatedEventData] = useState([]);
  const [registeredEventData, setRegisteredEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("eventify_auth_token");

  const { userData, isLoading } = useFetchUserData(token);

  const getEventsEndpoint = import.meta.env.VITE_APP_EVENT_ROUTE_URL;
  const getRegEventsEndpoint = `${
    import.meta.env.VITE_APP_EVENT_ROUTE_URL
  }/regEvents`;

  useEffect(() => {
    fetchData();
    fetchRegEvents();
  }, [getEventsEndpoint, getRegEventsEndpoint]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (!token) {
        toast.error("Unauthorized user, please login");
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
      setLoading(false);
    }
  };

  const fetchRegEvents = async () => {
    try {
      setLoading(true);

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
      console.log("Registered Events", data);
      // toast.success("Data fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEventRoute = () => {
    navigate("/event/create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentDate = new Date();

  // Filtering upcoming created events
  const upcomingEvents = createdEventData.filter((event) => {
    const eventEndDate = new Date(event.event_end_date);
    return eventEndDate >= currentDate;
  });

  // Filtering upcoming registered events
  const upcomingRegEvents = registeredEventData.filter((event) => {
    const eventEndDate = new Date(event.event_end_date);
    return eventEndDate >= currentDate;
  });

  // Filtering past created events
  const pastEvents = createdEventData.filter((event) => {
    const eventEndDate = new Date(event.event_end_date);
    return eventEndDate < currentDate;
  });

  // Filtering past registered events
  const pastRegEvents = registeredEventData.filter((event) => {
    const eventEndDate = new Date(event.event_end_date);
    return eventEndDate < currentDate;
  });

  return (
    <main className="min-h-[70vh] w-full relative top-[65px] md:top-[76px] px-[3%] pb-10 pt-6 grid gap-6 border">
      <Toaster position="top-right" richColors />
      <section className="flex flex-col gap-4 text-[#1E1E1E] mt-2">
        <h1 className="text-xl md:text-2xl font-bold">
          Welcome{" "}
          <span className="text-[#E0580C]">
            {isLoading ? (
              <PulseLoader color="#E0580C" />
            ) : (
              userData.firstname + " " + userData.lastname
            )}
            ,
          </span>
        </h1>

        <div className="w-full flex lg:grid lg:grid-cols-3 items-center gap-4 py-4 flex-wrap ">
          <div
            className={`${
              toggleEvents === "Created Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between w-full lg:w-full gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Created Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {createdEventData ? createdEventData.length : "0"}
              </h1>
              <p className="text-base md:text-lg font-medium">Created Events</p>
            </div>

            <img src="/img/create-icon.png" alt="create-icon" />
          </div>

          <div
            className={`${
              toggleEvents === "Upcoming Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between w-full lg:w-full gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Upcoming Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {upcomingEvents || upcomingRegEvents
                  ? upcomingEvents.length + upcomingRegEvents.length
                  : "0"}
              </h1>
              <p className="text-base md:text-lg font-medium">
                Upcoming Events
              </p>
            </div>

            <img src="/img/upcoming-icon.png" alt="upcoming-icon" />
          </div>

          <div
            className={`${
              toggleEvents === "Past Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between w-full lg:w-full gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] shadow-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Past Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {pastEvents || pastRegEvents
                  ? pastEvents.length + pastRegEvents.length
                  : "0"}
              </h1>
              <p className="text-base md:text-lg font-medium">Past Events</p>
            </div>

            <img src="/img/delete-icon.png" alt="delete-icon" />
          </div>
        </div>
      </section>

      <section className="w-full flex flex-col-reverse lg:flex-row items-start gap-4">
        <div className="w-full lg:w-[76%]">
          {loading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center gap-2">
              <div className="text-2xl font-semibold text-[#E0580C]">
                Loading...
              </div>
              <PropagateLoader color="#E0580C" />
            </div>
          ) : toggleEvents === "Created Events" ? (
            <CreatedEvents createdEventData={createdEventData} />
          ) : toggleEvents === "Upcoming Events" ? (
            <UpcomingEvents
              upcomingEvents={upcomingEvents}
              upcomingRegEvents={upcomingRegEvents}
            />
          ) : (
            <PastEvents pastEvents={pastEvents} pastRegEvents={pastRegEvents} />
          )}
        </div>
        <div className="grid gap-4 w-full lg:w-[30%]">
          <CustomCalendar />

          <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-4">
            <button
              onClick={handleCreateEventRoute}
              className="w-full border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] text-center py-2 px-4 rounded-md"
            >
              Create Event +
            </button>
            <Link
              to={"/event/explore"}
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
