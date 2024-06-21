import Attendees from "./Attendees";
import EventOverview from "./EventOverview";
import { useState } from "react";
import ShareInvites from "./ShareInvites";

const EventMgt = () => {
  const [toggleMgt, setToggleMgt] = useState("Event Overview");

  return (
    <div className="min-h-[70vh] w-full relative grid gap-6 top-[76px] px-[3%] pb-10 pt-4 bg-[#FAFAFA] overflow-x-hidden">
      <section className="grid grid-cols-3 items-center justify-center gap-4 font-bold text-lg text-center">
        <h1
          className={`p-2 border-b-2 ${toggleMgt === "Event Overview" ? "border-b-[#E0580C] text-[#3C3C3C]" : "border-b-[#C0C0C0] text-[#C0C0C0]"} cursor-pointer `}
          onClick={() => setToggleMgt("Event Overview")}
        >
          Event Overview
        </h1>
        <h1
          className={`p-2 border-b-2 ${toggleMgt === "Attendees" ? "border-b-[#E0580C] text-[#3C3C3C]" : "border-b-[#C0C0C0] text-[#C0C0C0]"} cursor-pointer`}
          onClick={() => setToggleMgt("Attendees")}
        >
          Attendees
        </h1>
        <h1
          className={`p-2 border-b-2 ${toggleMgt === "Share Invites" ? "border-b-[#E0580C] text-[#3C3C3C]" : "border-b-[#C0C0C0] text-[#C0C0C0]"}  cursor-pointer`}
          onClick={() => setToggleMgt("Share Invites")}
        >
          Share Invites
        </h1>
      </section>

      <section>
        {toggleMgt === "Event Overview" ? (
          <EventOverview />
        ) : toggleMgt === "Attendees" ? (
          <Attendees />
        ) : (
          <ShareInvites />
        )}
      </section>
    </div>
  );
};

export default EventMgt;
