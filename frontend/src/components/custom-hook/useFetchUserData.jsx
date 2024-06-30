import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const useFetchUserData = (token) => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    website: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const decodeToken = () => {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        console.log("User ID:", userId);
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
      }
    };

    decodeToken();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        if (!token) {
          //   toast.error("Unauthorized user, please login");
          console.log("Unauthorized user, please login");
          return;
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${import.meta.env.VITE_APP_AUTH_ROUTE_URL}/profile/${userId}`,
          { headers }
        );
        const data = response.data;
        console.log(data);
        setUserData(data);
        // toast.success("Data fetched successfully");
      } catch (error) {
        console.error(error);
        // toast.error("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  return { userData, isLoading, userId };
};

export default useFetchUserData;
