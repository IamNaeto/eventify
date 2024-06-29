import ExploreHero from "./ExploreHero";
import Categories from "./Categories";
import RecentEvents from "./RecentEvents";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Explore = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("eventify_auth_token");
  const [userId, setUserId] = useState("");

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

      if (!token) {
        console.error("Unauthorized user, please login");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(getAllEventsEndpoint);
      const data = response.data;
      console.log(data);
      setAllEvents(data);

      // Decode the token to get payload data
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        console.log("User ID:", userId);
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ExploreHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Categories allEvents={allEvents} setFilteredEvents={setFilteredEvents} />
      <RecentEvents
        allEvents={filteredEvents}
        searchQuery={searchQuery}
        isLoading={isLoading}
        userId={userId}
      />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Explore;
