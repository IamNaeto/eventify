import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="grid gap-4 relative top-[76px] shadow w-full px-[3%] py-4">
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="flex items-center justify-between gap-6"
      >
        <div className="flex items-center justify-between gap-5">
          <div>
            <img src="/img/eventify-logo.svg" alt="" />
          </div>
          <div className="flex items-center justify-between gap-4 text-[16px] text-[#3C3C3C] font-semibold">
            <Link
              to={""}
              className="hover:text-[#E0580C] delay-150 transition-all"
            >
              Explore
            </Link>
            <Link
              to={""}
              className="hover:text-[#E0580C] delay-150 transition-all"
            >
              What's New
            </Link>
            <Link
              to={""}
              className="hover:text-[#E0580C] delay-150 transition-all"
            >
              Help
            </Link>
            <Link
              to={""}
              className="hover:text-[#E0580C] delay-150 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap text-[16px] text-[#3C3C3C]">
          <p>Download the app</p>
          <div className="flex items-center gap-2">
            <img
              src="/img/google-play-badge.png"
              alt=""
              className="cursor-pointer"
            />
            <img
              src="/img/apple-store-badge.png"
              alt=""
              className="cursor-pointer"
            />
          </div>
        </div>
      </motion.div>
      <hr className="bg-[#A6A6A6]" />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="flex items-center justify-between gap-4 text-[12px]  text-[#3C3C3C] py-4"
      >
        <p className="text-[#E0580C] font-medium">
          © 2023 Evento. All rights reserved.
        </p>

        <div className="flex items-center justify-center font-medium gap-4">
          <Link className="hover:text-[#E0580C] delay-150 transition-all">
            Terms of Service
          </Link>
          <Link className="hover:text-[#E0580C] delay-150 transition-all">
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center justify-center gap-4">
          <FaLinkedin className="text-2xl text-[#0A66C2] cursor-pointer" />
          <FaXTwitter className="text-2xl text-[#000000] cursor-pointer" />
          <FaFacebookSquare className="text-2xl text-[#1877F2] cursor-pointer" />
          <GrInstagram className="text-2xl text-[#FB017E] cursor-pointer" />
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
