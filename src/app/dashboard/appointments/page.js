"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Server Action for fetching appointments
async function fetchAppointments() {
  const response = await fetch("/api/admin/get-appointments");
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  return response.json();
}

// Server Action for updating appointment status
async function updateAppointmentStatus(email, newStatus) {
  const response = await fetch("/api/update-appointment", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, status: newStatus }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update appointment status");
  }

  return response.json();
}

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  // Fetch appointments when the component mounts
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data.getMessages); // Set appointments data to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Handle updating appointment status
  const handleUpdateAppointmentStatus = async (email, currentStatus) => {
    const newStatus = prompt(
      "Enter new status (Accepted, Rejected, etc.):",
      currentStatus
    );
    if (!newStatus) return;

    try {
      const data = await updateAppointmentStatus(email, newStatus);
      setUpdateMessage(data.message);
      // Update the local state to reflect the change
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.email === email
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
    } catch (err) {
      alert(err.message);
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
                  Date: {new Date(appointment.appointment_date).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-gray-600">
                  Has Visited Before? {appointment.hasVisited ? "Yes" : "No"}
                </p>
                <button
                  onClick={() => handleUpdateAppointmentStatus(appointment.email, appointment.status)}
                  className="mt-4 bg-orange-500 text-white rounded-lg py-2 px-4 hover:bg-orange-600 transition duration-300"
                >
                  Update Status
                </button>
                <Link href={`/dashboard/appointments/delete?email=${appointment.email}`}>
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
