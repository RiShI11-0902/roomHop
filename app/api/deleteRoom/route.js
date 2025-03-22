import connection from "@/app/dbConfig/db";
import RoomModel from "@/app/models/rooms";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connection();

        const { id } = await req.json();  
        console.log("Room ID:", id);

        if (!id) {
            return NextResponse.json({ success: false, message: "Room ID is required" });
        }

        const delRoom = await RoomModel.findByIdAndDelete(id);

        if (delRoom) {
            return NextResponse.json({ success: true, message: "Room deleted successfully" });
        } else {
            return NextResponse.json({ success: false, message: "No Room Exists" });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
