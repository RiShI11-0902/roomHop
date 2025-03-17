"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CldUploadWidget } from 'next-cloudinary'

///roomhop

const FormRenderer = ({ formData, type, handleChange, handleFileChange, handleCheckboxChange }) => {

  const [position, setPosition] = useState([28.7041, 77.1025]); // Default location (Delhi, India)

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const LocationMarker = ({ position, setPosition }) => {
    // console.log(position);

    useMapEvents({
      click(e) {
        setPosition(e.latlng); // Set marker on click
        formData.geoCode.push(e.latlng.lat, e.latlng.lng)
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon}>
        <Popup>Selected Location</Popup>
      </Marker>
    );
  };

  const formComponents = {
    "Your Details": (
      <>
        <Input placeholder="Listed By (Your Name or ID)" name="listedBy" value={formData.listedBy} onChange={handleChange} required />
        <Input placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input placeholder="Contact Number" type="number" name="contact" value={formData.contact} onChange={handleChange} required />
        <select className="input-field" name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </>
    ),

    "Room Details": (
      <>
        <Input placeholder="Listing Title" name="title" value={formData.title} onChange={handleChange} required />
        <Input placeholder="Address" name="address" value={formData.address} onChange={handleChange} required />
        <Input placeholder="Rent (in ₹)" type="number" name="rent" value={formData.rent} onChange={handleChange} required />
        <Textarea placeholder="Room Description" name="description" value={formData.description} onChange={handleChange} />
        <Textarea placeholder="Amenities (WiFi, AC, etc.) - Separate with commas" name="amenities" value={formData.amenities} onChange={handleChange} />

        <Label>Available From</Label>
        <Input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required />

        <Label>Gender Preference</Label>
        <select name="genderPreference" value={formData.genderPreference} onChange={handleChange} className="input-field">
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <Label>Is this a roommate request?</Label>
        <input type="checkbox" name="isRoommateRequest" checked={formData.isRoommateRequest} onChange={handleCheckboxChange} />
      </>
    ),

    "Other Details": (
      <>
        <Input placeholder="Preferred Roommate Age Range" type="text" name="ageRange" value={formData.ageRange} onChange={handleChange} />
        <Input placeholder="Country" type="text" name="country" value={formData.country} onChange={handleChange} />
        <Input placeholder="State" type="text" name="state" value={formData.state} onChange={handleChange} />
        <Input placeholder="City" type="text" name="city" value={formData.city} onChange={handleChange} />
      </>
    ),

    "Add Image": (
      <>
        <Label>Upload Images</Label>
        <input type="file" name="images" multiple onChange={handleFileChange} />
        {/* <CldUploadWidget uploadPreset="roomhop" onSuccess={(result) => {
          console.log("Upload Result:", result);
          
          const uploadedUrl = result?.info?.secure_url;
          if (uploadedUrl) {
            console.log("Uploaded Image URL:", uploadedUrl);
            formData.images = uploadedUrl; // Store the image URL
          }
        }}>
          {
            ({ open }) => {
              return <button className="bg-orange-400" onClick={(e) => {
                e.preventDefault();
                open()
              } }>Upload Image</button>
            }
          }
        </CldUploadWidget> */}
      </>
    ),
////https://api.cloudinary.com/v1_1/{cloud_name}/image/upload for uploading
    "Mark Location": (
      <>
        <Label>Mark Location on the Map</Label>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
      </>
    ),

  };

  return (
    <form className="space-y-4">
      {formComponents[type] || <p>No form available for this type.</p>}
    </form>
  );
};

export default FormRenderer;
