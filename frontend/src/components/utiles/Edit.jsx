import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import EventFormFinal from "./EventFormFinal";
import EventFormSuccess from "./EventFormSuccess";
import EventFormIntro from "./EventFormInto";
import { useNavigate, useParams } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";
import axios from "axios";

const Edit = () => {
  const [progressStage, setProgressStage] = useState(1);
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [mode, setMode] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ticket, setTicket] = useState("");
  const [price, setPrice] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const { width, height } = useWindowSize();

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/${id}`
        );
        const eventData = response.data;
        setEvent(eventData);
        setName(eventData.event_name);
        setHost(eventData.event_host_name);
        setDescription(eventData.event_description);
        setStartDate(eventData.event_start_date);
        setStartTime(eventData.event_start_time);
        setEndDate(eventData.event_end_date);
        setEndTime(eventData.event_end_time);
        setMode(eventData.event_mode);
        setLocation(eventData.event_location);
        setLink(eventData.event_link);
        setCategory(eventData.event_category);
        setCapacity(eventData.event_capacity);
        setTicket(eventData.event_ticket);
        setPrice(eventData.event_price);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

  if (!event)
    return (
      <div className="flex flex-col items-center justify-center p-10 text-3xl text-red-900 min-h-screen">
        <BiSolidError className="text-6xl" />
        <p>404! event not found</p>
      </div>
    );

  const handleInitialValidation = (e) => {
    e.preventDefault();
    if (
      !name ||
      !host ||
      !description ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !mode ||
      (mode === "Physical" && !location) ||
      (mode === "Virtual (Zoom/Meet)" && !link)
    ) {
      toast.error("All fields must be filled");
      return;
    }
    setProgressStage(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !capacity || !ticket || (ticket === "Premium" && !price)) {
      toast.error("All fields must be filled");
      return;
    }

    const data = {
      event_name: name,
      event_host_name: host,
      event_description: description,
      event_start_date: startDate,
      event_start_time: startTime,
      event_end_date: endDate,
      event_end_time: endTime,
      event_mode: mode,
      event_location: location,
      event_link: link,
      event_category: category,
      event_capacity: capacity,
      event_ticket: ticket,
      event_price: price,
    };

    try {
      setIsLoading(true);
      const request = await axios.put(
        `${import.meta.env.VITE_APP_EVENT_ROUTE_URL}/update/${id}`,
        data
      );
      console.log(request);
      setProgressStage(3);
      setShowConfetti(true);
      toast.success("Event updated successfully");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("Error: ", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const seeAllEvents = () => {
    navigate("/manage/events");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const viewEvent = () => {
    navigate(`/manage/event/${id}`);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="w-full relative top-[76px] px-[3%] py-10 bg-[#FAFAFA] min-h-screen overflow-x-hidden">
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <div className="grid gap-2 min-w-[600px]">
          <p className="text-left">Progress</p>
          <div className="bg-[#EBEBEB] w-full h-2 rounded-full">
            <div
              className={`bg-[#0D804A] ${
                progressStage === 1
                  ? "w-[200px] rounded-tl-full rounded-bl-full"
                  : progressStage === 2
                  ? "w-[400px] rounded-tl-full rounded-bl-full"
                  : "w-full rounded-full"
              } h-full`}
            ></div>
          </div>

          {progressStage === 1 ? (
            <EventFormIntro
              setName={setName}
              name={name}
              setHost={setHost}
              host={host}
              setDescription={setDescription}
              description={description}
              setStartDate={setStartDate}
              startDate={startDate}
              setStartTime={setStartTime}
              startTime={startTime}
              setEndDate={setEndDate}
              endDate={endDate}
              setEndTime={setEndTime}
              endTime={endTime}
              setMode={setMode}
              mode={mode}
              setLocation={setLocation}
              location={location}
              setLink={setLink}
              link={link}
              handleInitialValidation={handleInitialValidation}
              primaryBtnCaption={"Next"}
              secondaryBtnCaption={"Back"}
              route={`/manage/event/${id}`}
            />
          ) : progressStage === 2 ? (
            <EventFormFinal
              setProgressStage={setProgressStage}
              setCategory={setCategory}
              category={category}
              setCapacity={setCapacity}
              capacity={capacity}
              ticket={ticket}
              setTicket={setTicket}
              price={price}
              setPrice={setPrice}
              handleSubmit={handleSubmit}
              primaryBtnAction={"Update Event"}
              secondaryBtnAction={"Back"}
            />
          ) : (
            <EventFormSuccess
              title={"Yooopiiee! Event Updated Sucessfully"}
              seeAllEvents={seeAllEvents}
              action={viewEvent}
              primaryBtnCaption={"See All Events"}
              secondaryBtnCaption={"View Event"}
            />
          )}
        </div>

        <Toaster position="top-right" richColors />
        {showConfetti && (
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            style={{ zIndex: 9999, position: "fixed", top: 0, left: 0 }}
          />
        )}
      </div>
    </div>
  );
};

export default Edit;
