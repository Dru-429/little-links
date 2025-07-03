"use client";

import { easeIn, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <div className="md:w-[85%] w-[95%] flex items-center justify-between py-2 px-1 md:px-7 py-1md:py-2 box-border backdrop-blur-md bg-primary/20 rounded-3xl p-8 border border-primary/30 shadow-2xl md:mt-4 mt-2">
      {/*Left Logo and Name Section */}
      <div className="flex items-center justify-between md:w-[60%] w-1/2">
        <div className="flex items-center gap-2">
          <span className="text-xl text-foreground/80 font-bold">
            Little Links
          </span>
        </div>
        <div className="hidden md:flex md:w-[45%] w-[25%] items-center justify-between tracking-tighter leading-none pr-2 relative">
          <div className="flex gap-10 text-foreground ">
            {[
              ["Home", "#home"],
              ["About", "#about"],
              ["Projects", "#projects"],
            ].map((item, index) => (
              <Link href={item[1]} key={index}>
                <motion.a
                  className="border-[1px] min-w-[97px] rounded-2xl box-border px-3 py-2 border-box text-foreground flex items-center justify-center bg-transparent hover:bg-primary hover:text-primary-foreground/ border-foreground/30 backdrop-blur-sm transition-all duration-200 font-semibold" //
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  transition={{ ease: easeIn, duration: 0.1 }}
                >
                  {" "}
                  {item[0]}{" "}
                </motion.a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/*Right-Mode Toggle and Contact Section */}
      <div className=" flex items-center gap-2 pr-2 ">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
