import connection from "@/app/dbConfig/db";
import RoomModel from "@/app/models/rooms";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connection();
    const {filters,currentPage} = await req.json()
     console.log(filters,currentPage);
     
    const query = {}

    if(filters.country) query.country =  filters.country
    if(filters.state) query.state =  filters.state
    if(filters.city) query.city =  filters.city
    if(filters.rentMax) query.rent =  filters.rentMax
    if(filters.currency) query.currency =  filters.currency


    console.log("query is",query);
    
    query.isRoommateRequest = true
    
    const skip = (currentPage - 1) * 4
    
    const totalRooms = await RoomModel.countDocuments();
    const getRooms = await RoomModel.find(query).skip(skip).limit(4)

    console.log(getRooms);
    

    if (getRooms.length > 0) {
      return NextResponse.json({ success: true, data: getRooms , totalRooms:totalRooms});
    } else {
      return NextResponse.json({ success: true, message: "No Data" });
    }
  } catch (error) {
    return NextResponse.json({ success: true, error: error });
  }
}
