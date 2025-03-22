import { useState } from "react";
import { User2Icon, Search } from "lucide-react";
import { UserProfile } from "./UserProfile";

export default function FilterBar({ onFilterChange, filters, setFilters }) {
  const [openProfile, setOpenProfile] = useState(false);

  // Handle input changes but don't apply filters yet
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Trigger filter when Search button is clicked
  const handleSearch = () => {
    onFilterChange(filters);
  };

  return (
    <div className="topBar p-5 bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={filters.country}
        onChange={handleFilterChange}
        className="border border-gray-300 px-3 py-2 rounded-lg w-32 text-sm"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={filters.state}
        onChange={handleFilterChange}
        className="border border-gray-300 px-3 py-2 rounded-lg w-32 text-sm"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleFilterChange}
        className="border border-gray-300 px-3 py-2 rounded-lg w-32 text-sm"
      />

      {/* 💰 Rent Range Filter with Currency Selection */}
      <div className="flex items-center gap-2">
        {/* Currency Selector */}
        <select
          name="currency"
          value={filters.currency}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm"
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
          className="border border-gray-300 px-3 py-2 rounded-lg w-24 text-sm"
        />
        <span className="text-gray-600">-</span>

        {/* Max Rent */}
        <input
          type="number"
          name="rentMax"
          placeholder="Max Price"
          value={filters.rentMax}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-24 text-sm"
        />
      </div>

      <button
        onClick={()=> onFilterChange(filters)}
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <Search size={18} />
        Search
      </button>

      <div className="user bg-gray-100 p-2 rounded-full cursor-pointer">
        <User2Icon onClick={() => setOpenProfile(true)} className="text-gray-600" />
      </div>

      {openProfile && <UserProfile setOpenProfile={setOpenProfile} />}
    </div>
  );
}
