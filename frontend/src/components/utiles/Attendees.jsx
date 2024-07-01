import { HiOutlineUsers } from "react-icons/hi2";
import AttendeesList from "./AttendeesList";

const Attendees = ({ event, isLoading }) => {
  console.log("Attendees", event ? event.attendees : 'No event data');
  return (
    <main className="min-h-screen">
      {event && event.attendees && event.attendees.length > 0 ? (
        <AttendeesList event={event} isLoading={isLoading} />
      ) : (
        <section className="min-h-[70vh] text-2xl text-[#DEDEDE] flex flex-col items-center justify-center gap-2">
          <HiOutlineUsers className="text-8xl" />
          <h1>No Guests Yet</h1>
        </section>
      )}
    </main>
  );
};

export default Attendees;
