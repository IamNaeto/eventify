import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import WhatNextHint from "./WhatNextHint";
import FormatDate from "./FormatedDate";

const PastEvents = ({ pastEvents = [] }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const navigate = useNavigate();

  const handleManageEvent = (id) => {
    navigate(`/manage/event/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reversedPastEvents = [...pastEvents].reverse();
  const visibleEvents = showAllEvents
    ? reversedPastEvents
    : reversedPastEvents.slice(0, 2);

  return (
    <main className="grid gap-10 w-full mt-4">
      <section className="grid gap-2 w-full">
        <div className="w-full flex items-center justify-between gap-2">
          <h1 className="text-2xl text-[#1E1E1E] font-bold">
            Past Created Events
          </h1>
          {reversedPastEvents.length > 2 && (
            <p
              className="flex items-center gap-2 text-[#767676] text-base cursor-pointer font-medium"
              onClick={() => setShowAllEvents(!showAllEvents)}
            >
              {showAllEvents ? "See Less" : "See More"}{" "}
              {showAllEvents ? (
                <FiEyeOff className="text-2xl" />
              ) : (
                <FiEye className="text-2xl" />
              )}
            </p>
          )}
        </div>
        {visibleEvents.length > 0 ? (
          <div className="grid grid-cols-2 items-center gap-6">
            {visibleEvents.map((event) => (
              <div
                key={event._id}
                onClick={() => handleManageEvent(event._id)}
                className="grid gap-2 rounded-xl border-[2px] border-[#FEFEFE] shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90"
              >
                <div className="w-full">
                  <img
                    src={event.event_image || "/img/event-img.png"}
                    alt="event-img"
                    className="w-full"
                  />
                </div>
                <div className="grid p-4">
                  <div className="text-[#E57435] text-[16px] font-medium flex items-center justify-between gap-4">
                    <p>{FormatDate(event.event_start_date)}</p>
                    {event.event_ticket === "Premium" ? (
                      <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">
                        {event.event_price}
                      </p>
                    ) : (
                      <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">
                        {event.event_ticket}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2 text-[#676767] text-sm font-medium">
                    <h1 className="text-[#1E1E1E] text-2xl font-bold">
                      {event.event_name}
                    </h1>
                    <p className="flex items-center gap-2">
                      <SlLocationPin />{" "}
                      <span>
                        {event.event_mode === "Physical"
                          ? event.event_location
                          : event.event_link}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MdOutlineAccessTime />{" "}
                      <span>{event.event_start_time}</span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <button className="bg-[#303030] p-2 rounded-lg text-[#FFF] flex items-center justify-center gap-2 text-lg font-semibold">
                      Manage Event <CgArrowTopRight className="text-xl]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <WhatNextHint />
        )}
      </section>
      <section className="grid gap-4 w-full">
        <div className="w-full flex items-center justify-between gap-2">
          <h1 className="text-2xl text-[#1E1E1E] font-bold">
            Past Registered Events
          </h1>
          <p className="flex items-center gap-2 text-[#767676] text-base cursor-pointer font-medium">
            View All <FiEye className="text-2xl" />
          </p>
        </div>
        <WhatNextHint />
      </section>
    </main>
  );
};

export default PastEvents;
