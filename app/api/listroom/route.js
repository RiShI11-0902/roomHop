import connection from "@/app/dbConfig/db";
import RoomModel  from "@/app/models/rooms";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    await connection()

    const { formdata, islistingRoom} = await req.json()
    const {
      listedBy,
      title,
      GenderPreference,
      address,
      description,
      availableFrom,
      rent,
      OtherPreference,
      Amenities
    } = formdata;

    console.log(title, islistingRoom);

    const newRoom = await RoomModel({
      title,
      OtherPreference,
      description,
      Amenities,
      availableFrom,
      listedBy,
      GenderPreference,
      rent,
      address,
      isRoommateRequest: !islistingRoom
    })

    await newRoom.save()

    console.log(newRoom);
    
    return NextResponse.json({ success: true, data: newRoom });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
