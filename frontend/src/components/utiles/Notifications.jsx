import { IoNotificationsOffOutline } from "react-icons/io5";
import FormatDate from "./FormatedDate";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const Notifications = ({ upcomingRegEvents, loader }) => {
  const navigate = useNavigate();
  console.log("Notification", upcomingRegEvents);

  const handleEventClick = (id) => {
    navigate(`/event/register/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="absolute top-14 left-0 min-w-[200px] p-2 rounded-2xl border border-[#EBEBEB] bg-[#FEFEFE] shadow-2xl">
      {upcomingRegEvents.length > 0 ? (
        <div className="grid gap-2 p-2">
          <h1 className="py-1 text-[#303030] text-base font-bold border-b border-b-[#E0580C]">
            Upcoming Registered Events
          </h1>
          {loader ? (
            <div className="flex items-center justify-center min-h-20 w-full">
              <PulseLoader color="#E0580C" />
            </div>
          ) : (
            upcomingRegEvents.map((event) => (
              <div
                onClick={() => handleEventClick(event._id)}
                className="border-b border-b-[#EBEBEB] py-1 cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90"
                key={event._id}
              >
                <h1 className="text-[#303030] text-sm font-bold">
                  {event.event_name}
                </h1>
                <div className="flex items-center gap-3 text-xs font-medium text-[#E0580C]">
                  <p>{FormatDate(event.event_start_date)}</p>
                  <p>{event.event_start_time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-center p-2">
          <div className="grid items-center justify-center p-4 rounded-full bg-[#FCEEE7] text-[#E0580C] text-center">
            <IoNotificationsOffOutline className="text-2xl" />
          </div>
          <h1 className="text-[#303030] text-sm">
            Hey there! 👋 You have no notifications at the moment. Enjoy the
            silence.
          </h1>
        </div>
      )}
    </main>
  );
};

export default Notifications;
