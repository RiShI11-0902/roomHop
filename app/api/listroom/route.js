import connection from "@/app/dbConfig/db";
import RoomModel from "@/app/models/rooms";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(req) {
  try {
    await connection();

    const body = await req.json();

    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      listedBy,
      title,
      address,
      rent,
      description,
      amenities,
      availableFrom,
      genderPreference,
      isRoommateRequest,
      contact,
      email,
    } = body;

    console.log(contact, email);

    const newRoom = await RoomModel({
      title,
      description,
      amenities,
      contact,
      email,
      availableFrom,
      listedBy,
      genderPreference,
      rent,
      address,
      isRoommateRequest: isRoommateRequest,
      createdBy: decoded.id
    });

    await newRoom.save();

    console.log(newRoom);

    return NextResponse.json({ success: true }); ///data: newRoom
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
