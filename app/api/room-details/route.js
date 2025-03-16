import connection from "@/app/dbConfig/db";
import RoomModel from "@/app/models/rooms";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {

        await connection()

        const {id} = await req.json()
        console.log(id);
        
        const singleRoom = await RoomModel.findById(id)

        if (singleRoom) {
            return NextResponse.json({success: true, room: singleRoom})
        }else{
            return NextResponse.json({success: true, message: "No Room Exist"})
        }
    } catch (error) {
        return NextResponse.json({success: false, messsage: error.message})
    }
}