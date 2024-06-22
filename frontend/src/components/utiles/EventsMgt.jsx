import CustomCalendar from "./Calender";
import CreatedEvents from "./CreatedEvents";
import { useState } from "react";
import UpcomingEvents from "./UpcomingEvents";
import PastEvents from "./PastEvents";
import { CiCompass1 } from "react-icons/ci";
import { Link } from "react-router-dom";

const EventsMgt = () => {
  const [toggleEvents, setToggleEvents] = useState("Created Events");

  return (
    <main className="min-h-[70vh] w-full relative top-[76px] px-[3%] pb-10 pt-6 grid gap-6">
      <section className="flex flex-col gap-4 text-[#1E1E1E]">
        <h1 className="text-2xl font-bold">Welcome Paul,</h1>

        <div className=" grid grid-cols-3 gap-4">
          <div
            className={`${
              toggleEvents === "Created Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Created Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold">0</h1>
              <p className="text-lg font-medium">Created Events</p>
            </div>

            <img src="/img/create-icon.png" alt="create-icon" />
          </div>

          <div
            className={`${
              toggleEvents === "Upcoming Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE]  cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Upcoming Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold">0</h1>
              <p className="text-lg font-medium">Upcoming Events</p>
            </div>

            <img src="/img/upcoming-icon.png" alt="upcoming-icon" />
          </div>

          <div
            className={`${
              toggleEvents === "Past Events" ? "shadow-sm" : "shadow-lg"
            } flex items-center justify-between gap-4 p-4 rounded-xl border-[2px] border-[#FEFEFE] shadow-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90`}
            onClick={() => setToggleEvents("Past Events")}
          >
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold">0</h1>
              <p className="text-lg font-medium">Past Events</p>
            </div>

            <img src="/img/delete-icon.png" alt="delete-icon" />
          </div>
        </div>
      </section>

      <section className="w-full flex items-start gap-10">
        <div className="w-[76%]">
          {toggleEvents === "Created Events" ? (
            <CreatedEvents />
          ) : toggleEvents === "Upcoming Events" ? (
            <UpcomingEvents />
          ) : (
            <PastEvents />
          )}
        </div>
        <div className="grid gap-4 w-[25%]">
          <CustomCalendar />

          <div className="w-full flex flex-col gap-4">
            <Link
              to={"/event/create"}
              className="w-full border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] text-center py-2 px-4 rounded-md"
            >
              Create Event +
            </Link>
            <Link
              to={""}
              className="flex items-center justify-center gap-2 w-full border-2 border-[#E0580C] bg-[#FEFEFE] text-center text-[#E0580C] hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md"
            >
              Explore Events <CiCompass1 />{" "}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsMgt;
