"use client";

import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function Appointment() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [address, setAddress] = useState("");

  const { toast } = useToast(); // Use the toast hook

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/appointments", {
        firstName,
        lastName,
        email,
        phone,
        cnic,
        dob,
        gender,
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        hasVisited,
        address,
      });

      if (response.data.success) {
        toast({
          title: "Appointment Scheduled",
          description: response.data.message,
          status: "success",
        });

        // Clear form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCnic("");
        setDob("");
        setGender("");
        setAppointmentDate("");
        setDepartment("");
        setDoctorFirstName("");
        setDoctorLastName("");
        setHasVisited(false);
        setAddress("");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Appointment Scheduling Failed",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
      });
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Schedule an Appointment
          </h1>

          <form onSubmit={handleAppointment} className="space-y-4">
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

            {/* CNIC */}
            <input
              type="text"
              placeholder="CNIC"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Date of Birth */}

            {/* Date of Birth */}
            <div className="flex flex-col">
              <span className="text-gray-700 mb-1">Date of Birth:</span>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
     

            {/* Appointment Date */}
            <div className="flex flex-col mt-4">
              <span className="text-gray-700 mb-1">Appointment Date:</span>
              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Department */}
            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedicsr</option>
                <option value="Neurology">Neurology</option>
                <option value="Radiology">Radiology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Endocrinology">Endocrinology </option>
                <option value="Urology">Urology</option>
              </select>

            {/* Doctor's First Name */}
            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Doctor First Name
                </option>
                <option value="Ahmed">Ahmed</option>
                <option value="Yahya">Yahya</option>
                <option value="Waseem">Waseem</option>
                <option value="Qadir">Qadir</option>
                <option value="Maryam">Maryam</option>
                <option value="Wania">Wania</option>
                <option value="Jamal">Jamal </option>
                <option value="Habibullah">Habibullah</option>
              </select>

            {/* Doctor's Last Name */}
            <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  Doctor Last Name
                </option>
                <option value="Ahmed">Ahmed</option>
                <option value="Khan">Khan</option>
                <option value="Haider">Haider</option>
                <option value="Qadir">Qadir</option>
                <option value="Hassan">Hassan</option>
                <option value="Jaffar">Jaffar</option>
                <option value="Bhatti ">Bhatti </option>
                <option value="Butt">Butt</option>
              </select>

            {/* Has Visited Before */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
                className="mr-2"
              />
              <label className="text-gray-700">Have you visited before?</label>
            </div>

            {/* Address */}
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-500 transition duration-300"
            >
              Schedule Appointment
            </button>
          </form>

          <div className="flex flex-col items-center mt-8">
            <h1 className="text-lg font-medium text-gray-700 mb-4">
              Need Help?
            </h1>
            <Link
              href="/send-message"
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
