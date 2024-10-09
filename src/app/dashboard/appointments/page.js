"use client";
// pages/manage-appointments.js
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  useEffect(() => {
    // Fetch appointments data from the API
    const fetchAppointments = async () => {
      try {
        console.log("Fetching appointments...");
        const response = await axios.get("/api/admin/get-appointments"); 
        const data = response.data; // Use this instead of response.json()

        if (response.status === 200) {
          setAppointments(data.getMessages); // Set appointments data to state
        } else {
          setError(data.message || "Error fetching appointments");
        }
      } catch (error) {
        if (error.response) {
          setError(
            error.response.data.message || "Failed to fetch appointments"
          );
        } else {
          setError("Failed to fetch appointments");
        }
      } finally {
        setLoading(false); // Hide loading state once the fetch is done
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (email, currentStatus) => {
    const newStatus = prompt(
      "Enter new status (Accepted, Rejected, etc.):",
      currentStatus
    );
    if (!newStatus) return;

    try {
      const response = await fetch("/api/update-appointment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, status: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setUpdateMessage(data.message);
        // Update the local state to reflect the change
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.email === email
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to update appointment status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Manage Appointments
        </h1>

        {loading && (
          <p className="text-center text-lg">Loading appointments...</p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        {updateMessage && (
          <p className="text-center text-green-500">{updateMessage}</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg p-6"
              >
                <span className="font-semibold">Patient:</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {appointment.firstName} {appointment.lastName}
                </h3>
                <span className="font-semibold">Doctor:</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {appointment.doctor
                    ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                    : "Doctor information not available"}
                </h3>
                <p className="text-lg font-semibold text-gray-600">
                  Email: {appointment.email}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Department: {appointment.department}
                </p>
                <p className="text-gray-600 font-semibold">
                  Status: {appointment.status}
                </p>
                <p className="text-gray-600 font-semibold">
                  Date: {appointment.appointment_date}
                </p>{" "}
                {/* Formatting date */}
                <p className="text-lg font-semibold text-gray-600">
                  Has Visited Before? {appointment.hasVisited ? "Yes" : "No"}
                </p>{" "}
                {/* Displaying boolean as Yes/No */}
                <Link href={"/dashboard/appointments/updateStatus"}>
                  <button className="mt-4 bg-orange-500 text-white rounded-lg py-2 px-4 hover:bg-orange-600 transition duration-300">
                    Update Status
                  </button>
                </Link>
                <Link href={"/dashboard/appointments/delete"}>
                  <button className="mt-4 bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-600 transition duration-300">
                    Delete Appointment
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <p className="text-center text-lg text-gray-600">
            No appointments available at the moment.
          </p>
        )}

        <div className="mt-8 flex justify-center">
          <Link href="/dashboard">
            <p className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
              Back to Home
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;
