import { SlLocationPin } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";
const CreatedEvents = () => {
  return (
    <main>
      <section className="grid grid-cols-2 items-center gap-6 mt-4">
        <div className="grid gap-2 rounded-xl border-[2px] border-[#FEFEFE] shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90">
          <div className="w-full">
            <img src="/img/event-img.png" alt="event-img" className="w-full" />
          </div>

          <div className="grid gap-4 p-4">
            <div className="text-[#E57435] text-[16px] font-medium flex items-center justify-between gap-4 ">
              <p>Mon. Oct 30</p>
              <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">$100</p>
            </div>

            <div className="grid gap-2 text-[#676767] text-sm font-medium">
              <h1 className="text-[#1E1E1E] text-2xl font-bold">
                Univelcity Finalist Meetup
              </h1>
              <p className="flex items-center gap-2">
                <SlLocationPin /> <span>Greenfield, IK </span>
              </p>
              <p className="flex items-center gap-2">
                <MdOutlineAccessTime /> <span>3:00PM WAT</span>
              </p>
            </div>

            <div>
              <button className="bg-[#303030] p-2 rounded-lg text-[#FFF] flex items-center justify-center gap-2 text-lg font-semibold">
                Manage Event <CgArrowTopRight className="text-xl]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreatedEvents;
