import { Search, User2 } from "lucide-react";
import { useState } from "react";
import UserProfile from "./UserProfile"; // Assuming you have a UserProfile component

export default function TopBar({ filters, handleFilterChange, onFilterChange, setOpenProfile }) {
  const [openProfile, setOpenProfileState] = useState(false);

  return (
    <div className="topBar bg-white shadow-lg rounded-lg p-5 flex flex-col md:flex-row items-center gap-4 w-full">
      
      {/* Filters Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:gap-4 w-full">
        {/* Country Input */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={filters.country}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* State Input */}
        <input
          type="text"
          name="state"
          placeholder="State"
          value={filters.state}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* City Input */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Rent Range Filter with Currency Selection */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        {/* Currency Selector */}
        <select
          name="currency"
          value={filters.currency}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="INR">₹ (INR)</option>
          <option value="USD">$ (USD)</option>
        </select>

        {/* Min Rent */}
        <input
          type="number"
          name="rentMin"
          placeholder="Min Price"
          value={filters.rentMin}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-24 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <span className="text-gray-600">-</span>

        {/* Max Rent */}
        <input
          type="number"
          name="rentMax"
          placeholder="Max Price"
          value={filters.rentMax}
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
        // className="user bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
        tabIndex="0"
        onClick={() => setOpenProfileState(true)}
        onKeyDown={(e) => e.key === "Enter" && setOpenProfileState(true)}
        role="button"
        aria-label="Open Profile"
      >
        {/* <User2 className="text-gray-600" /> */}
        <UserProfile setOpenProfile={setOpenProfileState} />
      </div>

    </div>
  );
}
