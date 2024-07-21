const AttendeesList = ({ event, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );
  }

  if (!event || !event.attendees || event.attendees.length === 0) {
    return (
      <section className="min-h-[70vh] text-2xl text-[#DEDEDE] flex flex-col items-center justify-center gap-2">
        <HiOutlineUsers className="text-8xl" />
        <h1>No Guests Yet</h1>
      </section>
    );
  }

  return (
    <main className="grid gap-6 w-full relative px-[3%] py-2 md:py-5">
      <section className="grid gap-2">
        <h1 className="text-xl sm:2xl md:text-3xl text-[#535353] font-bold">
          All Attendees Data
        </h1>
        <div className="flex items-center gap-2">
          <img src="/img/joiners.png" alt="" className="w-[70px]" />
          <p className="text-sm sm:text-base text-[#535353]">
            {event.attendees.length}{" "}
            {event.attendees.length === 1 ? "Attendee" : "Attendees"}
          </p>
        </div>
      </section>

      <div className="grid overflow-x-scroll customized-scrollbar sm:overflow-hidden border border-[#FCEEE7] rounded-2xl">
        <div className="text-[16px] md:text-[18px] flex items-center justify-between p-4 bg-[#FCEEE7] text-[#E0580C] text-sm sm:text-base md:text-lg font-semibold rounded-tl-2xl rounded-tr-2xl border-b border-b-[#E0580C]">
          <h1 className="w-[50px]">S/N</h1>
          <h1 className="w-[150px]">First Name</h1>
          <h1 className="w-[150px]">Last Name</h1>
          <h1 className="w-[200px]">Email</h1>
        </div>
        {event.attendees.map((attendee, index) => (
          <div
            key={attendee.email}
            className="text-[14px] md:text-[16px] flex items-center justify-between  p-4 border-t border-t-[#E0580C] text-xs sm:text-sm md:text-base text-[#535353] font-semibold"
          >
            <h1 className="w-[50px] py-2">{index + 1}</h1>
            <h1 className="w-[150px] py-2">{attendee.firstname}</h1>
            <h1 className="w-[100px] py-2">{attendee.lastname}</h1>
            <h1 className="w-[200px] py-2">{attendee.email}</h1>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AttendeesList;
