import { useState } from "react";
import { User2Icon, Search, Filter } from "lucide-react";
import { UserProfile } from "./UserProfile";

export default function FilterBar({ onFilterChange }) {
    const [openProfile, setOpenProfile] = useState(false)
    const [filters, setFilters] = useState({
        location: "",
        rentMin: "",
        rentMax: "",
        genderPreference: "",
        amenities: [],
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange && onFilterChange({ ...filters, [name]: value });
  };
  

  return (
    <div className="topBar p-5 bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
      {/* 🔍 Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-auto">
        <Search className="text-gray-500" size={18} />
        <input
          type="text"
          name="location"
          placeholder="Search by location..."
          value={filters.location}
          onChange={handleFilterChange}
          className="outline-none bg-transparent ml-2 w-full"
        />
      </div>

      {/* 💰 Rent Range Filter */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          name="rentMin"
          placeholder="Min ₹"
          value={filters.rentMin}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-24 text-sm"
        />
        <span className="text-gray-600">-</span>
        <input
          type="number"
          name="rentMax"
          placeholder="Max ₹"
          value={filters.rentMax}
          onChange={handleFilterChange}
          className="border border-gray-300 px-3 py-2 rounded-lg w-24 text-sm"
        />
      </div>

      {/* 🎯 Gender Preference Filter */}
      <select
        name="genderPreference"
        value={filters.genderPreference}
        onChange={handleFilterChange}
        className="border border-gray-300 px-3 py-2 rounded-lg"
      >
        <option value="">Any Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      {/* 🛠 Amenities Filter */}
      <select
        name="amenities"
        value={filters.amenities}
        onChange={handleFilterChange}
        className="border border-gray-300 px-3 py-2 rounded-lg"
      >
        <option value="">Select Amenities</option>
        <option value="WiFi">WiFi</option>
        <option value="AC">AC</option>
        <option value="Parking">Parking</option>
        <option value="Gym">Gym</option>
      </select>

      {/* 👤 User Icon */}
      <div className="user bg-gray-100 p-2 rounded-full cursor-pointer">
        <User2Icon onClick={()=>setOpenProfile(true)} className="text-gray-600" />
      </div>

      {
        openProfile && <UserProfile setOpenProfile={setOpenProfile} />
      }
    </div>
  );
}
