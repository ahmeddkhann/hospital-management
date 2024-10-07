"use client";

import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [role, setRole] = useState(""); // New state for role
  const { toast } = useToast(); // Use the toast hook

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        status: "error",
      });
      return;
    }

    try {
      const res = await axios.post("/api/sign-in", { email, password, role }); // Include role in the login request

      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
      });

      // Handle login logic here
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password" // New input for confirm password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Role Selection */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Admin">Admin</option>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Login
            </button>
            <div className="flex flex-col items-center mt-8">
              <h1 className="text-lg font-medium text-gray-700 mb-4">
                Don't have an account? Sign Up
              </h1>
              <Link
                href="/signup"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
