import { NextResponse } from "next/server";

export async function GET(){
    return new NextResponse("Logged out", {
        status: 200,
        headers: {
            "Set-Cookie": `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
        },
    });
}