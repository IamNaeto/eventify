import { useState } from "react";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import WhatNextHint from "./WhatNextHint";
import FormatDate from "./FormatedDate";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import PropagateLoader from "react-spinners/PropagateLoader";
import { IoCalendarClearOutline } from "react-icons/io5";

const RecentEvents = ({ allEvents, searchQuery, isLoading, userId }) => {
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [showingAll, setShowingAll] = useState(false);
  const navigate = useNavigate();

  const handleViewMore = () => {
    if (visibleEvents >= allEvents.length) {
      setVisibleEvents(6);
      setShowingAll(false);
    } else {
      setVisibleEvents((prev) => prev + 3);
      if (visibleEvents + 3 >= allEvents.length) {
        setShowingAll(true);
      }
    }
  };

  const filteredEvents = allEvents.filter((event) =>
    event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const reversedEventData = [...filteredEvents].reverse();

  const handleEventClick = (id) => {
    navigate(`/event/register/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

  return (
    <main className="relative top-[76px] px-[3%] pt-10 pb-20">
      <p className="text-xs text-[#959595] font-medium mb-1">Discover</p>
      <h1 className="text-3xl text-[#1E1E1E] font-bold mb-6">
        Recent Events{" "}
        <span>({reversedEventData ? reversedEventData.length : "0"})</span>
      </h1>
      {reversedEventData.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reversedEventData.slice(0, visibleEvents).map((data) => {
            const isRegistered = data.attendees?.some(
              (attendee) => attendee.userId === userId
            );
            return (
              <div
                key={data._id}
                onClick={() => handleEventClick(data._id)}
                className="grid gap-2 rounded-xl border-[2px] border-[#FEFEFE] shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90 relative"
              >
                <div className="w-full">
                  <img
                    src={data.event_image || "/img/event-img.png"}
                    alt="event-img"
                    className="w-full"
                  />
                </div>

                <div className="grid gap-4 p-4">
                  <div className="text-[#E57435] text-[16px] font-medium flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <IoCalendarClearOutline className="text-xl" />
                      <p>{FormatDate(data.event_start_date)}</p>
                    </div>
                    {data.event_ticket === "Premium" ? (
                      <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">
                        {data.event_price}
                      </p>
                    ) : (
                      <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">
                        {data.event_ticket}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2 text-[#676767] text-sm font-medium">
                    <h1 className="text-[#1E1E1E] text-2xl font-bold">
                      {data.event_name}
                    </h1>

                    <p className="text-base text-[#E57435] font-medium">
                      Host: {data.event_host_name}
                    </p>
                    <p className="flex items-center gap-2">
                      <SlLocationPin />
                      {isRegistered ? (
                        <span>
                          {data.event_mode === "Physical"
                            ? data.event_location
                            : data.event_link}
                        </span>
                      ) : (
                        <span className="text-base font-medium">Location</span>
                      )}
                    </p>
                    <p className="flex items-center gap-2">
                      <MdOutlineAccessTime />
                      {isRegistered ? (
                        <span>{data.event_start_time} WAT</span>
                      ) : (
                        <span>Time</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src="/img/registered-users.png"
                      alt="joiners"
                      className=""
                    />
                    <p className="text-xs font-medium text-[#676767]">
                      +32 People registered
                    </p>
                  </div>
                  <p className="text-xs font-medium text-[#676767]">
                    Event created by:{" "}
                    <span className="font-semibold">
                      {data.createdBy.firstname + " " + data.createdBy.lastname}
                    </span>
                  </p>
                  {isRegistered && (
                    <p className="absolute top-2 right-2 p-2 rounded-md text-sm text-[#FCEEE7] font-medium bg-green-800">
                      Registered
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <WhatNextHint />
      )}
      {visibleEvents >= 6 && (
        <div className="mt-10 w-full flex items-center justify-center">
          <button
            onClick={handleViewMore}
            className="flex items-center justify-center gap-2 border-2 border-[#E0580C] bg-[#FEFEFE] text-[#E0580C] shadow hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md"
          >
            {showingAll ? "View Less" : "View More"}
            {showingAll ? (
              <FiEyeOff className="text-2xl" />
            ) : (
              <FiEye className="text-2xl" />
            )}
          </button>
        </div>
      )}
    </main>
  );
};

export default RecentEvents;
