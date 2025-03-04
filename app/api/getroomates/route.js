import connection from "@/app/dbConfig/db";
import RoomModel from "@/app/models/rooms";
import { NextResponse } from "next/server";

export async function  GET() {
    try {
        await connection()
        const getRooms = await RoomModel.find({isRoommateRequest: true})

        if (getRooms.length > 0) {
            return NextResponse.json({success: true, data: getRooms})
        }else{
            return NextResponse.json({success: true, message: 'No Data'})
        }
    } catch (error) {
        return NextResponse.json({success: true, error: error})
    }
}