import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    listedBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User Model
    title: { type: String, required: true }, // Room title
    address: { type: String, required: true },
    rent: { type: Number, required: true },
    description: { type: String }, // Short description
    amenities: { type: [String] }, // List of amenities (WiFi, AC, etc.)
    images: { type: [String] }, // Array of image URLs (Cloudinary or Firebase)
    availableFrom: { type: Date, required: true }, // Availability date
    genderPreference: { type: String, enum: ["Male", "Female", "Any"], default: "Any" }, // Roommate preference
    roomType: { type: String, enum: ["Private", "Shared"], required: true }, // Private or shared
    postedAt: { type: Date, default: Date.now }, // Automatically set timestamp
    isRoommateRequest: {type: Boolean}
  },
  { timestamps: true } // Adds createdAt & updatedAt fields
);

// Prevents model re-compilation in Next.js (Hot Reload Fix)
export const RoomModel =
  mongoose.models.Room || mongoose.model("Room", RoomSchema);
