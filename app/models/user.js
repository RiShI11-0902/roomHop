import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Required only for credentials login
  image: { type: String }, // Store profile image (for Google login)
  provider: { type: String, default: "credentials" }, // "google" or "credentials"
  createdRooms: [{type: Schema.Types.ObjectId, ref:'Room' }]
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
