import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { formdata, islistingRoom} = await req.json()
    const {
      listedBy,
      title,
      GenderPreference,
      address,
      description,
      availableFrom,
      rent,
      requestBy,
      OtherPreference,
      Amenities
    } = formdata;

    console.log(title, islistingRoom);
    
   
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}
