import { GiPartyPopper } from "react-icons/gi";

const Categories = ({ allEvents, setFilteredEvents }) => {
  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Art" },
    { id: 3, name: "Tech" },
    { id: 4, name: "Sporting" },
    { id: 5, name: "Education" },
    { id: 6, name: "Profession" },
    { id: 7, name: "Sexuality" },
    { id: 8, name: "Fun & Cruise" },
    { id: 9, name: "Music & Concert" },
    { id: 10, name: "Science & Nature" },
    { id: 11, name: "Fashion & Beauty" },
    { id: 12, name: "Health & Wellness" },
    { id: 13, name: "Travel & Adventure" },
    { id: 14, name: "Networking & Business" },
    { id: 15, name: "Celebrations & Ceremonies" },
  ];

  const handleCategoryClick = (categoryName) => {
    if (categoryName === "All") {
      setFilteredEvents(allEvents); // Reset to show all events
    } else {
      const filteredEvents = allEvents.filter(
        (event) => event.event_category === categoryName
      );
      setFilteredEvents(filteredEvents);
    }
  };

  return (
    <main className="w-full relative top-[76px] px-[3%] pt-10 pb-5">
      <h1 className="text-3xl text-[#1E1E1E] font-bold mb-6">
        Event Categories
      </h1>
      <div className="w-full flex items-center justify-start lg:justify-center gap-4 px-4 py-4 flex-auto lg:flex-wrap overflow-x-auto lg:overflow-auto customized-scrollbar">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-center text-xs md:text-sm font-semibold text-[#3C3C3C] hover:text-[#E0580C] border shadow border-[#F2BB9B] hover:bg-[#FCEEE7] rounded-full py-2 px-3 cursor-pointer delay-150 transition-all max-w-[250px] flex-shrink-0"
            onClick={() => handleCategoryClick(category.name)}
          >
            <GiPartyPopper className="text-lg md:text-xl mr-1 md:mr-2" />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Categories;
