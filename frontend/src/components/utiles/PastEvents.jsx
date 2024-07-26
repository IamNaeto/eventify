import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { IoCalendarClearOutline } from "react-icons/io5";
import WhatNextHint from "./WhatNextHint";
import FormatDate from "./FormatedDate";

const PastEvents = ({ pastEvents = [], pastRegEvents = [] }) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [viewAllEvents, setViewAllEvents] = useState(false);
  const navigate = useNavigate();

  const handleManageEvent = (id) => {
    navigate(`/manage/event/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reversedPastEvents = [...pastEvents].reverse();
  const visibleEvents = showAllEvents
    ? reversedPastEvents
    : reversedPastEvents.slice(0, 2);

  const reversedPastRegEvents = [...pastRegEvents].reverse();
  const visibleRegEvents = viewAllEvents
    ? reversedPastRegEvents
    : reversedPastRegEvents.slice(0, 2);

  const handleEventClick = (id) => {
    navigate(`/event/register/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="grid gap-20 w-full mt-4">
      <section className="grid gap-2 w-full">
        <div className="w-full flex items-center justify-between gap-2">
          <h1 className="text-xl md:text-2xl text-[#1E1E1E] font-bold">
            Past Created Events
          </h1>
        </div>
        {visibleEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
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
                    <h1 className="text-[#1E1E1E] text-xl md:text-2xl font-bold">
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
                    <button className="bg-[#303030] p-2 rounded-lg text-[#FFF] flex items-center justify-center gap-2 text-base md:text-lg font-semibold">
                      Manage Event{" "}
                      <CgArrowTopRight className="text-lg md:text-xl]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <WhatNextHint />
        )}

        {reversedPastEvents.length > 2 && (
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() => setShowAllEvents(!showAllEvents)}
              className="flex items-center justify-center gap-2 border-2 border-[#E0580C] bg-[#FEFEFE] text-[#E0580C] shadow hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md"
            >
              {showAllEvents ? "See Less" : "See More"}{" "}
              {showAllEvents ? (
                <FiEyeOff className="text-2xl" />
              ) : (
                <FiEye className="text-2xl" />
              )}
            </button>
          </div>
        )}
      </section>

      <section className="grid gap-4 w-full">
        <div className="w-full flex items-center justify-between gap-2">
          <h1 className="text-xl md:text-2xl text-[#1E1E1E] font-bold">
            Past Registered Events
          </h1>
        </div>

        {visibleRegEvents.length > 0 ? (
          <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            {visibleRegEvents.map((data) => (
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
                    <h1 className="text-[#1E1E1E] text-xl md:text-2xl font-bold">
                      {data.event_name}
                    </h1>

                    <p className="text-base text-[#E57435] font-medium">
                      Host: {data.event_host_name}
                    </p>
                    <p className="flex items-center gap-2">
                      <SlLocationPin />
                      <span>
                        {data.event_mode === "Physical"
                          ? data.event_location
                          : data.event_link}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MdOutlineAccessTime />
                      <span>{data.event_start_time} WAT</span>
                    </p>
                  </div>

                  {data.attendees ? (
                    <div className="flex items-center gap-2">
                      <img
                        src="/img/registered-users.svg"
                        alt="joiners"
                        className=""
                      />
                      <p className="text-xs font-medium text-[#676767]">
                        + <span>{data.attendees.length}</span>{" "}
                        <span>
                          {data.attendees.length > 1
                            ? "People registered"
                            : "Person registered"}
                        </span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  <p className="text-xs font-medium text-[#676767]">
                    Event created by:{" "}
                    <span className="font-semibold">
                      {data.createdBy.firstname + " " + data.createdBy.lastname}
                    </span>
                  </p>
                  <p className="absolute top-2 right-2 p-2 rounded-md text-sm text-[#FCEEE7] font-medium bg-green-800">
                    Registered
                  </p>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <WhatNextHint />
        )}

        {reversedPastRegEvents.length > 2 && (
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() => setViewAllEvents(!viewAllEvents)}
              className="flex items-center justify-center gap-2 border-2 border-[#E0580C] bg-[#FEFEFE] text-[#E0580C] shadow hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md"
            >
              {viewAllEvents ? "See Less" : "See More"}{" "}
              {viewAllEvents ? (
                <FiEyeOff className="text-2xl" />
              ) : (
                <FiEye className="text-2xl" />
              )}
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default PastEvents;
