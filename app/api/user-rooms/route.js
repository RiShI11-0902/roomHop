import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import RoomModel from "@/app/models/rooms";
import connection from "@/app/dbConfig/db";

export async function POST(req) {
  try {
    await connection();

    const {email} = await req.json()

    console.log(email);

    if (email) {
      const findRooms = await RoomModel.find({ createdBy: email });
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
