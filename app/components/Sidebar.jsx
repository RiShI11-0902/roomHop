"use client";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Sidebar({ setSelectData, setOpen, setislistingRoom, setError }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (name, url) => {
    setSelectData({
      name,
      url
    })
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 bg-[#F99417] text-white rounded-lg fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <section
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-tl from-[#363062] to-[#4D4C7D] border-r border-black p-5 text-[#F99417] text-xl transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:translate-x-0 md:w-72 md:relative`}
      >
        <div className="mb-10 mt-20">
          <span className="text-2xl font-bold text-white">Room Hop</span>
        </div>

        <ul className="space-y-5">
          <li onClick={() =>{
             handleClick('browse-roommate', '/api/getroomates')
             setError("")
          }} className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer">
            Browse Room Mates
          </li>
          <li onClick={() => {
            handleClick('browse', '/api/getrooms')
            setError("")
          }} className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer">
            Browse Rooms
          </li>
          <li onClick={() => {
            setislistingRoom(true)
            setOpen(true)
            setError("")
          }} className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer">
            List your Room
          </li>
          <li onClick={() => {
            setOpen(true)
            setislistingRoom(false)
            setError("")
          }} className="hover:bg-[#4D4C7D] rounded-xl p-3 cursor-pointer">
            Roommate Request
          </li>
        </ul>
      </section>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0  md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
