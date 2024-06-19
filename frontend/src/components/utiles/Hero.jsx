import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative top-[75px] py-5 px-[3%] border-b grid grid-cols-2 gap-4 border-b-[#A6A6A6]">
      <div className="flex flex-col gap-4">
        <motion.img
          src="/img/eventify-icon.png"
          alt="eventify icon"
          className="w-36"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <motion.h1
          className="text-[#1E1E1E] text-5xl font-bold"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Crafting Experiences One <span className="text-[#E0580C]">Event</span>{" "}
          at a Time
        </motion.h1>
        <motion.p
          className="text-[#1E1E1E] text-md"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          Bring your events to life effortlessly. Eventify empowers you to
          create, organize, and manage your events easily
        </motion.p>

        <motion.div
          className="flex items-center gap-1 text-[#3C3C3C]"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <img src="/img/joiners.png" alt="" />
          <p className="text-sm">Join over 12,00+ people in creating events </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <button className="border border-[#E0580C] hover:border-[#9D3E08] bg-[#E0580C] hover:bg-[#9D3E08] transition-all delay-150 text-[#FEFEFE] py-3 px-6 rounded-md">
            Create An Event
          </button>
        </motion.div>
      </div>

      <div className="w-full flex items-end place-items-end">
        <motion.img
          src="/img/eventify-hero.png"
          alt="hero-img"
          className="w-[90%]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </section>
  );
};

export default Hero;
