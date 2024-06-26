import ExploreHero from "./ExploreHero";
import Categories from "./Categories";
import RecentEvents from "./RecentEvents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Explore = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getAllEventsEndpoint = `${
    import.meta.env.VITE_APP_EVENT_ROUTE_URL
  }/allEvents`;

  useEffect(() => {
    fetchData();
  }, [getAllEventsEndpoint]);

  useEffect(() => {
    setFilteredEvents(allEvents);
  }, [allEvents]);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(getAllEventsEndpoint);
      const data = response.data;
      setAllEvents(data);
    //   toast.success("Data fetched successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

  return (
    <div>
      <ExploreHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Categories allEvents={allEvents} setFilteredEvents={setFilteredEvents} />
      <RecentEvents allEvents={filteredEvents} searchQuery={searchQuery} />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Explore;
