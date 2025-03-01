"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-[#363062] to-[#4D4C7D] text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-around items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#F99417]">
          Roomsy
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="#" className="hover:text-[#F99417] transition">Find Roommates</Link>
          <Link href="#" className="hover:text-[#F99417] transition">List Your Space</Link>
          <Link href="#" className="hover:text-[#F99417] transition">About</Link>
          <Link href="#" className="hover:text-[#F99417] transition">Contact</Link>
        </div>

        {/* CTA Button */}
        <Link href="#" className="hidden md:block bg-[#F99417] text-[#363062] px-6 py-2 rounded-lg font-semibold hover:bg-[#F5F5F5] transition">
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#4D4C7D] text-white text-center p-6 space-y-4">
          <Link href="#" className="block hover:text-[#F99417] transition">Find Roommates</Link>
          <Link href="#" className="block hover:text-[#F99417] transition">List Your Space</Link>
          <Link href="#" className="block hover:text-[#F99417] transition">About</Link>
          <Link href="#" className="block hover:text-[#F99417] transition">Contact</Link>
          <Link href="#" className="block bg-[#F99417] text-[#363062] px-6 py-2 rounded-lg font-semibold hover:bg-[#F5F5F5] transition">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
