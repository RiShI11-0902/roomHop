"use client";

import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

export default function SingleRoomMateDetails() {
  const router = useRouter();

  return (
    <>
    
    <Navbar />
    <section className="p-32 flex flex-col md:flex-row h-screen justify-center gap-10 bg-gradient-to-br from-[#363062] to-[#4D4C7D]">
      {/* Left - Roommate Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://picsum.photos/id/1/200/300"
          alt="Roommate"
          className="rounded-lg shadow-lg w-full md:w-96 h-auto"
        />
      </div>

      {/* Right - Roommate Details */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-3xl font-bold text-[#f3f3f5]">
          John Doe (Roommate)
        </h1>
        <p className="text-lg text-[#e1e1e6]">
          Looking for a roommate in New York. Rent: $500/month. Available from
          1st March.
        </p>
        <ul className="text-[#F99417] list-disc pl-5">
          <li>Location: New York</li>
          <li>Rent: $500/month</li>
          <li>Preferences: Non-smoker, No Pets</li>
        </ul>
        
        <div className="flex flex-row space-x-5">
        <button
          onClick={() => router.back()}
          className="px-5 py-2 bg-[#F99417] text-white rounded-md hover:bg-[#F77F00] transition"
        >
          Contact Details
        </button>
        <button
          onClick={() => router.back()}
          className="px-5 py-2 bg-[#F99417] text-white rounded-md hover:bg-[#F77F00] transition"
        >
          Go Back
        </button>
        </div>
      </div>
    </section>
    </>
  );
}
