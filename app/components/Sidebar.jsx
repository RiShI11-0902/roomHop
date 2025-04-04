"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {  useSession } from "next-auth/react";

export default function Sidebar({ setSelectData, setOpen, setError, isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handleClick = (name, url) => {
    setSelectData({ name, url });
    setIsOpen(false);
    setError("");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        aria-label="Open Sidebar"
        className="md:hidden p-3 bg-[#F99417] text-white rounded-lg fixed top-4 left-4 z-50 focus:ring-2 focus:ring-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-tl from-[#363062] to-[#4D4C7D] border-r border-black p-5 text-[#F99417] text-xl transition-transform ease-in-out duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:w-72 md:relative`}
        aria-label="Sidebar"
      >
        {/* Sidebar Header */}
        <div className="mb-10 mt-20 flex justify-between items-center">
          <span className="text-2xl font-bold text-white">Room Hop</span>
          {/* Close Button for Mobile */}
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-5">
          <li
            onClick={() => handleClick('browse-roommate', '/api/getroomates')}
            className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer focus:ring-2 focus:ring-[#F99417] focus:outline-none"
            tabIndex="0"
          >
            Browse Room Mates
          </li>
          <li
            onClick={() => handleClick('browse', '/api/getrooms')}
            className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer focus:ring-2 focus:ring-[#F99417] focus:outline-none"
            tabIndex="0"
          >
            Browse Rooms
          </li>
          {
            session ?  <li
            onClick={() => {
              setOpen(true);
              setError("");
            }}
            className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer focus:ring-2 focus:ring-[#F99417] focus:outline-none"
            tabIndex="0"
          >
            List your Room
          </li> : ""
          }
         
        </ul>
      </aside>
    </>
  );
}
