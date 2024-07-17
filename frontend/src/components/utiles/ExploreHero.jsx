const ExploreHero = ({ searchQuery, setSearchQuery }) => {
  return (
    <main className="explore-bg grid items-center justify-center place-items-center bg-[#FCEEE7] w-full relative top-[65px] md:top-[76px] px-[3%] py-10 min-h-[50vh] md:min-h-[70vh]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center text[#020202]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-full md:max-w-[80%]">
          Finding Events Have <span className="text-[#E0580C]">Never</span> been{" "}
          <span className="text-[#E0580C]">Easier</span>
        </h1>
        <p className="w-full md:w-[75%] text-sm md:text-base lg:text-lg font-normal">
          Effortlessly explore, connect, and immerse yourself in amazing
          experiences—your next unforgettable event is just a click away, making
          planning your perfect day simpler than ever.
        </p>

        <div className="flex items-center justify-center relative w-full md:w-[50%]">
          <input
            type="search"
            placeholder="Search For Events By Name"
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-0 top-[-1px] md:top-[-3px] border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] text-sm md:text-base py-2 px-4 rounded-md placeholder:text-sm md:placeholder:text-base">
            Search
          </button>
        </div>
      </div>
    </main>
  );
};

export default ExploreHero;
