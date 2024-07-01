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
    <main className="grid gap-6 w-full relative px-[3%] py-5">
      <section className="grid gap-2">
        <h1 className="text-3xl text-[#535353] font-bold">All Attendees Data</h1>
        <div className="flex items-center gap-2">
          <img src="/img/joiners.png" alt="" className="w-[70px]" />
          <p className="text-base text-[#535353]">{event.attendees.length} {event.attendees.length === 1 ? "Attendee" : "Attendees" }</p>
        </div>
      </section>

      <section>
        <div className="border border-[#FCEEE7] pb-2 rounded-2xl">
          <div className="grid grid-cols-4 items-center p-4 bg-[#FCEEE7] text-[#E0580C] text-lg font-semibold rounded-tl-2xl rounded-tr-2xl border-b border-b-[#E0580C]">
            <h1>S/N</h1>
            <h1>First Name</h1>
            <h1>Last Name</h1>
            <h1>Email</h1>
          </div>
          {event.attendees.map((attendee, index) => (
            <div
              key={attendee.email}
              className="grid grid-cols-4 items-center p-4 border-t border-t-[#E0580C] text-base text-[#535353] font-semibold"
            >
              <h1>{index + 1}</h1>
              <h2>{attendee.firstname}</h2>
              <h2>{attendee.lastname}</h2>
              <h2>{attendee.email}</h2>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AttendeesList;
