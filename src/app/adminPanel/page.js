// src/app/adminPanel/page.js
"use client"; // This component is a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"; 
import axios from "axios";

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();
  const router = useRouter(); // Now this will work

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/admin/admin-authentication", {
        email,
        password,
        role,
      });

      if (response.data.success) {
        toast({
          title: "Login Successful",
          description: "You have logged in successfully.",
          status: "success",
        });
        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        toast({
          title: "Login Failed",
          description: response.data.message,
          status: "error",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        status: "error",
      });
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Role */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="Admin">Admin</option>
              {/* You can add more roles if needed */}
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-500 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
