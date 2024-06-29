import { IoCalendarClearOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { CgArrowTopRight } from "react-icons/cg";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { LuLoader2 } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";

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
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem("eventify_auth_token");
  const [isRegistered, setIsRegistered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);

        if (!token) {
          console.error('Unauthorized user, please login');
          setIsLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/singleEvent/${id}`,
          { headers }
        );

        setEvent(response.data);
        console.log('Fetched event:', response.data);

        // Decode the token to get payload data
        try {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          console.log('User ID:', userId);

          // Check if user is already registered for this event
          const isUserRegisteredLocal = response.data.attendees.some(
            (attendee) => attendee.userId === userId
          );
          console.log('Is user registered:', isUserRegisteredLocal);
          setIsRegistered(isUserRegisteredLocal);
        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, token]);

  // Handle event registration
  const handleRegister = async () => {
    try {
      setLoading(true);

      if (!token) {
        toast.error("Unauthorized user, please login");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/register/${id}`,
        {},
        { headers }
      );

      console.log(response.data);

      setIsRegistered(true);
      setShowConfetti(true);
      toast.success("Event registered successfully");

      // Stop confetti after 6 seconds
      setTimeout(() => setShowConfetti(false), 6000);
    } catch (error) {
      console.error("Error registering for the event:", error);
       if (error.response && error.response.status === 409) {
        toast.error("Event already registered");
      } else {
        toast.error(error.message);
      }
      
    } finally {
      setLoading(false);
    }
  };

  // Cancel event registeration
  const handleCancelRegistration = async () => {
    try {
      setLoading(true);

      if (!token) {
        toast.error("Unauthorized user, please login");
        setLoading(false);
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(
        `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/register/${id}`,
        { headers }
      );

      console.log(response.data);
      setIsRegistered(false);
      toast.success("Event registration cancelled successfully");
    } catch (error) {
      console.error("Error cancelling registered event:", error);
      toast.error("Error cancelling registered event");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-3xl text-red-900 min-h-[70vh]">
        {" "}
        <BiSolidError className="text-6xl" />
        <p>404! Event not found</p>
      </div>
    );
  }

  return (
    <main className="grid gap-8 text-[#1E1E1E] min-h-[70vh] w-full relative top-[76px] px-[3%] pb-10 pt-6">
      <Toaster position="top-right" richColors zIndex="100" />
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={300}
          style={{ zIndex: 9999, position: "fixed", top: 0, left: 0 }}
        />
      )}
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
                {formatDate(event.event_start_date)} {"to"}
                {formatDate(event.event_end_date)}  
              </p>
              { isRegistered ?
              <p className="text-[16px]">
                {event.event_start_time} to {event.event_end_time}
              </p>
              : <p>************** to **************</p>}
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
              { isRegistered ? <p className="text-[16px]">
                {event.event_mode === "Physical"
                  ? event.event_location
                  : event.event_link}
              </p> : <p>***************</p>}
              
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
            {isRegistered ? (
              <>
                <p className="text-[#3C3C3C] text-base font-medium">
                  Thank You for Joining. We hope you enjoyed the event! To
                  cancel the event click the button below.
                </p>
                <button
                  onClick={handleCancelRegistration}
                  className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg bg-[#E0580C] border-2 border-[#E0580C] text-[#FFF] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
                >
                  {loading ? (
                    <LuLoader2 className="animate-spin text-2xl" />
                  ) : (
                    "Cancel Registration"
                  )}
                </button>
              </>
            ) : (
              <>
                <p className="text-[#3C3C3C] text-base font-medium">
                  Hello! To join the event, please register below.
                </p>
                <button
                  onClick={handleRegister}
                  className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg bg-[#E0580C] border-2 border-[#E0580C] text-[#FFF] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
                >
                  {loading ? (
                    <LuLoader2 className="animate-spin text-2xl" />
                  ) : (
                    "Register"
                  )}
                </button>
              </>
            )}
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
