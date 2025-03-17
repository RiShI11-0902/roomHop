"use client";

import Navbar from "@/app/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
  }, [params.details]);

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <>
      <Navbar />
      <section className="p-10 md:p-32 bg-gradient-to-br from-[#363062] to-[#4D4C7D] text-white">
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 ">
          {/* Left - Roommate Image */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center ">
            {roomDetails?.images ? (
              <img
                src={roomDetails.images} // Display the first image
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
                <p className="text-lg text-gray-200">
                  {roomDetails.description}
                </p>

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
                    <strong>📆 Country:</strong>{" "}
                    {roomDetails.country}
                  </p>
                  <p>
                    <strong>📆 State:</strong>{" "}
                    {roomDetails.state}
                  </p>
                  <p>
                    <strong>📆 City:</strong>{" "}
                    {roomDetails.city}
                  </p>
                  <p>
                    <strong>🛠 Amenities:</strong>{" "}
                    {roomDetails.amenities.length > 0
                      ? roomDetails.amenities.join(", ")
                      : "No amenities listed"}
                  </p>
                </div>

                {/* Map Section */}
              </>
            ) : (
              <p className="text-gray-300">Loading room details...</p>
            )}
          </div>
        </div>

        <div className="map w-1/2 mx-auto">
          {roomDetails?.geoCode?.[0] && roomDetails?.geoCode?.[1] ? (
            <div className="w-full h-[300px] mt-5 rounded-lg overflow-hidden border border-gray-500">
              <MapContainer
                center={roomDetails?.geoCode}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[roomDetails.geoCode[0], roomDetails.geoCode[1]]}
                  icon={customIcon}
                >
                  <Popup>{roomDetails.listedBy}</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No location data available.</p>
          )}
        </div>
        <div className="flex flex-row space-x-5 mt-5 items-center justify-center">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 bg-[#F99417] text-white rounded-md hover:bg-[#F77F00] transition"
          >
            Go Back
          </button>
        </div>
      </section>
    </>
  );
}
