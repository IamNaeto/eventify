import EventOverview from "./EventOverview";

const EventMgt = () => {
    return (
        <div className="w-full relative grid gap-6 top-[76px] px-[3%] pb-10 pt-4 bg-[#FAFAFA] min-h-screen overflow-x-hidden">
            <section className="grid grid-cols-3 items-center justify-center gap-4 text-[#3C3C3C] font-bold text-lg text-center">
                <h1 className="p-2 border-b-2 border-b-[#E0580C] cursor-pointer">Event Overview</h1>
                <h1  className="p-2 border-b-2 text-[#C0C0C0] border-b-[#C0C0C0] cursor-pointer">Attendees</h1>
                <h1  className="p-2 border-b-2 text-[#C0C0C0] border-b-[#C0C0C0] cursor-pointer">Share Invites</h1>
            </section>

            <section>
                <EventOverview />
            </section>
        </div>
    );
}

export default EventMgt;