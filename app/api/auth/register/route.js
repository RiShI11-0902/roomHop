import bcrypt from "bcryptjs";
import connection from "@/app/dbConfig/db";
import User from "@/app/models/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export const runtime = "nodejs";

export async function POST(req) {
  try {
    await connection();
    
    const { name, email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token valid for 1 day
    });

    // Set JWT as HttpOnly Cookie
    const response = NextResponse.json({ 
      success: true, 
      message: "User registered successfully", 
      user: newUser._id 
    }, { status: 201 });

    response.cookies.set("token", token, {
      httpOnly: true, // Secure, can't be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Secure in production
      maxAge: 24 * 60 * 60, // 1 day expiration
      path: "/", // Accessible throughout the site
    });

    return response;

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
