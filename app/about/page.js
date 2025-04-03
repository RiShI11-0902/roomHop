import Link from "next/link";
import Navbar from "../components/Navbar";

export default function About() {
    return (
        <>
        
        <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#363062] to-[#4D4C7D] flex items-center justify-center px-6">
        <div className="max-w-3xl text-center text-white p-8 rounded-lg">
          <h1 className="text-4xl font-bold text-[#F99417] mb-6">About Us</h1>
          <p className="text-lg mb-4">
            Looking for a room to rent or have a space to list? <span className="font-semibold">Room Hop</span> makes it easy to connect with potential tenants through verified listings and direct contact.
          </p>
          <h2 className="text-2xl font-semibold text-[#F99417] mt-6 mb-4">Why Choose Us?</h2>
          <ul className="text-lg space-y-3 text-left max-w-xl items-center justify-center flex flex-col mx-auto">
            <li><span className="text-[#F99417]">✓</span> <strong>Direct Contact:</strong> Connect with room owners without middlemen.</li>
            <li><span className="text-[#F99417]">✓</span> <strong>Easy Room Listings:</strong> Post your room in minutes.</li>
            <li><span className="text-[#F99417]">✓</span> <strong>User-Friendly Experience:</strong> Simple and hassle-free platform.</li>
          </ul>
          <p className="text-lg mt-6">
            Browse available rooms or list your space with ease. Finding the perfect living arrangement has never been this simple!
          </p>
          <div className="mt-6">
            <Link href="/" className="text-[#F99417] font-semibold text-lg">Visit our website</Link>
          </div>
        </div>
      </div>
        </>
    );
  }
  