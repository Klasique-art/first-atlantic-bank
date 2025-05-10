"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { logo } from "@/public/assets";

const NavBar = () => {
  const [navbarActive, setNavbarActive] = useState(true);
  const [mobileNavMenuActive, setMobileNavMenuActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  //deactivate navbar on scroll down and reactivate on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setNavbarActive(false);
      } else {
        setNavbarActive(true);
      }

      setMobileNavMenuActive(false);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className={`fixed top-0 left-0 w-full z-50 bg-[var(--color-primary)]/50 custom-backdrop duration-500 backdrop-blur-md shadow-lg p-2 ${navbarActive ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="">
          <Image src={logo} className="w-12" alt="logo" />
        </Link>
        <div className="space-x-6 text-[var(--color-secondary)] text-sm">
          {/* <Link href="/about" className="hover:underline">
            About
          </Link> */}
          {/* <Link href="/features" className="hover:underline">
            Features
          </Link> */}
          {/* <Link href="/awards" className="hover:underline">
            Awards
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link> */}
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
