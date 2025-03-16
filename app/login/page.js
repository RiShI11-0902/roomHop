"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  console.log(session);
  
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents default redirection
    });

    if (res?.error) {
      setError("Invalid Credentials");
    } else {
      router.push("/dashboard"); // Redirect to dashboard after successful login
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#363062] to-[#4D4C7D]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-[#F99417] text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#F99417]"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#F99417]"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#F99417] text-white py-2 rounded-md hover:bg-[#e68410] transition"
          >
            Login
          </button>
        </form>

        <div className="text-center my-4">OR</div>
        <button 
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })} 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
