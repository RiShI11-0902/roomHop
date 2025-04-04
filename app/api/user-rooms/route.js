import { NextResponse } from "next/server";
import RoomModel from "@/app/models/rooms";
import connection from "@/app/dbConfig/db";

export async function POST(req) {
  try {
    await connection();

    const {userEmail} = await req.json()

    console.log(userEmail);

    if (userEmail) {
      const findRooms = await RoomModel.find({ createdBy: userEmail });
      console.log("Rooms are" , findRooms);
      return NextResponse.json({ success: true, rooms: findRooms });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
