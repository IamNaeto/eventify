import { HiOutlineUsers } from "react-icons/hi2";

const Attendees = () => {
  return (
    <main>
      <section className="min-h-[70vh] text-2xl text-[#DEDEDE] flex flex-col items-center justify-center gap-2">
        <HiOutlineUsers className="text-8xl" />
        <h1>No Guests Yet</h1>
      </section>
    </main>
  );
};

export default Attendees;
