import { SlLocationPin } from "react-icons/sl";
import { MdOutlineAccessTime } from "react-icons/md";
import { CgArrowTopRight } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

// formatDate function
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

const CreatedEvents = ({ createdEventData }) => {
  const navigate = useNavigate();

  const handleManageEvent = (id) => {
    navigate(`/manage/event/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <main>
      <section className="grid grid-cols-2 gap-6">
        {createdEventData.map((data) => (
          <div key={data._id} 
          className="grid gap-2 rounded-xl border-[2px] border-[#FEFEFE] shadow-md cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-90"
          onClick={() => handleManageEvent(data._id)}
          >
            <div className="w-full">
              <img src="/img/event-img.png" alt="event-img" className="w-full" />
            </div>

            <div className="grid gap-4 p-4">
              <div className="text-[#E57435] text-[16px] font-medium flex items-center justify-between gap-4">
                <p>{formatDate(data.event_start_date)}</p>
                {data.event_ticket === "Premium" ? (
                  <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">{data.event_price}</p>
                ) : (
                  <p className="py-1 px-3 rounded-md bg-[#FCEEE7]">{data.event_ticket}</p>
                )}
              </div>

              <div className="grid gap-2 text-[#676767] text-sm font-medium">
                <h1 className="text-[#1E1E1E] text-2xl font-bold">{data.event_name}</h1>
                <p className="flex items-center gap-2">
                  <SlLocationPin /> <span>{data.event_mode === "Physical" ? data.event_location : data.event_link}</span>
                </p>
                <p className="flex items-center gap-2">
                  <MdOutlineAccessTime /> <span>{data.event_start_time} WAT</span>
                </p>
              </div>

              <div>
                <button 
                className="bg-[#303030] p-2 rounded-lg text-[#FFF] flex items-center justify-center gap-2 text-lg font-semibold border-2 border-[#EBEBEB]"
                onClick={() => handleManageEvent(data._id)}
                >
                  Manage Event <CgArrowTopRight className="text-xl]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default CreatedEvents;
