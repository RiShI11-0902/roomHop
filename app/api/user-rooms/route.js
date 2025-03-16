import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import RoomModel from "@/app/models/rooms";
import connection from "@/app/dbConfig/db";

export async function GET() {
  try {
    await connection()
    const cookie = await cookies();
    const token = cookie.get("token")?.value

    console.log(token);
    

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    if(decoded){
        const findRooms = await RoomModel.find({createdBy: decoded?.id})
        console.log(findRooms);
        return NextResponse.json({ success: true, rooms: findRooms });
    }

  } catch (error) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
