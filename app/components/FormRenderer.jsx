"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const FormRenderer = ({ formData, type, handleChange, handleFileChange, handleCheckboxChange }) => {
  const [position, setPosition] = useState([28.7041, 77.1025]); // Default location (Delhi, India)

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        formData.geoCode.push(e.latlng.lat, e.latlng.lng);
      },
    });

    return (
      <Marker position={position} icon={customIcon}>
        <Popup>Selected Location</Popup>
      </Marker>
    );
  };

  const formComponents = {
    "Your Details": (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="w-full p-3 border border-gray-300 " placeholder="Listed By (Your Name or ID)" name="listedBy" value={formData.listedBy} onChange={handleChange} required />
        <input className="w-full p-3 border border-gray-300 " placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <input className="w-full p-3 border border-gray-300 " placeholder="Contact Number" type="number" name="contact" value={formData.contact} onChange={handleChange} required />
        <select className="w-full p-3 border border-gray-300 " name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
    ),

    "Room Details": (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="w-full p-3 border border-gray-300 " placeholder="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
        <input className="w-full p-3 border border-gray-300 " placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />

        <div className="flex items-center space-x-2">
          <select name="currency" value={formData.currency} onChange={handleChange} className="p-3 border border-gray-300 ">
            <option value="rupees">₹ (INR)</option>
            <option value="dollars">$ (USD)</option>
          </select>
          <input className="w-full p-3 border border-gray-300 " placeholder="Rent" type="number" name="rent" value={formData.rent} onChange={handleChange} required />
        </div>

        <textarea className="w-full p-3 border border-gray-300 " placeholder="Room Description" name="description" value={formData.description} onChange={handleChange} />
        <textarea className="w-full p-3 border border-gray-300 " placeholder="Amenities (WiFi, AC, etc.) - Separate with commas" name="amenities" value={formData.amenities} onChange={handleChange} />

        <div className="flex flex-col">
          <label>Available From</label>
          <input className="w-full p-3 border border-gray-300 " type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required />
        </div>

        <div className="flex flex-col">
          <label>Gender Preference</label>
          <select name="genderPreference" value={formData.genderPreference} onChange={handleChange} className="w-full p-3 border border-gray-300 ">
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="isRoommateRequest" checked={formData.isRoommateRequest} onChange={handleCheckboxChange} />
          <label>Is this a roommate request?</label>
        </div>
      </div>
    ),


    "Other Details": (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="w-full p-3 border border-gray-300 " placeholder="Preferred Roommate Age Range" type="text" name="ageRange" value={formData.ageRange} onChange={handleChange} />
        <input className="w-full p-3 border border-gray-300 " placeholder="Country" type="text" name="country" value={formData.country} onChange={handleChange} />
        <input className="w-full p-3 border border-gray-300 " placeholder="State" type="text" name="state" value={formData.state} onChange={handleChange} />
        <input className="w-full p-3 border border-gray-300 " placeholder="City" type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
    ),

    "Add Image": (
      <div className="flex flex-col space-y-4">
        <label>Upload Images</label>
        <input type="file" name="images" multiple onChange={handleFileChange} className="w-full p-3 border border-gray-300 " />
      </div>
    ),

    "Mark Location": (
      <div className="">
        <label>Mark Location on the Map</label>
        <div className="w-full h-[300px] md:h-[300px] overflow-hidden">
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-full">
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>
        </div>
      </div>
    ),
  };

  return (
    <form className="space-y-6 p-4 md:p-6 bg-white shadow-md rounded-lg">
      {formComponents[type] || <p>No form available for this type.</p>}
    </form>
  );
};

export default FormRenderer;
