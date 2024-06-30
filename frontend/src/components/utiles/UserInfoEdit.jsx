import { BiEdit } from "react-icons/bi";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BiSolidError } from "react-icons/bi";
import { jwtDecode } from "jwt-decode";
import { LuLoader2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UserInfoEdit = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const token = localStorage.getItem("eventify_auth_token");
  const navigate = useNavigate()
  

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

  // function to fetch user data
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
        console.log(data);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setBio(data.bio);
        setWebsite(data.website);
        setTwitter(data.twitter);
        setLinkedIn(data.linkedIn);
        setInstagram(data.instagram);
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

  if (!userId)
    return (
      <div className="flex flex-col items-center justify-center p-10 text-3xl text-red-900 min-h-screen">
        {" "}
        <BiSolidError className="text-6xl" />
        <p>404! User not found</p>
      </div>
    );

  // function to handle profile save and update
  const handleProfileSave = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email) {
      toast.error("Firstname, lastname or email must be filled");
      return;
    }

    const data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      bio: bio,
      website: website,
      twitter: twitter,
      linkedIn: linkedIn,
      instagram: instagram,
    };

    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      if (!token) {
        toast.error("Unauthorized user, please login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const request = await axios.put(
        `${import.meta.env.VITE_APP_AUTH_ROUTE_URL}/profile/${userId}`,
        data,
        { headers }
      );
      console.log(request);
      toast.success("Profile Updated successfully");
      setTimeout(() => {
        navigate("/event/user/profile")
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("User with this email already exists");
      } else if(error.response && error.response.status === 404){
            toast.error("User not found");
      }else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center gap-4 top-[76px] bg-[#FAFAFA] ">
      <section className="grid gap-4 bg-white min-w-[70%] rounded-xl p-8 my-10">
        <Toaster position="top-right" richColors />
        <div className="grid gap-4">
          <div className="rounded-full p-2 bg-[#C0C0C0] flex items-center justify-center w-[100px] h-[100px] cursor-pointer">
            <BiEdit className="text-2xl w-full" />
          </div>
          <div className="grid">
            <h1 className="text-2xl text-[000000] font-bold">Edit Profile</h1>
            <p className="text-base text-[#959595] font-semibold">
              Make changes to your profile
            </p>
          </div>
        </div>

        <form action="" className="w-full grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <label htmlFor="firstname">
              First Name
              <input
                type="text"
                placeholder="Enter First Name"
                className="input"
                name="firstname"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>

            <label htmlFor="lastname">
              Last Name
              <input
                type="text"
                placeholder="Enter Last Name"
                className="input"
                name="lastname"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </label>
          </div>

          <label htmlFor="email">
            Email
            <input
              type="email"
              placeholder="Enter Email Address"
              className="input"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label htmlFor="bio">
            Short Bio
            <textarea
              name="bio"
              id="bio"
              cols="30"
              rows="5"
              className="input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </label>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <h1 className="text-lg font-bold text-[#000000]">Social Links</h1>
              <p className="text-base font-medium text-[#959595]">
                Add existing social links to build a stronger reputattion
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="website-url">
                Website Url
                <input
                  type="url"
                  placeholder="Enter Your Website URL"
                  className="input"
                  name="website-url"
                  id="website-url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
              <label htmlFor="twitter">
                X (Formally Twitter)
                <input
                  type="url"
                  placeholder="Enter Your X Profile URL"
                  className="input"
                  name="twitter"
                  id="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label htmlFor="linkedin">
                LinkedIn
                <input
                  type="url"
                  placeholder="Enter Your LinkedIn Profile URL"
                  className="input"
                  name="linkedin"
                  id="linkedin"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </label>
              <label htmlFor="instagram">
                Instagram
                <input
                  type="url"
                  placeholder="Enter Your Instagram Profile URL"
                  className="input"
                  name="instagram"
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </label>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <Link to={"/event/user/profile"} className="min-w-[200px] border-2 border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] hover:shadow-lg transition-all delay-150 py-2 px-4 rounded-md text-center">
                Cancel
              </Link>
              <button
                onClick={handleProfileSave}
                className="min-w-[200px] border-2 border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md flex items-center justify-center"
              >
                {loading ?  <LuLoader2 className="text-2xl animate-spin"/> : "Save Profile" }
                
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default UserInfoEdit;
