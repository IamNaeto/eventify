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

const EventOverview = ({ event, isLoading }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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

  const handleProductDelete = async () => {
    try {
      const request = await axios.delete(
        `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/delete/${id}`
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

          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
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

          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90">
              {" "}
              <HiOutlineUsers /> View Attendees
            </button>
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-md hover:shadow-[#E0580C] transition-transform duration-300 ease-in-out transform hover:scale-90">
              {" "}
              <AiOutlineCloudUpload /> Share event
            </button>
          </div>
        </div>
      </section>

      <section className="w-full grid gap-4">
        <h1 className="text-2xl font-bold">About This Event</h1>
        <p className="text-[16px] text-[#585858]">{event.event_description}</p>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
        className="flex items-center justify-center min-h-screen"
        overlayClassName="z-50 fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto text-center">
          <div className="bg-[#FCEEE7] p-4 rounded-full">
            <BiSolidError className=" text-center text-5xl text-[#E0580C]" />
          </div>
          <h2 className="text-xl font-bold">Are you sure ?</h2>
          <p className="text-red-600 font-medium">
            This action cannot be undone. All the data associated with this
            event will be lost!
          </p>
          <div className="w-full grid gap-4 font-semibold">
            <button
              onClick={confirmDelete}
              className="bg-[#E0580C] border-2 border-[#E0580C] text-white px-4 py-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="bg-[#FFF] text-[#E0580C] border-2 border-[#E0580C] px-4 py-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-90"
            >
              Cancle
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default EventOverview;
