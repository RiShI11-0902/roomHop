"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";


export function UserProfile({ setOpenProfile }) {
  const router = useRouter();
  const [userRooms, setUserRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserRooms = async () => {
      try {
        // const cookie = cookies();
        const response = await axios.get("/api/user-rooms");
        console.log(response);
        
        setUserRooms(response.data.rooms);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load rooms.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserRooms();
  }, []);

  const deleteRoom = async (roomId) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.delete(`/api/delete-room/${roomId}`);
      setUserRooms(userRooms.filter((room) => room._id !== roomId));
    } catch (err) {
      alert("Failed to delete room.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* 🔙 Close Button */}
        <button onClick={() => setOpenProfile(false)} className="absolute top-4 right-4">
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Your Created Rooms</h2>

        {/* 🌀 Loading State */}
        {loading ? <p>Loading...</p> : null}

        {/* ❌ Error Handling */}
        {error ? <p className="text-red-500">{error}</p> : null}

        {/* 🚪 Room List */}
        {userRooms.length > 0 ? (
          <ul className="space-y-4">
            {userRooms.map((room) => (
              <li key={room._id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{room.title}</h3>
                  <p className="text-sm text-gray-600">{room.address}</p>
                  <p className="text-sm">Rent: ₹{room.rent}</p>
                </div>
                <div className="flex gap-3">
                  {/* 👁️ View Room */}
                  <button onClick={() => router.push(`/room/${room._id}`)}>
                    <Eye className="text-blue-500" />
                  </button>
                  {/* 🗑️ Delete Room */}
                  <button onClick={() => deleteRoom(room._id)}>
                    <Trash2 className="text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have not created any rooms yet.</p>
        )}
      </div>
    </div>
  );
}
