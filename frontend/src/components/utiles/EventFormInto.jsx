import { Link } from "react-router-dom";

const CreateEventIntro = ({
  setName,
  name,
  setHost,
  host,
  setDescription,
  description,
  setStartDate,
  startDate,
  setStartTime,
  startTime,
  setEndDate,
  endDate,
  setEndTime,
  endTime,
  setMode,
  mode,
  setLocation,
  location,
  setLink,
  link,
  handleInitialValidation,
  primaryBtnCaption,
  secondaryBtnCaption,
  route
}) => {
  return (
    <form
      action=""
      className="bg-[rgb(255,255,255)] text-[16px] grid gap-4 p-10 rounded-xl mt-4 shadow-xl"
      onSubmit={handleInitialValidation}
    >
      <input
        type="text"
        placeholder="Event Name"
        className="input"
        name="event_name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Host Name"
        className="input"
        name="event_host_name"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />

      <textarea
        name="event_description"
        id="event_description"
        cols="30"
        rows="10"
        placeholder="Description"
        className="input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="grid gap-4 p-[8px] rounded-lg border border-[#DEDEDE]">
        <label htmlFor="" className="flex items-center gap-4">
          Start
          <input
            type="date"
            className="input"
            name="start_date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="time"
            className="input"
            name="start_time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label htmlFor="" className="flex items-center gap-4">
          End
          <input
            type="date"
            className="input"
            name="end_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="time"
            className="input"
            name="end_time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
      </div>

      <label htmlFor="">
        Event Mode
        <select
          name="event_mode"
          id=""
          className="input"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="">---select---</option>
          <option value="Physical">Physical</option>
          <option value="Virtual (Zoom/Meet)">Virtual (Zoom/Meet)</option>
        </select>
      </label>
      {mode === "Physical" ? (
        <label htmlFor="">
          Enter Location
          <input
            type="text"
            className="input"
            placeholder="Enter event location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
      ) : mode === "Virtual (Zoom/Meet)" ? (
        <label htmlFor="">
          Enter Link
          <input
            type="url"
            className="input"
            placeholder="Enter event link"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
      ) : (
        ""
      )}

      <button
        type="submit"
        className="border border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md"
      >
        {primaryBtnCaption}
      </button>
      <Link
        to={route}
        className="flex items-center justify-center border border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] transition-all delay-150 py-2 px-4 rounded-md"
      >
        {secondaryBtnCaption}
      </Link>
    </form>
  );
};

export default CreateEventIntro;
