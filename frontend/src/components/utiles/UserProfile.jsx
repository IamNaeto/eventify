import { TbEdit } from "react-icons/tb";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [data, setData] = useState(null);
  const token = localStorage.getItem("eventify_auth_token");

  useEffect(() => {
    const decodeToken = () => {
      // Decode the token to get payload data
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
          toast.error("Unauthorized user, please login");
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
        setData(data);
        console.log(data);
        // toast.success("Data fetched successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-2xl text-[#E0580C] min-h-screen">
        <p>Loading...</p> <PropagateLoader color="#E0580C" />
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center p-10 text-3xl text-red-900 min-h-screen">
        {" "}
        <BiSolidError className="text-6xl" />
        <p>404! User not found</p>
      </div>
    );

  return (
    <main className="min-h-screen w-full relative grid gap-4 top-[76px] bg-[#FAFAFA] ">
      <Toaster position="top-right" richColors />
      <section className="flex flex-col items-center bg-[#FCEEE7] h-[300px] w-full px-[3%]">
        <div className="relative top-24 flex flex-col items-start w-[80%] min-h-[400px] bg-[#fff] p-5 gap-1 rounded-lg shadow-lg">
          <div className="p-4 w-[150px] h-[150px] rounded-full shadow-md bg-[#fff] flex items-center justify-center border border-[#EBEBEB]">
            {data.img ? (
              <img src="/img/user-profile.png" alt="user-profile-picture" />
            ) : (
              <h1 className="text-7xl font-bold text-[#E0580C] rounded-full">
                {data.firstname.charAt(0)}
                {data.lastname.charAt(0)}
              </h1>
            )}
          </div>

          <div className="flex items-center justify-between w-full gap-6">
            <div className="grid">
              <h1 className="text-2xl text-[#1E1E1E] font-bold">
                {data.firstname + " " + data.lastname}
              </h1>
              <p className="text-[#676767]">{data.email}</p>
            </div>

            <Link
              to={"/event/user/profile/edit"}
              className="flex items-center justify-center gap-2 p-2 border border-[#E0580C] text-[#E0580C] hover:bg-[#E0580C] hover:text-[#FFF] font-medium rounded-md delay-100 transition-all"
            >
              {" "}
              <TbEdit /> Edit Profile
            </Link>
          </div>

          <div className="grid mt-2">
            <h3 className="text-xl text-[#1E1E1E] font-semibold">About</h3>
            <p className="text-base text-[#676767]">
              {" "}
              {data.bio ? data.bio : "Your short bio goes here"}{" "}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <a href={data.instagram ? data.instagram : "#"} target="_blank">
              <BsInstagram className="text-xl text-[#1E1E1E] delay-100 transition-all hover:text-[#E0580C]" />
            </a>
            <a href={data.linkedIn ? data.linkedIn : "#"} target="_blank">
              <FaLinkedinIn className="text-xl text-[#1E1E1E] delay-100 transition-all hover:text-[#E0580C]" />
            </a>
            <a href={data.twitter ? data.twitter : "#"} target="_blank">
              <FaXTwitter className="text-xl text-[#1E1E1E] delay-100 transition-all hover:text-[#E0580C]" />
            </a>
            <a href={data.website ? data.website : "#"} target="_blank">
              <FaLink className="text-xl text-[#1E1E1E] delay-100 transition-all hover:text-[#E0580C]" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserProfile;
