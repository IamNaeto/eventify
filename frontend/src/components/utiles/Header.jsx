import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <div className="w-full fixed z-30 bg-[#FEFEFE] flex items-center justify-between py-4 px-[3%] shadow text-[16px] text-[#3C3C3C] font-semibold">
            <Link to={"/"}>
                <img src="/img/eventify-logo.svg" alt="" />
            </Link>

            <div className="flex items-center justify-center gap-6">
                <Link to={""} className="hover:text-[#E0580C] delay-150 transition-all">Explore</Link>
                <Link to={""} className="hover:text-[#E0580C] delay-150 transition-all">Manage Events</Link>
                <Link to={""} className="hover:text-[#E0580C] delay-150 transition-all">Create Event +</Link>
            </div>

            <div className="flex items-center justify-center gap-6">
                <button className="border border-[#E0580C] bg-[#FEFEFE] hover:text-[#E0580C] transition-all delay-150 py-2 px-4 rounded-md">Sign in</button>
                <Link className="border border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-2 px-4 rounded-md">Create Event</Link>
            </div>
        </div>
     );
}
 
export default Header;