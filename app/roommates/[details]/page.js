"use client";

import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SingleRoomMateDetails({ params }) {
  const router = useRouter();
  const [roomDetails, setRoomDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        console.log("Fetching room details for:", params.details);

        const response = await axios.post("/api/room-details", {
          id: params.details,
        });

        console.log("API Response:", response.data);

        if (response.status === 200 && response.data.room) {
          setRoomDetails(response.data.room);
        } else {
          setError(response.data.message || "Room details not found.");
        }
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError(err.response?.data?.message || "An error occurred.");
      }
    };

    getRoomDetails();
  }, [params.details]); // Runs when params.details changes

  return (
    <>
      <Navbar />
      <section className="p-10 md:p-32 flex flex-col md:flex-row justify-center gap-10 bg-gradient-to-br from-[#363062] to-[#4D4C7D] text-white">
        {/* Left - Roommate Image */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
          {roomDetails?.images && roomDetails.images.length > 0 ? (
            <img
              src={roomDetails.images[0]} // Display the first image
              alt="Room"
              className="rounded-lg shadow-lg w-full md:w-96 h-auto"
            />
          ) : (
            <img
              src="https://picsum.photos/300/300" // Fallback Image
              alt="Roommate"
              className="rounded-lg shadow-lg w-full md:w-96 h-auto"
            />
          )}
        </div>

        {/* Right - Roommate Details */}
        <div className="w-full md:w-1/2 space-y-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : roomDetails ? (
            <>
              <h1 className="text-3xl font-bold text-[#F99417]">
                {roomDetails.title}
              </h1>
              <p className="text-lg text-gray-200">{roomDetails.description}</p>

              <div className="bg-[#ffffff1a] p-5 rounded-lg space-y-2">
                <p>
                  <strong>👤 Listed By:</strong> {roomDetails.listedBy}
                </p>
                <p>
                  <strong>📍 Address:</strong> {roomDetails.address}
                </p>
                <p>
                  <strong>📍 Contact:</strong> {roomDetails.contact}
                </p>
                <p>
                  <strong>📍 Email:</strong> {roomDetails.email}
                </p>
                <p>
                  <strong>💰 Rent:</strong> ₹{roomDetails.rent}
                </p>
                <p>
                  <strong>🎯 Gender Preference:</strong>{" "}
                  {roomDetails.genderPreference}
                </p>
                <p>
                  <strong>📅 Available From:</strong>{" "}
                  {new Date(roomDetails.availableFrom).toDateString()}
                </p>

                <p>
                  <strong>📆 Posted At:</strong>{" "}
                  {new Date(roomDetails.postedAt).toDateString()}
                </p>
                <p>
                  <strong>🏠 Roommate Request:</strong>{" "}
                  {roomDetails.isRoommateRequest ? "Yes" : "No"}
                </p>
                <p>
                  <strong>🛠 Amenities:</strong>{" "}
                  {roomDetails.amenities.length > 0
                    ? roomDetails.amenities.join(", ")
                    : "No amenities listed"}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-300">Loading room details...</p>
          )}

          <div className="flex flex-row space-x-5 mt-5">
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
