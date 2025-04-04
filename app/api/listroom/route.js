import connection from "@/app/dbConfig/db";
import RoomModel from "@/app/models/rooms";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connection();

    const body = await req.json();

    const { formData, userEmail } = body;
    
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
      geoCode,
      ageRange,
      country,
      state,
      city,
      images,
      currency
    } = formData;

     
      console.log(currency);

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
      currency,
      address,
      ageRange,
      country,
      state,
      city,
      isRoommateRequest: isRoommateRequest,
      createdBy: userEmail,
      geoCode: geoCode,
      images: images
    });

    await newRoom.save();

    console.log(newRoom);

    return NextResponse.json({ success: true }); ///data: newRoom
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
