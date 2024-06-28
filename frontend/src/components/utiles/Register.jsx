import { IoCalendarClearOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { CgArrowTopRight } from "react-icons/cg";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// formatDate function
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date
    .toLocaleDateString("en-US", options)
    .replace(/,/g, ".")
    .replace(/\. /g, ", ");
}

const Register = () => {
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/singleEvent/${id}`
        );
        setEvent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);


  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

  if (!event)
    return (
      <div className="flex flex-col items-center justify-center p-10 text-3xl  text-red-900 min-h-[70vh]">
        {" "}
        <BiSolidError className="text-6xl" />
        <p>404! Product not found</p>
      </div>
    );


  return (
    <main className="grid gap-8 text-[#1E1E1E] min-h-[70vh] w-full relative top-[76px] px-[3%] pb-10 pt-6">
      <section className="grid grid-cols-2 gap-4">
        <div className="min-h-[430px] w-full">
          <img
            src="/img/event-overview.png"
            alt="event-overview-img"
            className="h-[430px] w-full"
          />

          <div className="flex items-center gap-2 mt-6">
            <img
              src="/img/event-user.png"
              alt=""
              className="w-[40px] h-40px]"
            />
            <p className="text-18px font-medium">{event.event_host_name}</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold">{event.event_name}</h1>

          <div className="flex items-center gap-2">
            <div className="p-2 border-2 border-[#A4A4A4] shadow rounded-xl">
              <IoCalendarClearOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-lg font-semibold">
                {formatDate(event.event_start_date)} to{" "}
                {formatDate(event.event_end_date)}
              </p>
              <p className="text-[16px]">
                {event.event_start_time} to {event.event_end_time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 border-2 border-[#A4A4A4] shadow rounded-xl">
              <SlLocationPin className="text-2xl" />
            </div>
            <div>
              <p className="text-lg flex items-center gap-1 font-semibold">
                Location <CgArrowTopRight />
              </p>
              <p className="text-[16px]">
                {event.event_mode === "Physical"
                  ? event.event_location
                  : event.event_link}
              </p>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-[#360789] shadow shadow-[#360789]">
              <h1 className="text-lg font-semibold">Event Category</h1>
              <p className="text-[14px] text-[#3C3C3C]">
                {event.event_category}
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[#E0580C] shadow shadow-[#E0580C]">
              <h1 className="text-lg font-semibold">Event Capacity</h1>
              <p className="text-[14px] text-[#3C3C3C]">
                {event.event_capacity} Persons
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[#12B76A] shadow shadow-[#12B76A]">
              <h1 className="text-lg font-semibold">Ticket Type</h1>
              {event.event_ticket === "Premium" ? (
                <p className="text-[14px] text-[#3C3C3C]">
                  Premium: {event.event_price}
                </p>
              ) : (
                <p className="text-[14px] text-[#3C3C3C]">
                  {event.event_ticket}
                </p>
              )}
            </div>
          </div>

          <div className="w-full grid gap-2 border border-[#C0C0C0] shadow-md p-4 rounded-xl">
            <p className="text-[#3C3C3C] text-base font-medium">Hello! To join the event, please register below.</p>
            <button
              className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg bg-[#E0580C] border-2 border-[#E0580C] text-[#FFF] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              {" "} Register
            </button>
            <button
              className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg bg-[#E0580C] border-2 border-[#E0580C] text-[#FFF] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              {" "} Cancle Registration
            </button>
          </div>
        </div>
      </section>

      <section className="w-full grid gap-4">
        <h1 className="text-2xl font-bold">About This Event</h1>
        <p className="text-[16px] text-[#585858]">{event.event_description}</p>
      </section>
    </main>
  );
};

export default Register;
