"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, X, User2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  const [userRooms, setUserRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openBox, setOpenBox] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Detect screen size for hover vs. click behavior
  const isLargeScreen = typeof window !== "undefined" && window.innerWidth >= 768;

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        const response = await axios.get("/api/user-rooms");
        setUserRooms(response.data.rooms);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load rooms.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserRooms();
  }, []);

  const deleteRoom = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.post(`/api/deleteRoom`, { id });
      setUserRooms(userRooms.filter((room) => room._id !== id));
    } catch (err) {
      alert("Failed to delete room.");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {/* User Icon */}
      <div
        className="user bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-all"
        onClick={() => !isLargeScreen && setShowDropdown(!showDropdown)} // Toggle dropdown only on small screens
        onMouseEnter={() => isLargeScreen && setShowDropdown(true)}
        onMouseLeave={() => isLargeScreen && setShowDropdown(false)}
        tabIndex="0"
      >
        <User2 className="text-gray-600" />
      </div>

      {/* Profile Dropdown */}
      {showDropdown && (
        <div
          className={`absolute ${
            isLargeScreen ? "top-12 right-0" : "top-14 left-1/2 transform -translate-x-1/2"
          } p-4 bg-white shadow-lg border rounded-xl w-44 transition-all`}
          onMouseEnter={() => isLargeScreen && setShowDropdown(true)}
          onMouseLeave={() => isLargeScreen && setShowDropdown(false)}
        >
          <ul className="text-center space-y-3">
            <li
              className="cursor-pointer hover:bg-gray-200 py-2 rounded-lg transition"
              onClick={() => setOpenBox(true)}
              tabIndex="0"
            >
              My Rooms
            </li>
            <li
              className="cursor-pointer bg-red-500 text-white hover:bg-red-600 py-2 rounded-lg transition"
              onClick={logout}
              tabIndex="0"
            >
              Log Out
            </li>
          </ul>
        </div>
      )}

      {/* My Rooms Modal */}
      {openBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenBox(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
              aria-label="Close My Rooms"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">Your Created Rooms</h2>

            {loading ? <p>Loading...</p> : null}
            {error ? <p className="text-red-500">{error}</p> : null}

            {userRooms.length > 0 ? (
              <ul className="space-y-4">
                {userRooms.map((room) => (
                  <li
                    key={room._id}
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">{room.title}</h3>
                      <p className="text-sm text-gray-600">{room.address}</p>
                      <p className="text-sm">Rent: ₹{room.rent}</p>
                    </div>
                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="text-red-500 hover:text-red-700 transition"
                      aria-label="Delete Room"
                    >
                      <Trash2 />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">You have not created any rooms yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}