import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";

const WhatNextHint = () => {
  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="grid items-center justify-center p-6 rounded-full bg-[#FCEEE7] text-[#E0580C] text-center">
        <IoCalendarOutline className="text-6xl" />
      </div>
      <h1 className="text-[#303030] text-2xl font-semibold text-center">
        Hey there! 👋 It seems like this corner is a bit quiet
      </h1>
      <p className="text-[#767676] text-sm text-center">
        Click the{" "}
        <Link to={"/event/create"} className="text-[#E0580C] font-semibold">
          create event
        </Link>{" "}
        or{" "}
        <Link to={""} className="text-[#E0580C] font-semibold">
          explore event
        </Link>{" "}
        button to get started
      </p>
    </main>
  );
};

export default WhatNextHint;
