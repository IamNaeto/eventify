const CreateEventSuccess = ({
  title,
  seeAllEvents,
  action,
  primaryBtnCaption,
  secondaryBtnCaption,
}) => {
  return (
    <div className="bg-[rgb(255,255,255)] text-[16px] grid items-center justify-center gap-2 p-8 rounded-xl mt-4 shadow-xl">
      <h1 className="text-center text-xl sm:text-2xl font-bold text-[#1E1E1E]">{title}</h1>

      <div className="w-full flex items-center justify-center">
        <img src="/img/success.png" alt="success image" className="w-[200px]"/>
      </div>

      <button
        className="text-sm sm:text-base border border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] text-center py-2 px-4 rounded-md"
        onClick={seeAllEvents}
      >
        {primaryBtnCaption}
      </button>
      <button
        className="text-sm sm:text-base border border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] transition-all delay-150 py-2 px-4 rounded-md"
        onClick={action}
      >
        {secondaryBtnCaption}
      </button>
    </div>
  );
};

export default CreateEventSuccess;
