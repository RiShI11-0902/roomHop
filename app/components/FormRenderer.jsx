"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FormRenderer = ({formData, type, handleChange, handleFileChange, handleCheckboxChange }) => {

  const formComponents = {
    "Your Details": (
      <>
        <Input placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
        <Input placeholder="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input placeholder="Age" type="number" name="age" value={formData.age} onChange={handleChange} required />
        <Input placeholder="Contact Number" type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
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
        <Input placeholder="Listed By (Your Name or ID)" name="listedBy" value={formData.listedBy} onChange={handleChange} required />
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
        <Textarea placeholder="Additional Preferences (Veg/Non-Veg, Smoker, etc.)" name="preferences" value={formData.preferences} onChange={handleChange} />
        <Input placeholder="Preferred Roommate Age Range" type="text" name="roommateAge" value={formData.roommateAge} onChange={handleChange} />
      </>
    ),

    "Add Image": (
      <>
        <Label>Upload Images</Label>
        <input type="file" name="images" multiple onChange={handleFileChange} />
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
