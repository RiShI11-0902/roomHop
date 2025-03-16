import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    listedBy: { type: String }, 
    title: { type: String, required: true }, 
    contact: { type: Number, required: true }, 
    email: { type: String, required: true }, 
    address: { type: String, required: true },
    rent: { type: Number, required: true },
    description: { type: String }, 
    amenities: { type: [String] }, 
    images: { type: [String] },
    availableFrom: { type: Date, required: true }, 
    genderPreference: { type: String, enum: ["Male", "Female", "Any"], default: "Any" }, 
    postedAt: { type: Date, default: Date.now }, 
    isRoommateRequest: {type: Boolean},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true } 
);
 const RoomModel =
  mongoose.models.Room || mongoose.model("Room", RoomSchema);

  export default RoomModel
