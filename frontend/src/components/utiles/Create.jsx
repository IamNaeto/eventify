import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import EventFormFinal from "./EventFormFinal";
import EventFormSuccess from "./EventFormSuccess";
import EventFormIntro from "./EventFormInto";

const Create = () => {
  const [progressStage, setProgressStage] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [capacity, setCapacity] = useState("");
  const [ticket, setTicket] = useState("");
  const [price, setPrice] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const handleInitialValidation = (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime ||
      !location ||
      (location === "Physical" && !venue) ||
      (location === "Virtual (Zoom/Meet)" && !link)
    ) {
      toast.error("All fields must be filled");
      return;
    }
    setProgressStage(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !capacity || !ticket || (ticket === "Premium" && !price)) {
      toast.error("All fields must be filled");
      return;
    }

    const data = {
      event_name: name,
      event_description: description,
      event_start_date: startDate,
      event_start_time: startTime,
      event_end_date: endDate,
      event_end_time: endTime,
      event_location: location,
      event_venue: venue,
      event_link: link,
      event_category: category,
      event_capacity: capacity,
      event_ticket: ticket,
      event_price: price,
    };

    console.log(`Data: ${JSON.stringify(data)}`);
    setProgressStage(3);
    setShowConfetti(true);
    toast.success("Event created successfully");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Stop confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
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
              setLocation={setLocation}
              location={location}
              setVenue={setVenue}
              venue={venue}
              setLink={setLink}
              link={link}
              handleInitialValidation={handleInitialValidation}
              primaryBtnCaption={"Next"}
              secondaryBtnCaption={"Back"}
              route={"/"}
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
              primaryBtnAction={"Create Event"}
              secondaryBtnAction={"Back"}
            />
          ) : (
            <EventFormSuccess />
          )}
        </div>

        <Toaster position="top-right" richColors />
        {showConfetti && (
          <Confetti width={width} height={height} numberOfPieces={300}  style={{ zIndex: 9999, position: "fixed", top: 0, left: 0 }}/>
        )}
      </div>
    </div>
  );
};

export default Create;
