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
import axios from "axios";
import { toast } from "sonner";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

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

const EventOverview = ({ event, isLoading, setToggleMgt }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("eventify_auth_token");
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
        <p>404! Event not found</p>
      </div>
    );

  // function to delete product using the id
  const handleProductDelete = async () => {
    try {
      if (!token) {
        toast.error("Unauthorized, please login");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const request = await axios.delete(
        `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/delete/${id}`,
        { headers }
      );
      console.log(request);
      toast.success(`${event.event_name} event deleted successfully`);
      setTimeout(() => {
        navigate("/manage/events");
      }, 2000);
    } catch (error) {
      console.log("Error", error);
      toast.error(error.message);
    }
  };

  const confirmDelete = () => {
    handleProductDelete();
    closeModal();
  };

  return (
    <main className="grid gap-8 text-[#1E1E1E]">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-[250px] sm:h-[350px] lg:h-[430px] w-full mb-14">
          <img
            src="/img/event-overview.png"
            alt="event-overview-img"
            className="h-[250px] sm:h-[350px] lg:h-[430px] w-full"
          />

          <div className="flex items-center gap-2 mt-6">
            <FaRegUserCircle className="text-2xl sm:text-3xl text-[#E0580C]"/>
            <p className="text-base md:text-lg font-medium">
              {event.event_host_name}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">{event.event_name}</h1>

          <div className="flex items-center gap-2">
            <div className="p-2 border-2 border-[#A4A4A4] shadow rounded-xl">
              <IoCalendarClearOutline className="text-xl md:text-2xl" />
            </div>
            <div className="text-sm sm:text-base md:text-lg">
              <p className="font-semibold">
                {formatDate(event.event_start_date)} to {formatDate(event.event_end_date)}
              </p>
              <p>
                {event.event_start_time} to {event.event_end_time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 border-2 border-[#A4A4A4] shadow rounded-xl">
              <SlLocationPin className="text-xl md:text-2xl" />
            </div>
            <div>
              <p className="text-base md:text-lg flex items-center gap-1 font-semibold">
                Location <CgArrowTopRight />
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                {event.event_mode === "Physical"
                  ? event.event_location
                  : <a href={event.event_link} target="_blank" className="text-[#360789] hover:text-[#271546] transition-all delay-150">{event.event_link}</a>}
              </p>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            <div className="p-4 rounded-lg border border-[#360789] shadow shadow-[#360789]">
              <h1 className="text-base sm:text-lg font-semibold">
                Event Category
              </h1>
              <p className="text-sm sm:text-base text-[#3C3C3C]">
                {event.event_category}
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[#E0580C] shadow shadow-[#E0580C]">
              <h1 className="text-base sm:text-lg font-semibold">
                Event Capacity
              </h1>
              <p className="text-sm sm:text-base text-[#3C3C3C]">
                {event.event_capacity} Persons
              </p>
            </div>

            <div className="p-4 rounded-lg border border-[#12B76A] shadow shadow-[#12B76A]">
              <h1 className="text-base sm:text-lg font-semibold">
                Ticket Type
              </h1>
              {event.event_ticket === "Premium" ? (
                <p className="text-sm sm:text-base text-[#3C3C3C]">
                  Premium: {event.event_price}
                </p>
              ) : (
                <p className="text-[14px] text-[#3C3C3C]">
                  {event.event_ticket}
                </p>
              )}
            </div>
          </div>

          <section className="lg:hidden w-full grid gap-4 my-4">
            <h1 className="text-xl sm:text-2xl font-bold">About This Event</h1>
            <p className="text-sm sm:text-base text-[#585858]">
              {event.event_description}
            </p>
          </section>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 items-center justify-center text-sm sm:text-base gap-2">
            <Link
              to={`/event/edit/${id}`}
              className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              {" "}
              <CiEdit /> Edit Event
            </Link>
            <button
              className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
              onClick={openModal}
            >
              {" "}
              <RiDeleteBin3Line /> Delete Event
            </button>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-2 text-sm sm:text-base">
            <button
              onClick={() => setToggleMgt("Attendees")}
              className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              {" "}
              <HiOutlineUsers /> View Attendees
            </button>
            <button
              onClick={() => setToggleMgt("Uploads")}
              className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              {" "}
              <AiOutlineCloudUpload /> Uploads
            </button>
          </div>
        </div>
      </section>

      <section className="hidden w-full lg:grid gap-4 my-4">
        <h1 className="text-xl sm:text-2xl font-bold">About This Event</h1>
        <p className="text-sm sm:text-base text-[#585858]">
          {event.event_description}
        </p>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Event Modal"
        className="flex items-center justify-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 mx-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
            Confirm Delete
          </h2>
          <p className="text-sm sm:text-base text-[#3C3C3C] mb-6">
            Are you sure you want to delete the event "{event.event_name}"? This
            action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default EventOverview;
