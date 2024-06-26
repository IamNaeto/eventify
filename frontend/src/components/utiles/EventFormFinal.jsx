import { LuLoader2 } from "react-icons/lu";

const CreateEventFinal = ({
  setProgressStage,
  setCategory,
  category,
  setCapacity,
  capacity,
  ticket,
  setTicket,
  price,
  setPrice,
  handleSubmit,
  primaryBtnAction,
  secondaryBtnAction,
  isLoading
}) => {
  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="bg-[rgb(255,255,255)] text-[16px] grid gap-4 p-10 rounded-xl mt-4 shadow-xl"
    >
      <h1 className="text-3xl font-bold text-[#1E1E1E]">
        Hey Pal, Almost done!
      </h1>

      <div className="w-full rounded-xl">
        <img src="/img/event-image.png" alt="" className="w-full" />
      </div>

      <label htmlFor="category">
        Event Category
        <select
          name="event_category"
          id="category"
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">---select---</option>
          <option value="Art">Art</option>
          <option value="Tech">Tech</option>
          <option value="Sporting">Sporting</option>
          <option value="Education">Education</option>
          <option value="Profession">Profession</option>
          <option value="Sexuality">Sexuality</option>
          <option value="Fun & Cruise">Fun & Cruise</option>
          <option value="Music & Concert">Music & Concert</option>
          <option value="Science & Nature">Science & Nature</option>
          <option value="Fashion & Beauty">Fashion & Beauty</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Travel & Adventure">Travel & Adventure</option>
          <option value="Networking & Business">Networking & Business</option>
          <option value="Celebrations & Ceremonies">Celebrations & Ceremonies</option>
        </select>
      </label>

      <label htmlFor="capacity">
        Event Capacity Level
        <select
          name="event_capacity_level"
          id="capacity"
          className="input"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        >
          <option value="">---select---</option>
          <option value="50+">50+</option>
          <option value="100+">100+</option>
          <option value="200+">200+</option>
          <option value="300+">300+</option>
          <option value="400+">400+</option>
          <option value="500+">500+</option>
          <option value="600+">600+</option>
          <option value="700+">700+</option>
          <option value="800+">800+</option>
          <option value="900+">900+</option>
          <option value="1000+">1000+</option>
        </select>
      </label>

      <label htmlFor="ticket">
        Ticket type
        <select
          name="ticket_type"
          id="ticket"
          className="input"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        >
          <option value="">---select---</option>
          <option value="Free">Free</option>
          <option value="Premium">Premium</option>
        </select>
      </label>

      {ticket === "Premium" && (
        <label htmlFor="price">
          Price
          <input
            type="text"
            className="input"
            placeholder="$100"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
      )}

      <button
        type="submit"
        className="border border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md flex items-center justify-center"
      >
        { isLoading ? 
        <LuLoader2 className="text-2xl animate-spin"/> 
        : 
        primaryBtnAction }
        
      </button>
      <button
        type="button"
        className="border border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] transition-all delay-150 py-2 px-4 rounded-md"
        onClick={() => setProgressStage(1)}
      >
        {secondaryBtnAction}
      </button>
    </form>
  );
};

export default CreateEventFinal;
