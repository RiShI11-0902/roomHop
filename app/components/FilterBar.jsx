import { Search, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import Link from "next/link";
import {  useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TopBar({ filters, setFilters, onFilterChange, setOpenProfile, isLoggedIn, filteredData }) {
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/"); 
    }
  }, [session, router]);

  return (
    <div className="topBar bg-white shadow-lg rounded-lg p-5 flex flex-col md:flex-row items-center gap-4 w-full">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:gap-4 w-full">
        {/* Country Select */}
        <select name="country" value={filters.country || ""} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="" >Select a country</option>
          {filteredData?.map((i, k) => (
            <option key={k} value={i.country}>{i.country}</option>
          ))}
        </select>

        {/* State Select */}
        <select name="state" value={filters.state || ""} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="" >Select a state</option>
          {filteredData?.map((i, k) => (
            <option key={k} value={i.state}>{i.state}</option>
          ))}
        </select>

        {/* City Select */}
        <select name="city" value={filters.city || ""} onChange={handleFilterChange} className="p-2 border rounded">
          <option value="" >Select a city</option>
          {filteredData?.map((i, k) => (
            <option key={k} value={i.city}>{i.city}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-row items-center gap-2 w-full md:w-auto">
        {/* Currency Select */}
        <select
          name="currency"
          value={filters.currency || "INR"}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="INR">₹ (INR)</option>
          <option value="USD">$ (USD)</option>
        </select>

        {/* Max Rent */}
        <input
          type="number"
          name="rentMax"
          placeholder="Max Price"
          value={filters.rentMax || ""}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-24 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Search Button */}
      <button
        onClick={() => onFilterChange(filters)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <Search size={18} />
        Search
      </button>

      {/* User Profile Section */}
      <div
        tabIndex="0"
        onClick={() => setOpenProfile(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpenProfile(true)}
        role="button"
        aria-label="Open Profile"
      >
        {session ? (
        <UserProfile setOpenProfile={setOpenProfile} />
        ) : (
          <button onClick={() => signIn("google")} className="bg-blue-500 w-32 p-2 rounded-lg text-white hover:bg-blue-800">
            {/* <Link href={"/register"}>Log In</Link> */}Sign In
          </button>
        )}
      </div>
    </div>
  );
}
