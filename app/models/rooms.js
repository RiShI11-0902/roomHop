import mongoose, { Schema } from "mongoose";

const RoomSchema = new Schema(
  {
    listedBy: { type: String }, 
    title: { type: String }, 
    contact: { type: Number}, 
    email: { type: String }, 
    address: { type: String },
    country:{type: String},
    state:{type:String},
    city:{type:String},
    rent: { type: Number },
    currency:{type: String},
    description: { type: String }, 
    amenities: { type: [String] }, 
    images: { type: String },
    availableFrom: { type: Date}, 
    genderPreference: { type: String, enum: ["Male", "Female", "Any"], default: "Any" }, 
    postedAt: { type: Date, default: Date.now }, 
    isRoommateRequest: {type: Boolean},
    ageRange:{type: String},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    geoCode:{
      type:[Number]
    },
  },
  { timestamps: true } 
);
 const RoomModel =
  mongoose.models.Room || mongoose.model("Room", RoomSchema);

  export default RoomModel
