import bcrypt from "bcryptjs";
import connection from "@/app/dbConfig/db";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";


export async function POST(req) {
  try {
    await connection();
    
    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set JWT in HttpOnly Cookie
    const response = NextResponse.json({ success: true, message: "Login successful" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
