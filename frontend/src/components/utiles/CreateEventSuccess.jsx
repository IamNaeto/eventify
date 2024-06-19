const CreateEventSuccess = () => {
  return (
    <div className="bg-[rgb(255,255,255)] text-[16px] grid items-center justify-center gap-4 p-10 rounded-xl mt-4 shadow-xl">
      <h1 className="text-3xl font-bold text-[#1E1E1E]">
        Yooopiiee! Event Created Sucessfully
      </h1>

      <div className="w-full flex items-center justify-center">
        <img src="/img/success.png" alt="success image" />
      </div>

      <button className="border border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md">
        See All Events
      </button>
      <button className="border border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] transition-all delay-150 py-2 px-4 rounded-md">
        Copy Event Link
      </button>
    </div>
  );
};

export default CreateEventSuccess;
