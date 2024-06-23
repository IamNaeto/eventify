import { IoCalendarClearOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { CgArrowTopRight } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin3Line } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

// formatDate function
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options).replace(/,/g, '.').replace(/\. /g, ', ');
}

const EventOverview = ({event, isLoading}) => {
   if (isLoading)
    return (
      <div className="bg-[#f1f5fd] flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

  if (!event)
    return (
      <div className="bg-[#f1f5fd] flex items-center justify-center p-10 text-3xl  text-red-900 min-h-screen">
        {" "}
        <BiSolidError className="text-6xl" />
        <p>404! Product not found</p>
      </div>
    );
  return (
    <main className="grid gap-8 text-[#1E1E1E]">
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
               {formatDate(event.event_start_date)}
              </p>
              <p className="text-[16px]">{event.event_start_time}</p>
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
              <p className="text-[16px]">{event.event_mode === "Physical" ? event.event_location : event.event_link}</p>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-[#360789] shadow shadow-[#360789]">
              <h1 className="text-lg font-semibold">Event Category</h1>
              <p className="text-[14px] text-[#3C3C3C]">{event.event_category}</p>
            </div>

            <div className="p-4 rounded-lg border border-[#E0580C] shadow shadow-[#E0580C]">
              <h1 className="text-lg font-semibold">Event Capacity</h1>
              <p className="text-[14px] text-[#3C3C3C]">{event.event_capacity} Persons</p>
            </div>

            <div className="p-4 rounded-lg border border-[#12B76A] shadow shadow-[#12B76A]">
              <h1 className="text-lg font-semibold">Ticket Type</h1>
              {
                event.event_ticket === "Premium" ? <p className="text-[14px] text-[#3C3C3C]">{event.event_price}</p> : <p className="text-[14px] text-[#3C3C3C]">{event.event_ticket}</p>
              }
            </div>
          </div>

          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
            <Link to={"/event/edit"} className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <CiEdit /> Edit Event
            </Link>
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <RiDeleteBin3Line /> Delete Event
            </button>
          </div>

          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <HiOutlineUsers /> View Attendees
            </button>
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <AiOutlineCloudUpload /> Share event
            </button>
          </div>
        </div>
      </section>

      <section className="w-full grid gap-4">
        <h1 className="text-2xl font-bold">About This Event</h1>
        <p className="text-[16px] text-[#585858]">
          {event.event_description}
        </p>
      </section>
    </main>
  );
};

export default EventOverview;
