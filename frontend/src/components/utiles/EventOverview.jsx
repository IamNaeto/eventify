import { IoCalendarClearOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { CgArrowTopRight } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin3Line } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";

const EventOverview = () => {
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
            <p className="text-18px font-medium">Hosted by BigJohnny</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h1 className="text-3xl font-bold">Dey Play Event</h1>

          <div className="flex items-center gap-2">
            <div className="p-2 border-2 border-[#A4A4A4] shadow rounded-xl">
              <IoCalendarClearOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-lg font-semibold">
                Wednesday, November 15, 2023
              </p>
              <p className="text-[16px]">1:00 PM to 2:00 PM</p>
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
              <p className="text-[16px]">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-[#360789] shadow shadow-[#360789]">
              <h1 className="text-lg font-semibold">Event Category</h1>
              <p className="text-[14px] text-[#3C3C3C]">Tech</p>
            </div>

            <div className="p-4 rounded-lg border border-[#E0580C] shadow shadow-[#E0580C]">
              <h1 className="text-lg font-semibold">Event Capacity</h1>
              <p className="text-[14px] text-[#3C3C3C]">50 Persons</p>
            </div>

            <div className="p-4 rounded-lg border border-[#12B76A] shadow shadow-[#12B76A]">
              <h1 className="text-lg font-semibold">Ticket Type</h1>
              <p className="text-[14px] text-[#3C3C3C]">Free</p>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
            <Link to={"/event/edit"} className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <CiEdit /> Edit Event
            </Link>
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <RiDeleteBin3Line /> Delete Event
            </button>
          </div>

          <div className="w-full grid grid-cols-2 items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <HiOutlineUsers /> View Attendees
            </button>
            <button className="flex items-center justify-center gap-2 text-center font-bold py-3 px-8 rounded-lg border-2 border-[#E0580C] text-[#E0580C] hover:shadow-lg hover:shadow-[#E0580C]">
              {" "}
              <AiOutlineCloudUpload /> Share event
            </button>
          </div>
        </div>
      </section>

      <section className="w-full grid gap-4">
        <h1 className="text-2xl font-bold">About This Event</h1>
        <p className="text-[16px] text-[#585858]">
          Embark on an extraordinary journey into the realm of innovation and
          technology with our upcoming event! We invite you to immerse yourself
          in an electrifying atmosphere where groundbreaking ideas and
          cutting-edge solutions converge. This event is not just a gathering;
          it's a celebration of technological marvels and the visionaries
          shaping the future. Throughout the day, you'll have the opportunity to
          engage with industry trailblazers through insightful keynote sessions,
          hands-on workshops, and interactive panel discussions. Get ready to
          broaden your horizons, exchange ideas with like-minded enthusiasts,
          and witness firsthand the transformative power of technology. Whether
          you're a seasoned professional, an aspiring tech wizard, or simply
          curious about the latest trends, our event offers something for
          everyone. Join us as we explore the boundless possibilities of the
          tech landscape, fostering collaboration, and sparking inspiration that
          transcends conventional boundaries.
        </p>
      </section>
    </main>
  );
};

export default EventOverview;
