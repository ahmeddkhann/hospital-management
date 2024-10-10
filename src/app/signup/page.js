"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [cnic, setCnic] = useState("");
  const [role, setRole] = useState("");

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check for missing fields
    if (!firstName || !lastName || !email || !phone || !gender || !password || !dob || !cnic || !role) {
      toast({
        title: "Missing Fields",
        description: "All fields are required!",
        status: "error",
      });
      return; // Exit the function if there are missing fields
    }

    // Display success message if all fields are filled
    toast({
      title: "Sign Up Successful",
      description: "You successfully signed up with EverCare Medical Centre.",
      status: "success",
    });

    // Reset form or perform additional actions here, if needed
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Sign Up
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Date of Birth */}
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* CNIC */}
            <input
              type="text"
              placeholder="CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
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
              <option value="" disabled>
                Select Role
              </option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Sign Up
            </button>
            <div className="flex flex-col items-center mt-8">
              <h1 className="text-lg font-medium text-gray-700 mb-4">
                Already have an account?
              </h1>
              <Link
                href="/login"
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
